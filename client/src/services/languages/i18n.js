import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// declare
export const FOREIGN_LANGUAGES = ["en"];
export const ORIGINAL_LANGUAGE = "vi";
const resources = {
  vi: require("./translations/vi.json"),
  en: require("./translations/en.json"),
};

// initialize language
let initialLanguage = ORIGINAL_LANGUAGE;
const pathname = window.location.pathname;

for (let i = 0; i < FOREIGN_LANGUAGES.length; i++) {
  const languageCode = FOREIGN_LANGUAGES[i];
  const prefix = `/${languageCode}`;
  const removedPrefixPathname = pathname.replace(prefix, "");

  if (
    pathname.startsWith(prefix) &&
    (!removedPrefixPathname || removedPrefixPathname[0] === "/")
  ) {
    initialLanguage = languageCode;
    break;
  }
}

// initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: ORIGINAL_LANGUAGE,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
