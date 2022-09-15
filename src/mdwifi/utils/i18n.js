/**
 * @format
 * @flow
 */
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './translations/en/translation.json';
import it from './translations/it/translation.json';

const resources = {
  en,
  it,
};

const translations = {en, it};
const fallback = {languageTag: 'en', isRTL: false};
const {languageTag, isRTL} =
  RNLocalize.findBestAvailableLanguage(Object.keys(translations)) || fallback;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: __DEV__ ? true : false,
    resources,
    lng: languageTag,
    fallbackLng: 'en',
    defaultNS: 'common',
    // keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

export const getTwoLetterCurrentLocale = (def: string = 'en'): string => {
  if (i18n.language) {
    return i18n.language.substring(0, 2);
  }
  return def;
};
