/**
 * @format
 * @flow
 */

import {i18n} from '../utils';

const AntModes = {
  tx: {
    NO: 0,
    FEC: 1,
    POWER: 2,
  },
};
const settings = {
  modes: AntModes,
  modesArray: {
    tx: [
      {value: AntModes.tx.NO, text: i18n.t('ANT:No')},
      {value: AntModes.tx.POWER, text: i18n.t('ANT:Power')},
      {value: AntModes.tx.FEC, text: i18n.t('ANT:FE-C')},
    ],
  },
  defaults: {
    mode: {
      tx: AntModes.tx.NO,
    },
  },
};

export default settings;
