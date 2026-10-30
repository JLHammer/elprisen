import { useState } from "react";
import { useElectricityPrices } from "../../hooks/useElectricityPrices";
import { useNow } from "../../hooks/useNow";
import { useSettings } from "../../hooks/useSettings";
import { formatPrice, formatTime } from "../../utils/format";
import { Toast } from "../ui/Toast";

const STORAGE_KEY = "elprisen-dismissed-alarm";

const LEAD_TIME = 15 * 60 * 1000;

// Remembers the closed hour so the toast stays closed across reloads
const loadDismissed = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export const LowestPriceToast = () => {
  const {
    settings: { notifications },
  } = useSettings();
  const now = useNow();
  const { prices } = useElectricityPrices(now);
  const [dismissed, setDismissed] = useState(loadDismissed);

  if (!notifications || prices.length === 0) return null;

  const cheapest = prices.reduce((min, price) => (price.DKK_per_kWh < min.DKK_per_kWh ? price : min));
  const start = new Date(cheapest.time_start).getTime();
  const end = new Date(cheapest.time_end).getTime();
  const nowTime = now.getTime();

  if (dismissed === cheapest.time_start || nowTime < start - LEAD_TIME || nowTime >= end) return null;

  const dismiss = () => {
    setDismissed(cheapest.time_start);
    try {
      localStorage.setItem(STORAGE_KEY, cheapest.time_start);
    } catch {
      // Storage unavailable (e.g. private mode), the toast only stays closed for this session
    }
  };

  const price = `${formatPrice(cheapest.DKK_per_kWh)} kr/kWh`;

  return (
    <Toast onClose={dismiss}>
      {nowTime < start
        ? `Dagens billigste time starter om ${Math.ceil((start - nowTime) / 60000)}\u00a0min, kl. ${formatTime(cheapest.time_start)} (${price})`
        : `Det er nu dagens billigste time, kl. ${formatTime(cheapest.time_start)}–${formatTime(cheapest.time_end)} (${price})`}
    </Toast>
  );
};
