import { useEffect, useState, type ReactNode } from "react";
import { SettingsContext, defaultSettings, type Settings } from "./SettingsContext";

const STORAGE_KEY = "elprisen-settings";

const loadSettings = (): Settings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage unavailable (e.g. private mode), settings only last for this session
    }
  }, [settings]);

  const updateSettings = (changes: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...changes }));
  };

  return <SettingsContext value={{ settings, updateSettings }}>{children}</SettingsContext>;
};
