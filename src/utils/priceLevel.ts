import { priceColors } from "../styles/theme";
import type { ElectricityPrice } from "../types/api";

const LEVEL_COUNT = priceColors.length;

export const getPriceLevels = (prices: ElectricityPrice[]) =>
  prices.map(({ DKK_per_kWh }) => {
    const cheaperCount = prices.filter((other) => other.DKK_per_kWh < DKK_per_kWh).length;
    return Math.floor((cheaperCount / prices.length) * LEVEL_COUNT);
  });
