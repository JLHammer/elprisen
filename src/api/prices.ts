import type {
  ElectricityPrice,
  ElectricityPricesResponse,
  PriceArea,
} from "../types/api";
import { getDanishDate, getDanishTime } from "../utils/danishTime";

const API_URL = "https://www.elprisenligenu.dk/api/v1/prices";

// The first day the API has prices for
export const FIRST_DATE = "2022-10-27";

// The API's URLs use "YYYY/MM-DD", e.g. ".../2026/10-28_DK1.json"
const toDatePath = (isoDate: string) => isoDate.replace("-", "/");

const FIRST_DATE_PATH = toDatePath(FIRST_DATE);

// Tomorrow's prices are published around 13:00 Danish time, so 13:10 leaves the API time to update
const FIRST_FETCH_MINUTES = 13 * 60 + 10;

const RETRY_AFTER = 10 * 60 * 1000;

// Prices still missing at 14:00 are delayed for longer, so it retries hourly instead of every 10 minutes
const LATE_MINUTES = 14 * 60;
const LATE_RETRY_AFTER = 60 * 60 * 1000;

const NOT_PUBLISHED_YET = "Priserne for denne dag er ikke tilgængelige endnu";
const NO_PRICES = "Der findes ingen priser for denne dag";

const MINUTES_PER_DAY = 24 * 60;

const msUntilDanishMinute = (now: Date, minuteOfDay: number) => {
  const ms =
    (minuteOfDay - getDanishTime(now).minutes) * 60 * 1000 -
    now.getSeconds() * 1000 -
    now.getMilliseconds();
  // A clock change in between moves the target, so correct by how far off the Danish clock is then
  const reached = getDanishTime(new Date(now.getTime() + ms)).minutes;
  const drift =
    ((reached - minuteOfDay + MINUTES_PER_DAY * 1.5) % MINUTES_PER_DAY) -
    MINUTES_PER_DAY / 2;
  return ms - drift * 60 * 1000;
};

export const formatDatePath = (date: Date, dayOffset = 0) =>
  toDatePath(getDanishDate(dayOffset, date));

// Days outside the published range fail right away, without a request
const getUnavailableMessage = (datePath: string) => {
  const now = new Date();
  const latestDatePath = formatDatePath(
    now,
    getDanishTime(now).minutes < FIRST_FETCH_MINUTES ? 0 : 1,
  );

  if (datePath > latestDatePath) return NOT_PUBLISHED_YET;
  if (datePath < FIRST_DATE_PATH) return NO_PRICES;
  return null;
};

// retryAt is only set on failed requests, so successful ones are kept for the session
type CacheEntry = { request: Promise<ElectricityPrice[]>; retryAt?: number };

const cache = new Map<string, CacheEntry>();

const getCacheKey = (datePath: string, area: PriceArea) =>
  `${datePath}_${area}`;

// When it is worth trying again after a failure, or null if it never is
export const getNextAttemptAt = (datePath: string, area: PriceArea) => {
  const now = new Date();

  if (getUnavailableMessage(datePath)) {
    return datePath === formatDatePath(now, 1)
      ? now.getTime() + msUntilDanishMinute(now, FIRST_FETCH_MINUTES)
      : null;
  }

  return cache.get(getCacheKey(datePath, area))?.retryAt ?? null;
};

const requestPrices = async (datePath: string, area: PriceArea) => {
  const res = await fetch(`${API_URL}/${datePath}_${area}.json`, {
    cache: "no-cache",
  });

  if (res.status === 404) {
    const isFuture = datePath > formatDatePath(new Date());
    throw new Error(isFuture ? NOT_PUBLISHED_YET : NO_PRICES);
  }
  if (!res.ok) throw new Error(`Kunne ikke hente elpriser (${res.status})`);

  const data: unknown = await res.json().catch(() => null);
  if (!Array.isArray(data) || data.length === 0)
    throw new Error("Elpriserne kunne ikke læses");
  return data as ElectricityPricesResponse;
};

// Rejects with an Error whose message is ready to show in the UI
export const loadPrices = (datePath: string, area: PriceArea) => {
  const unavailable = getUnavailableMessage(datePath);
  if (unavailable) return Promise.reject(new Error(unavailable));

  const key = getCacheKey(datePath, area);
  const cached = cache.get(key);

  if (cached && (cached.retryAt === undefined || Date.now() < cached.retryAt)) {
    return cached.request;
  }

  const entry: CacheEntry = {
    request: requestPrices(datePath, area).catch((err) => {
      // Offline failures say nothing about the API, so the next attempt asks again right away
      if (!navigator.onLine) {
        cache.delete(key);
      } else {
        const now = new Date();
        const { minutes } = getDanishTime(now);
        const isLate =
          datePath > formatDatePath(now) && minutes >= LATE_MINUTES;

        // Capped at midnight, when tomorrow becomes today and its prices must be there
        const untilMidnight = msUntilDanishMinute(now, MINUTES_PER_DAY);
        entry.retryAt =
          now.getTime() +
          Math.min(isLate ? LATE_RETRY_AFTER : RETRY_AFTER, untilMidnight);
      }
      throw err;
    }),
  };
  cache.set(key, entry);
  return entry.request;
};
