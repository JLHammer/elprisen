import { useElectricityPrices } from "./useElectricityPrices";
import { useNow } from "./useNow";
import { getPriceLevels } from "../utils/priceLevel";
import type { ElectricityPrice } from "../types/api";

type UpcomingPrice = ElectricityPrice & { level: number; isTomorrow: boolean };

const withLevels = (prices: ElectricityPrice[], isTomorrow: boolean): UpcomingPrice[] => {
  const levels = getPriceLevels(prices);
  return prices.map((price, index) => ({ ...price, level: levels[index], isTomorrow }));
};

export const useUpcomingPrices = () => {
  const now = useNow();
  const today = useElectricityPrices(now);
  const tomorrow = useElectricityPrices(now, 1);

  const nowTime = now.getTime();
  const prices = [...withLevels(today.prices, false), ...withLevels(tomorrow.prices, true)].filter(
    ({ time_end }) => new Date(time_end).getTime() > nowTime,
  );

  return { prices, loading: today.loading, error: today.error };
};
