export type PriceArea = "DK1" | "DK2";

export type ElectricityPrice = {
  DKK_per_kWh: number;
  EUR_per_kWh: number;
  EXR: number;
  time_start: string;
  time_end: string;
};

export type ElectricityPricesResponse = ElectricityPrice[];
