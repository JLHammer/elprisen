import type { ElectricityPrice } from "../types/api";
import { withPriceLevels } from "../utils/priceLevel";
import { hasPriceEnded } from "../utils/priceSlot";
import { useElectricityPrices } from "./useElectricityPrices";
import { useNow } from "./useNow";

type UpcomingPrice = ElectricityPrice & { level: number; isTomorrow: boolean };

const withLevels = (
  prices: ElectricityPrice[],
  isTomorrow: boolean,
): UpcomingPrice[] =>
  withPriceLevels(prices).map((price) => ({ ...price, isTomorrow }));

export const useUpcomingPrices = () => {
  const now = useNow();
  const today = useElectricityPrices(now);
  const tomorrow = useElectricityPrices(now, 1);

  const todayPrices = withLevels(today.prices, false);

  const prices = [...todayPrices, ...withLevels(tomorrow.prices, true)].filter(
    (price) => !hasPriceEnded(price, now),
  );
  const earlierPrices = todayPrices.filter((price) =>
    hasPriceEnded(price, now),
  );

  return { prices, earlierPrices, loading: today.loading, error: today.error };
};
