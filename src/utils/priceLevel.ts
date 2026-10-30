import { priceColors } from "../styles/theme";
import type { ElectricityPrice } from "../types/api";

const LEVEL_COUNT = priceColors.length;

const getPriceLevels = (prices: ElectricityPrice[]) =>
  prices.map(({ DKK_per_kWh }) => {
    const cheaperCount = prices.filter((other) => other.DKK_per_kWh < DKK_per_kWh).length;
    return Math.floor((cheaperCount / prices.length) * LEVEL_COUNT);
  });

// Adds each price's color level, ranked against the other prices in the list
export const withPriceLevels = (prices: ElectricityPrice[]) => {
  const levels = getPriceLevels(prices);
  return prices.map((price, index) => ({ ...price, level: levels[index] }));
};
