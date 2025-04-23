// src/components/SettingsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "accessibilitySettings";
const defaultSettings = {
  fontType: "Arial",
  fontSize: "Medium",
  language: "English",
  contrast: "Normal",
};

const fontFamilies = {
  Arial: "Arial, sans-serif",
  Roboto: "'Roboto', sans-serif",
  Georgia: "Georgia, serif",
  Times: "'Times New Roman', serif",
  "Lilita One": "'Lilita One', cursive",
};
const fontSizes = {
  Small: "14px",
  Medium: "16px",
  Large: "20px",
};
const contrastStyles = {
  Normal: { text: "#ffffff", bg: "transparent" /* let index.css’s bg-image show */ },
  High:   { text: "#ffff00", bg: "#000000" },
};

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // **inject styles** whenever settings change:
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontFamily = fontFamilies[settings.fontType];
    root.style.fontSize   = fontSizes[settings.fontSize];
    root.style.color      = contrastStyles[settings.contrast].text;

    // background color on <body>—the html’s bg-image stays in index.css
    document.body.style.backgroundColor = contrastStyles[settings.contrast].bg;
  }, [settings]);

  const updateSettings = (newVals) =>
    setSettings((prev) => ({ ...prev, ...newVals }));

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);