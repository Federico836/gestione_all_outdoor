/**
 * @format
 * @flow
 */
import {i18n} from '../utils';

const types = {
  MD_CABLE: 0,
  CADENCE: 1,
  SPEED_CADENCE: 2,
};
// REVIEW: change translation
const settings = {
  types,
  typesArray: [
    {value: types.MD_CABLE, text: i18n.t('RPM:MD Cable')},
    {value: types.CADENCE, text: i18n.t('RPM:ANT+ Cadence')},
    {value: types.SPEED_CADENCE, text: i18n.t('RPM:ANT+ Speed & Cadence')},
  ],
  defaults: {
    type: types.MD_CABLE,
  },
};

export default settings;
