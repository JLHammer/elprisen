import type { PriceArea } from "../types/api";

// Listed east to west, the order the settings dropdown shows them in
export const PRICE_AREAS: Record<PriceArea, { region: string; name: string }> = {
  DK2: { region: "Region Øst", name: "Øst Danmark" },
  DK1: { region: "Region Vest", name: "Vest Danmark" },
};
