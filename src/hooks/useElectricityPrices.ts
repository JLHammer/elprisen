import { useEffect, useMemo, useState } from "react";
import { useSettings } from "./useSettings";
import { addVat } from "../utils/vat";
import { getDanishDate, getDanishTime } from "../utils/danishTime";
import type { ElectricityPrice, ElectricityPricesResponse } from "../types/api";

const API_URL = "https://www.elprisenligenu.dk/api/v1/prices";

export const FIRST_DATE = "2022-10-27";

const toDatePath = (isoDate: string) => isoDate.replace("-", "/");

const FIRST_DATE_PATH = toDatePath(FIRST_DATE);

const FIRST_FETCH_MINUTES = 13 * 60 + 10;

const RETRY_AFTER = 10 * 60 * 1000;

const LATE_MINUTES = 14 * 60;
const LATE_RETRY_AFTER = 60 * 60 * 1000;

const NOT_PUBLISHED_YET = "Priserne for denne dag er ikke tilgængelige endnu";
const NO_PRICES = "Der findes ingen priser for denne dag";

const MINUTES_PER_DAY = 24 * 60;

const msUntilDanishMinute = (now: Date, minuteOfDay: number) =>
  (minuteOfDay - getDanishTime(now).minutes) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();

const formatDatePath = (date: Date, dayOffset = 0) => toDatePath(getDanishDate(dayOffset, date));

const getUnavailableMessage = (datePath: string) => {
  const now = new Date();
  const latestDatePath = formatDatePath(now, getDanishTime(now).minutes < FIRST_FETCH_MINUTES ? 0 : 1);

  if (datePath > latestDatePath) return NOT_PUBLISHED_YET;
  if (datePath < FIRST_DATE_PATH) return NO_PRICES;
  return null;
};

type CacheEntry = { request: Promise<ElectricityPrice[]>; retryAt?: number };

const cache = new Map<string, CacheEntry>();

const getCacheKey = (datePath: string, area: string) => `${datePath}_${area}`;

const getNextAttemptAt = (datePath: string, area: string) => {
  const now = new Date();

  if (getUnavailableMessage(datePath)) {
    return datePath === formatDatePath(now, 1)
      ? now.getTime() + msUntilDanishMinute(now, FIRST_FETCH_MINUTES)
      : null;
  }

  return cache.get(getCacheKey(datePath, area))?.retryAt ?? null;
};

const requestPrices = async (datePath: string, area: string) => {
  const res = await fetch(`${API_URL}/${datePath}_${area}.json`, { cache: "no-cache" });

  if (res.status === 404) {
    const isFuture = datePath > formatDatePath(new Date());
    throw new Error(isFuture ? NOT_PUBLISHED_YET : NO_PRICES);
  }
  if (!res.ok) throw new Error(`Kunne ikke hente elpriser (${res.status})`);

  const data: unknown = await res.json().catch(() => null);
  if (!Array.isArray(data) || data.length === 0) throw new Error("Elpriserne kunne ikke læses");
  return data as ElectricityPricesResponse;
};

const loadPrices = (datePath: string, area: string) => {
  const unavailable = getUnavailableMessage(datePath);
  if (unavailable) return Promise.reject(new Error(unavailable));

  const key = getCacheKey(datePath, area);
  const cached = cache.get(key);

  if (cached && (cached.retryAt === undefined || Date.now() < cached.retryAt)) {
    return cached.request;
  }

  const entry: CacheEntry = {
    request: requestPrices(datePath, area).catch((err) => {
      if (!navigator.onLine) {
        cache.delete(key);
      } else {
        const now = new Date();
        const { minutes } = getDanishTime(now);
        const isLate = datePath > formatDatePath(now) && minutes >= LATE_MINUTES;

        const untilMidnight = msUntilDanishMinute(now, MINUTES_PER_DAY);
        entry.retryAt = now.getTime() + Math.min(isLate ? LATE_RETRY_AFTER : RETRY_AFTER, untilMidnight);
      }
      throw err;
    }),
  };
  cache.set(key, entry);
  return entry.request;
};

export const useElectricityPrices = (date: Date = new Date(), dayOffset = 0) => {
  const { settings: { area, includeVat } } = useSettings();
  const [rawPrices, setRawPrices] = useState<ElectricityPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const datePath = formatDatePath(date, dayOffset);

  useEffect(() => {
    let ignore = false;
    let loaded = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleRetry = () => {
      clearTimeout(retryTimer);
      const nextAttemptAt = getNextAttemptAt(datePath, area);
      if (nextAttemptAt !== null) {
        retryTimer = setTimeout(() => fetchPrices(true), Math.max(nextAttemptAt - Date.now(), 0) + 1000);
      }
    };

    const fetchPrices = async (isRetry = false) => {
      if (!isRetry) {
        setLoading(true);
        setError(null);
      }

      try {
        const data = await loadPrices(datePath, area);
        if (ignore) return;
        loaded = true;
        setRawPrices(data);
        setError(null);
      } catch (err) {
        if (ignore) return;
        setRawPrices([]);
        scheduleRetry();

        if (!navigator.onLine) {
          setError("Du er offline, og der er ingen gemte priser for denne dag");
          return;
        }

        if (err instanceof TypeError) {
          setError("Kunne ikke forbinde til elpris-tjenesten");
          return;
        }

        setError(err instanceof Error ? err.message : "Ukendt fejl");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    const handleVisibilityChange = () => {
      if (!loaded && document.visibilityState === "visible") scheduleRetry();
    };

    const handleOnline = () => {
      if (!loaded) fetchPrices(true);
    };

    fetchPrices();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnline);

    return () => {
      ignore = true;
      clearTimeout(retryTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
    };
  }, [datePath, area]);

  const prices = useMemo(
    () =>
      includeVat
        ? rawPrices.map((price) => ({
            ...price,
            DKK_per_kWh: addVat(price.DKK_per_kWh),
            EUR_per_kWh: addVat(price.EUR_per_kWh),
          }))
        : rawPrices,
    [rawPrices, includeVat],
  );

  return { prices, loading, error };
};
