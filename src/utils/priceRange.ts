import type { ElectricityPrice } from "../types/api";

export const getLowestPrice = <T extends ElectricityPrice>(prices: T[]) =>
  prices.reduce((lowest, price) => (price.DKK_per_kWh < lowest.DKK_per_kWh ? price : lowest));

export const getHighestPrice = <T extends ElectricityPrice>(prices: T[]) =>
  prices.reduce((highest, price) => (price.DKK_per_kWh > highest.DKK_per_kWh ? price : highest));
