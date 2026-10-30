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
  const isUpcoming = ({ time_end }: ElectricityPrice) => new Date(time_end).getTime() > nowTime;
  const todayPrices = withLevels(today.prices, false);

  const prices = [...todayPrices, ...withLevels(tomorrow.prices, true)].filter(isUpcoming);
  const earlierPrices = todayPrices.filter((price) => !isUpcoming(price));

  return { prices, earlierPrices, loading: today.loading, error: today.error };
};
