import { priceColors } from "../styles/theme";
import type { ElectricityPrice } from "../types/api";

const LEVEL_COUNT = priceColors.length;

const getPriceLevels = (prices: ElectricityPrice[]) =>
  prices.map(({ DKK_per_kWh }) => {
    const cheaperCount = prices.filter((other) => other.DKK_per_kWh < DKK_per_kWh).length;
    return Math.floor((cheaperCount / prices.length) * LEVEL_COUNT);
  });

const LEVEL_NAMES = ["billig", "middel", "dyr"];

// The color level in words, so the meaning of the color isn't only visual
export const getPriceLevelName = (level: number) =>
  LEVEL_NAMES[Math.floor((level / LEVEL_COUNT) * LEVEL_NAMES.length)];

// Adds each price's color level, ranked against the other prices in the list
export const withPriceLevels = (prices: ElectricityPrice[]) => {
  const levels = getPriceLevels(prices);
  return prices.map((price, index) => ({ ...price, level: levels[index] }));
};
