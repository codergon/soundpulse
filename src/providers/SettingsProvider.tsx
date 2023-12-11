import React from "react";
import * as Haptics from "expo-haptics";
import { useStorageState } from "hooks/useStorageState";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [[, settings], setSettings] = useStorageState<ISettings>("settings", {
    haptics: "on",
    theme: "system",
    autoplay: "off",
    autostart: "off",
  });

  const [[, signals], setSignals] = useStorageState<any[]>("signals", []);

  const updateSettings = async (
    key: keyof ISettings,
    value: ISettings[keyof ISettings]
  ) => {
    setSettings({ ...settings, [key]: value });
  };

  const hapticFeedback = (
    type: keyof typeof Haptics.ImpactFeedbackStyle = "Medium"
  ) => {
    if (settings.haptics === "off") return;
    Haptics.impactAsync(type.toLowerCase() as Haptics.ImpactFeedbackStyle);
  };

  return (
    <SettingsContext.Provider
      value={{
        signals,
        setSignals,
        hapticFeedback,

        settings,
        setSettings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export type ISettings = {
  haptics: "on" | "off";
  autoplay: "on" | "off";
  autostart: "on" | "off";
  theme: "light" | "dark" | "system";
};

interface SettingsContext {
  signals: any[];
  setSignals: (value?: any[] | undefined) => void;

  hapticFeedback: (type?: keyof typeof Haptics.ImpactFeedbackStyle) => void;

  settings: ISettings;
  updateSettings: (
    key: keyof ISettings,
    value: ISettings[keyof ISettings]
  ) => void;
  setSettings: (value?: ISettings | undefined) => void;
}

const SettingsContext = React.createContext({} as SettingsContext);

interface SettingsProviderProps {
  children: React.ReactNode;
}

export function useSettings() {
  const value = React.useContext(SettingsContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAccount must be wrapped in a <SettingsProvider />");
    }
  }
  return value;
}
