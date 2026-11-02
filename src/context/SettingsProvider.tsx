import { useEffect, useState, type ReactNode } from "react";

import { isPriceArea } from "../utils/priceArea";
import { readStorage, writeStorage } from "../utils/storage";
import {
  defaultSettings,
  SettingsContext,
  type Settings,
} from "./SettingsContext";

type SettingsProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "elprisen-settings";

// Keeps each saved value only if it is still valid, so a stale or corrupt one falls back to its default
const parseSettings = (saved: string): Settings => {
  const parsed: unknown = JSON.parse(saved);
  if (typeof parsed !== "object" || parsed === null) return defaultSettings;

  const {
    area,
    includeVat,
    notifications,
  }: Partial<Record<keyof Settings, unknown>> = parsed;

  return {
    area: isPriceArea(area) ? area : defaultSettings.area,
    includeVat:
      typeof includeVat === "boolean" ? includeVat : defaultSettings.includeVat,
    notifications:
      typeof notifications === "boolean"
        ? notifications
        : defaultSettings.notifications,
  };
};

const loadSettings = (): Settings => {
  const saved = readStorage(STORAGE_KEY);
  if (!saved) return defaultSettings;

  try {
    return parseSettings(saved);
  } catch {
    return defaultSettings;
  }
};

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    writeStorage(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (changes: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...changes }));
  };

  return (
    <SettingsContext value={{ settings, updateSettings }}>
      {children}
    </SettingsContext>
  );
};
