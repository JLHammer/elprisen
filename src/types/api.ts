export type PriceArea = "DK1" | "DK2";

export type ElectricityPrice = {
  DKK_per_kWh: number;
  EUR_per_kWh: number;
  EXR: number;
  time_start: string;
  time_end: string;
};

export type ElectricityPricesResponse = ElectricityPrice[];

/*
  The ElectricityPrice reflects the API response shape:
  {
    "DKK_per_kWh": 1.11543,
    "EUR_per_kWh": 0.14923,
    "EXR": 7.47455,
    "time_start": "2026-10-28T00:00:00+01:00",
    "time_end": "2026-10-28T01:00:00+01:00"
  }
  as an array of 24 objects, one for each hour of the day
*/
