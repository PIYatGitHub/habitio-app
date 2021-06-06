import bg from "./assets/languages/BG.json";
import en from "./assets/languages/EN.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: en,
  },
  bg: {
    translation: bg,
  },
};

const DEFAULT_LANGUAGE = "bg";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: ["en", "bg"],
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
