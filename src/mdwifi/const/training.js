/**
 * @format
 * @flow
 */

import offsetTableStandard from './tableStandard';
import offsetTablePlusMinus from './tablePlusMinus';
import offsetTableNewton from './tableNewton';
// import { i18n } from '../utils';
export type TrainingModes = $ReadOnly<{|
  MD_TRAINING: 'MD_TRAINING',
  MD_ROUTE: 'MD_ROUTE',
  FEC_ANT_VIRTUAL_GEAR: 'FEC_ANT_VIRTUAL_GEAR',
  FEC_BLE_VIRTUAL_GEAR: 'FEC_BLE_VIRTUAL_GEAR',
|}>;
export type TrainingMode = $Values<TrainingModes>;
const trainingModes: TrainingModes = {
  MD_TRAINING: 'MD_TRAINING',
  MD_ROUTE: 'MD_ROUTE',
  FEC_ANT_VIRTUAL_GEAR: 'FEC_ANT_VIRTUAL_GEAR',
  FEC_BLE_VIRTUAL_GEAR: 'FEC_BLE_VIRTUAL_GEAR',
};

export type TrainingRunningModes = $ReadOnly<{|
  READY_TO_START: 'READY_TO_START',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  FINISHED: 'FINISHED',
|}>;
export type TrainingRunningMode = $Values<TrainingRunningModes>;
const trainingRunningModes: TrainingRunningModes = {
  READY_TO_START: 'READY_TO_START',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  // STOPPED: 'STOPPED',
  FINISHED: 'FINISHED',
};
export type TrainingFreeModes = $ReadOnly<{|
  POSITION: 'P',
  AUTO_WATT: 'W',
  AUTO_NEWTON: 'N',
|}>;
export type TrainingFreeMode = $Values<TrainingFreeModes>;
const trainingFreeModes: TrainingFreeModes = {
  POSITION: 'P',
  AUTO_WATT: 'W',
  AUTO_NEWTON: 'N',
};
export const offsetTableNames = {
  STANDARD: 'STANDARD',
  PLUS_MINUS: 'PLUS_MINUS',
  NEWTON: 'NEWTON',
};
export const offsetTableNamesArr = [
  offsetTableNames.STANDARD,
  offsetTableNames.PLUS_MINUS,
  offsetTableNames.NEWTON,
];
export const offsetTables = {
  [offsetTableNames.STANDARD]: offsetTableStandard,
  [offsetTableNames.PLUS_MINUS]: offsetTablePlusMinus,
  [offsetTableNames.NEWTON]: offsetTableNewton,
};

export type WorkoutTypes = $ReadOnly<{|
  AUTOCAL: 'autocal',
  AUTOGEST: 'autogest',
  AUTOGEST_EVOLUTION: 'autogest evolution',
  AUTOTEST: 'autotest',
  PIT: 'pit',
  FIT: 'fit',
  ROUTE: 'route',
|}>;
export type WorkoutType = $Values<WorkoutTypes>;
const workoutTypes: WorkoutTypes = {
  AUTOCAL: 'autocal',
  AUTOGEST: 'autogest',
  AUTOGEST_EVOLUTION: 'autogest evolution',
  AUTOTEST: 'autotest',
  PIT: 'pit',
  FIT: 'fit',
  ROUTE: 'route',
};

export type WorkoutCategoryTypes = $ReadOnly<{|
  HTT: 'htt',
  AUTOCAL: 'autocal',
  AUTOGEST: 'autogest',
  AUTOGEST_EVOLUTION: 'autogest evolution',
  PAY_PER_USE: 'pay per use',
  AUTOTEST: 'autotest',
  PIT: 'pit',
  OTHER_TRAINERS: 'other_trainers',
  WRITTEN_BY_USER: 'written_by_user',
  FIT: 'fit',
  PURE_STRENGTH: 'forza pura',
  UNKNOWN: 'unknown',
|}>;
export type WorkoutCategoryType = $Values<WorkoutCategoryTypes>;
const workoutCategoryTypes: WorkoutCategoryTypes = {
  HTT: 'htt',
  AUTOCAL: 'autocal',
  AUTOGEST: 'autogest',
  AUTOGEST_EVOLUTION: 'autogest evolution',
  PAY_PER_USE: 'pay per use',
  AUTOTEST: 'autotest',
  PIT: 'pit',
  OTHER_TRAINERS: 'other_trainers',
  WRITTEN_BY_USER: 'written_by_user',
  FIT: 'fit',
  PURE_STRENGTH: 'forza pura',
  UNKNOWN: 'unknown',
};

const settings = {
  modes: trainingModes,
  freeModes: trainingFreeModes,
  runModes: trainingRunningModes,
  noDataTicksToPauseTraining: 20, //4
  maxTicksToPreviousStep: 14,
  rpmThresholdDefault: 40,
  rpmThresholdPIT: 20,
  rpmThresholdAutogestEvolution: 20,
  offset: {
    tables: offsetTables,
    tableNames: offsetTableNames,
    steps: {
      POSITION: 1,
      WATT: 5,
      NEWTON: 0.5,
    },
  },
  workout: {
    categoryTypes: workoutCategoryTypes,
    types: workoutTypes,
  },
  dataFilters: {
    rpmMax: 200,
  },
  routeRampTime: 5, // seconds
};
const stepSensorRequirements = {};

export default settings;

// zeroSpeedStepsToPauseTraining: 4,
// zeroRpmTicksToPauseTraining: 10,
// zeroBpmTicksToPauseTraining: 10,
