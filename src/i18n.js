import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './locales/en/translations.json';
import translationES from './locales/es/translations.json';
import translationZN from './locales/zh/translations.json';

// the translations
// (tip move them in a JSON file and import them)
export const LANGUAGES = ['en', 'es', 'zh'];
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
  zh: {
    translation: translationZN
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    whitelist: LANGUAGES,
    nonExplicitWhitelist: true, // 'en-US' becomes 'en'
    cleanCode: true, // auto-lowercase lang codes
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
