/**
 * @format
 * @flow
 */

// import { i18n } from '../utils';
export type BrakeModes = $ReadOnly<{|
  POSITION: 0,
  WATT: 1,
  FEC_ANT_WATT: 3,
  FEC_BLE_WATT: 5,
|}>;
export type BrakeMode = $Values<BrakeModes>;
export type BrakeValue = number;
export type Brake = {|value: BrakeValue, mode: BrakeMode|};

const brakeModes: BrakeModes = {
  POSITION: 0,
  WATT: 1,
  FEC_ANT_WATT: 3,
  FEC_BLE_WATT: 5,
};
const settings: $ReadOnly<{|
  modes: BrakeModes,
|}> = {
  modes: brakeModes,
};

export default settings;
