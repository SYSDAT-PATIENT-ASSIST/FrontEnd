import React, { useState, useEffect } from "react";
import { useSettings } from "../components/SettingsContext";
import { useTranslation } from "react-i18next";

export default function AccessibilitySettings() {
  const { settings, updateSettings } = useSettings();

  const [tempSettings, setTempSettings] = useState(settings);

  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  const fontSizes = {
    Small: "14px",
    Medium: "16px",
    Large: "20px",
  };

  const fontFamilies = {
    Arial: "Arial, sans-serif",
    Roboto: "'Roboto', sans-serif",
    Georgia: "Georgia, serif",
    Times: "'Times New Roman', serif",
    "Lilita One": "'Lilita One', cursive",
  };

  const contrastStyles = {
    Normal: {
      backgroundColor: "#ffffff",
      color: "#000000",
    },
    High: {
      backgroundColor: "#000000",
      color: "#ffff00",
    },
  };

  const updateTempSetting = (name, value) =>
    setTempSettings((prev) => ({ ...prev, [name]: value }));

  const applyChanges = () => {
    updateSettings(tempSettings); // Redundant now, but keeps the button meaningful
  };

  const revertChanges = () => {
    setTempSettings(settings);
    updateSettings(settings);
  };

  const { t, i18n } = useTranslation();

  const previewStyle = {
    fontFamily: fontFamilies[tempSettings.fontType],
    fontSize: fontSizes[tempSettings.fontSize],
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #ccc",
    ...contrastStyles[tempSettings.contrast],
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "2rem",
        gap: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      {/* Left Panel */}
      <div style={{ flex: 1 }}>
        <h2>{t("accessibilitySettings")}</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("fontSize")}</label>
          <div>
            <button onClick={() => updateTempSetting("fontSize", "Small")}>
              S
            </button>
            <button onClick={() => updateTempSetting("fontSize", "Medium")}>
              M
            </button>
            <button onClick={() => updateTempSetting("fontSize", "Large")}>
              L
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("fontType")}</label>
          <select
            value={tempSettings.fontType}
            onChange={(e) => updateTempSetting("fontType", e.target.value)}
          >
            <option>Arial</option>
            <option>Roboto</option>
            <option>Georgia</option>
            <option>Times</option>
            <option>Lilita One</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("language")}</label>
          <select
            value={tempSettings.language}
            onChange={(e) => {
              const lang = e.target.value;
              updateTempSetting("language", lang);
              i18n.changeLanguage(lang);
            }}
          >
            <option value="en">English</option>
            <option value="da">Danish</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>{t("contrast")}</label>
          <select
            value={tempSettings.contrast}
            onChange={(e) => updateTempSetting("contrast", e.target.value)}
          >
            <option>Normal</option>
            <option>High</option>
          </select>
        </div>

        {/* Example Screen Reader UI Placeholder */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Screen Reader:</label>
          <button>On</button>
          <button>Off</button>
          <div>
            <label>Speed</label>
            <select>
              <option>0.25x</option>
              <option>0.50x</option>
              <option>0.75x</option>
              <option>1.00x</option>
              <option>1.25x</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <button onClick={revertChanges}>{t("revert")}</button>
          <button onClick={applyChanges}>{t("apply")}</button>
        </div>
      </div>

      {/* Right Panel: Sample Page Preview */}
      <div style={{ flex: 2 }}>
        <h2>Preview</h2>
        <div style={previewStyle}>
          <h3>{t("mealTitle")}</h3>
          <img
            src="\public\PreviewImage.png"
            alt="Chicken Biryani"
            style={{ width: "200px", borderRadius: "8px" }}
          />
          <p>
            {t("mealDescription")}
          </p>
        </div>
      </div>
    </div>
  );
}
