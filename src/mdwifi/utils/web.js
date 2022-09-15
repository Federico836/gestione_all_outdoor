/**
 * @format
 * @flow
 */

import config from '../config/AppConfig';

export const getRegistrationUrl = (lang: string): string => {
  lang = lang.substring(0, 2);
  return config.REGISTRATION_URLS[lang]
    ? config.REGISTRATION_URLS[lang]
    : config.REGISTRATION_URLS.en;
};

export default {
  getRegistrationUrl,
};
