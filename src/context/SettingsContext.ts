import { createContext } from "react";
import type { PriceArea } from "../types/api";

export type Settings = {
  area: PriceArea;
  includeVat: boolean;
  notifications: boolean;
};

export const defaultSettings: Settings = {
  area: "DK2",
  includeVat: false,
  notifications: false,
};

type SettingsContextValue = {
  settings: Settings;
  updateSettings: (changes: Partial<Settings>) => void;
};

export const SettingsContext = createContext<SettingsContextValue | null>(null);
