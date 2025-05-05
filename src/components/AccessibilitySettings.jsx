import React, { useState, useEffect } from "react";
import { useSettings } from "../components/SettingsContext";
import { useTranslation } from "react-i18next";
import "../styles/Settings.css";

export default function AccessibilitySettings() {
  const { settings, updateSettings } = useSettings();
  const { t, i18n } = useTranslation();
  const [tempSettings, setTempSettings] = useState(settings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  const fontSizes = {
    Small: "12px",
    Medium: "20px",
    Large: "30px",
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
    updateSettings(tempSettings);
    setMessage("Dine indstillinger er gemt!");
    setTimeout(() => setMessage(""), 3000);
  };

  const revertChanges = () => {
    setTempSettings(settings);
    updateSettings(settings);
  };

  const previewTranslation = (key) => {
    const lang = tempSettings.language;
    return (
      i18n.getResource(lang, "translation", key) ||
      `Missing: ${key} (${lang})`
    );
  };

  const previewStyle = {
    fontFamily: fontFamilies[tempSettings.fontType],
    fontSize: fontSizes[tempSettings.fontSize],
    ...contrastStyles[tempSettings.contrast],
  };

  return (
    <div className="accessibility__wrapper">
      {/* Left Panel */}
      <div className="accessibility__container">
        <h2>{t("accessibilitySettings")}</h2>


        {/* Confirmation Message */}
        {message && <div className="accessibility__message">{message}</div>}

        {/* Font Size */}
        <div className="accessibility__section">
          <label className="accessibility__label">{t("fontSize")}</label>
          <div className="accessibility__button-group">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                className="accessibility__button"
                onClick={() => updateTempSetting("fontSize", size)}
              >
                {size[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Font Type */}
        <div className="accessibility__section">
          <label className="accessibility__label">{t("fontType")}</label>
          <select
            className="accessibility__select"
            value={tempSettings.fontType}
            onChange={(e) => updateTempSetting("fontType", e.target.value)}
          >
            {Object.keys(fontFamilies).map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="accessibility__section">
          <label className="accessibility__label">{t("language")}</label>
          <select
            className="accessibility__select"
            value={tempSettings.language}
            onChange={(e) => {
              const lang = e.target.value;
              updateTempSetting("language", lang);
            }}
          >
            <option value="en">English</option>
            <option value="da">Danish</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        {/* Contrast */}
        <div className="accessibility__section">
          <label className="accessibility__label">{t("contrast")}</label>
          <select
            className="accessibility__select"
            value={tempSettings.contrast}
            onChange={(e) => updateTempSetting("contrast", e.target.value)}
          >
            <option>Normal</option>
            <option>High</option>
          </select>
        </div>

        {/* Screen Reader Toggle */}
        <div className="accessibility__section">
          <div className="accessibility__toggles">
            <span className="accessibility__toggle-label">Screen Reader</span>
            <div
              className={`accessibility__toggle-switch ${
                tempSettings.screenReader ? "enabled" : ""
              }`}
              onClick={() =>
                updateTempSetting("screenReader", !tempSettings.screenReader)
              }
              role="switch"
              aria-checked={tempSettings.screenReader}
            />
          </div>
        </div>

        {/* Voice Control Toggle */}
        <div className="accessibility__section">
          <div className="accessibility__toggles">
            <span className="accessibility__toggle-label">Voice Control</span>
            <div
              className={`accessibility__toggle-switch ${
                tempSettings.voiceControl ? "enabled" : ""
              }`}
              onClick={() =>
                updateTempSetting("voiceControl", !tempSettings.voiceControl)
              }
              role="switch"
              aria-checked={tempSettings.voiceControl}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="accessibility__button-group">
          <button className="accessibility__button" onClick={revertChanges}>
            {t("revert")}
          </button>
          <button className="accessibility__button" onClick={applyChanges}>
            {t("apply")}
          </button>
        </div>

      </div>

      {/* Right Panel - Preview */}
      <div className="accessibility__preview" style={previewStyle}>
        <h3>{previewTranslation("mealTitle") || "Meal 10 - Chicken Biryani"}</h3>
        <img
          src="/public/PreviewImage.png"
          alt="Chicken Biryani"
          style={{ width: "200px", borderRadius: "8px" }}
        />
        <p>
          {previewTranslation("mealDescription") ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry..."}
        </p>
      </div>
    </div>
  );
}
