import { useEffect, useState, type ReactNode } from "react";
import { SettingsContext, defaultSettings, type Settings } from "./SettingsContext";
import { readStorage, writeStorage } from "../utils/storage";

type SettingsProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "elprisen-settings";

const loadSettings = (): Settings => {
  const saved = readStorage(STORAGE_KEY);
  if (!saved) return defaultSettings;

  // Falls back to the defaults if the saved value is corrupt
  try {
    return { ...defaultSettings, ...JSON.parse(saved) };
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

  return <SettingsContext value={{ settings, updateSettings }}>{children}</SettingsContext>;
};
