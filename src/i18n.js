
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files for different languages
import translationEN from "./locales/en/translation.json";
import translationDA from "./locales/da/translation.json";
// import translationDE from "./locales/de/translation.json"; // Uncomment if you want to support German

const resources = {
en: { translation: translationEN },
da: { translation: translationDA },
// de: { translation: translationDE }, // Uncomment to enable German translations
};

i18n
.use(LanguageDetector) // Automatically detects the user's language
.use(initReactI18next) // Initializes i18next with React
.init({
  resources,
  fallbackLng: "en", // Fallback to English if no translation is available
  lng: "en", // Default language (optional, since LanguageDetector will handle this)
  debug: true, // Set to true to enable debugging (remove in production)
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
  // You can add other configuration options as needed
});

export default i18n;