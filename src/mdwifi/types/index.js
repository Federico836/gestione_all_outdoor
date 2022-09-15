/**
 * @format
 * @flow
 */

import type {Reducers} from '../reducers';
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
export type Store = $ObjMap<Reducers, $ExtractFunctionReturn>;

// TODO: https://github.com/flow-typed/
export type Action = $ReadOnly<{type: string}>; // , payload: any
export type Dispatch = (action: Action) => any;

// import type {TrainingRunningModes, TrainingMode} from '../const/training';

export type RollerTypes = {|
  JARVIS: 'JARVIS',
  P30: '30',
  P25: '25',
  UNKNOWN: 'UNKNOWN',
|};
export type RollerType = $Values<RollerTypes>;

// import type {DeviceInfoState} from '../reducers/deviceInfo'; // DeviceInfoAction
// import type {AuthState} from '../reducers/auth'; // DeviceInfoAction
// import type {UsersState} from '../reducers/users'; // DeviceInfoAction
export type Alert = {alertType: string, title: string, message: string};

// export type Store = {
//   auth: AuthState,
//   deviceInfo: DeviceInfoState,
//   training: {
//     alert: ?Alert,
//     runningStatus: TrainingRunningModes,
//     records: Array<Object>,
//     mode: TrainingMode,
//   }, // TODO:
//   users: UsersState,
// };

export type WheelSize = $ReadOnly<{value: number, text: string, c?: number}>;
export type WheelSizesArray = Array<WheelSize>;

export type * from '../const/brake';
// import type {BrakeMode} from '../const/brake';
// const brake: BrakeMode = {};
// export type Brake = {|value: BrakeValue, mode: BrakeMode|};
