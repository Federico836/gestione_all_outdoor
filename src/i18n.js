import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from './i18n/locales'
import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
    // order and from where user language should be detected
  order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],
  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: ':', // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection: options
  });

  export default i18n;