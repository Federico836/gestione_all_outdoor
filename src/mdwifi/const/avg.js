/**
 * @format
 * @flow
 */

// import { i18n } from '../utils';
const AvgCalculationModes = {
  NO: 0,
  MIN: 1,
  MED: 2,
  MAX: 3,
};
const AvgCalculationModePoints = {
  NO: 1,
  MIN: 2,
  MED: 4,
  MAX: 8,
};
const settings = {
  modes: AvgCalculationModes,
  modePoints: AvgCalculationModePoints,
};

export default settings;
