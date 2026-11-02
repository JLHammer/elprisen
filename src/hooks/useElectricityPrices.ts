import { useEffect, useMemo, useState } from "react";

import { formatDatePath, getNextAttemptAt, loadPrices } from "../api/prices";
import type { ElectricityPrice } from "../types/api";
import { addVat } from "../utils/vat";
import { useSettings } from "./useSettings";

export const useElectricityPrices = (
  date: Date = new Date(),
  dayOffset = 0,
) => {
  const {
    settings: { area, includeVat },
  } = useSettings();
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
        retryTimer = setTimeout(
          () => fetchPrices(true),
          Math.max(nextAttemptAt - Date.now(), 0) + 1000,
        );
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
      if (!loaded) void fetchPrices(true);
    };

    void fetchPrices();
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
