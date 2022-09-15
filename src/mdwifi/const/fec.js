/**
 * @format
 * @flow
 */
const FEC_Modes = {
  DISABLED: -1,
  ANT_BASIC_RESISTANCE: 0,
  ANT_TARGET_POWER: 1,
  ANT_TRACK_RESISTANCE: 2,
  BLE_BASIC_RESISTANCE: 100,
  BLE_TARGET_POWER: 101,
  BLE_TRACK_RESISTANCE: 102,
};
const settings = {
  modes: FEC_Modes,
};

export default settings;
