import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationDA from "./locales/da/translation.json";
// import translationDE from "./locales/de/translation.json";
// Add more as needed

const resources = {
  en: { translation: translationEN },
  da: { translation: translationDA },
  // de: { translation: translationDE },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;