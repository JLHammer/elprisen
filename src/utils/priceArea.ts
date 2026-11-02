import type { PriceArea } from "../types/api";

// Listed east to west, the order the settings dropdown shows them in
export const PRICE_AREAS: Record<PriceArea, { region: string; name: string }> =
  {
    DK2: { region: "Region Øst", name: "Østdanmark" },
    DK1: { region: "Region Vest", name: "Vestdanmark" },
  };

export const isPriceArea = (value: unknown): value is PriceArea =>
  typeof value === "string" && Object.hasOwn(PRICE_AREAS, value);
