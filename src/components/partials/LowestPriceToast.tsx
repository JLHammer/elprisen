import { useState } from "react";

import { useElectricityPrices } from "../../hooks/useElectricityPrices";
import { useNow } from "../../hooks/useNow";
import { useSettings } from "../../hooks/useSettings";
import { formatTime } from "../../utils/format";
import { getLowestPrice } from "../../utils/priceRange";
import { getPriceSlot, hasPriceEnded } from "../../utils/priceSlot";
import { readStorage, writeStorage } from "../../utils/storage";
import { Kroner } from "../ui/Kroner";
import { Toast } from "../ui/Toast";

// Remembers the closed hour so the toast stays closed across reloads
const STORAGE_KEY = "elprisen-dismissed-alarm";

const LEAD_TIME = 15 * 60 * 1000;

export const LowestPriceToast = () => {
  const {
    settings: { notifications },
  } = useSettings();
  const now = useNow();
  const { prices } = useElectricityPrices(now);
  const [dismissed, setDismissed] = useState(() => readStorage(STORAGE_KEY));

  if (!notifications || prices.length === 0) return null;

  const cheapest = getLowestPrice(prices);
  const { start } = getPriceSlot(cheapest);
  const nowTime = now.getTime();

  if (
    dismissed === cheapest.time_start ||
    nowTime < start - LEAD_TIME ||
    hasPriceEnded(cheapest, now)
  )
    return null;

  const dismiss = () => {
    setDismissed(cheapest.time_start);
    writeStorage(STORAGE_KEY, cheapest.time_start);
  };

  // The cheapest price for the toast, e.g. "0.123 kr pr. kWh"
  const price = (
    <>
      <Kroner price={cheapest.DKK_per_kWh} /> pr. kWh
    </>
  );

  return (
    <Toast onClose={dismiss}>
      {/* formatTime shows when the cheapest hour starts, and also when it ends once it has begun */}
      {nowTime < start ? (
        <>
          {/* Hidden from screen readers, or the toast's live region would announce it every minute */}
          Dagens billigste time starter{" "}
          <span aria-hidden="true">
            om {Math.ceil((start - nowTime) / 60000)}
            {"\u00a0"}min,{" "}
          </span>
          kl. {formatTime(cheapest.time_start)} ({price})
        </>
      ) : (
        <>
          Det er nu dagens billigste time, kl. {formatTime(cheapest.time_start)}{" "}
          - {formatTime(cheapest.time_end)} ({price})
        </>
      )}
    </Toast>
  );
};
