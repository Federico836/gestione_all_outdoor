/**
 * @format
 * @flow
 */
import type {
  WifiSettingsType,
  AntSettingsType,
  rpmSensorType,
  bpmSensorType,
} from './AppTypeDefinition';

export type memDatType = {|
  wifi: WifiSettingsType,
  rpmSensor: rpmSensorType,
  ant: AntSettingsType,
  // antEnabled: Buffer,
  memDatDummySetting: Buffer,
  KEY_PowerStep: number,
  fBPCadence: number,
  memDatOriginalBuffer: Buffer,
|};

// TODO add other properties
export type memRunType = {
  rpmSensor: rpmSensorType,
  bpmSensor: bpmSensorType,
  memRunOriginalBuffer: Buffer,
};
