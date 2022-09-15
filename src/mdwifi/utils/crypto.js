/**
 * @format
 * @flow
 */

import * as CryptoJS from 'crypto-js';
import i18n from './i18n';

const keyTDES = CryptoJS.enc.Latin1.parse('intek2010intek2010intek2');
const ivTDES = CryptoJS.enc.Latin1.parse('intek201');

export const decryptLicense = (str: string): string => {
  let license = '';
  try {
    const decrypted = CryptoJS.TripleDES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(str),
      },
      keyTDES,
      {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: ivTDES,
      },
    );
    license = decrypted.toString(CryptoJS.enc.Latin1).replace('\n', '');
  } catch (e) {}
  return license;
};

export const getLicenseText = (decryptedLicense: string): string => {
  let licenseLC = decryptedLicense.toLowerCase();
  let licText = '';
  if (licenseLC.includes('mininel')) {
    licText = i18n.t('License:Allenamento generato da Davide Mininel');
  } else if (licenseLC.includes('bonaduce')) {
    licText = i18n.t('License:Allenamento generato da Massimiliano Bonaduce');
  } else if (decryptedLicense !== '') {
    licText =
      i18n.t('License:Metod NON Ufficiale gestita da ') + decryptedLicense;
  }
  return licText;
};

export default {
  decryptLicense,
  getLicenseText,
};
