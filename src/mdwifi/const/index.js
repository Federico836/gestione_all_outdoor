/**
 * @format
 * @flow
 */

import type {RollerTypes} from '../types';

export const stepTypes = {
  BRAKE_POSITION: 'BRAKE_POSITION',
  AUTO_WATT: 'AUTO',
  PROGRESSION_WATT: 'PROG. W',
  AUTO_NEWTON: 'AUTO Nm',
  PROGRESSION_NEWTON: 'PROG. Nm',
  PROGRESSION_RPM: 'PROG. RPM',
  TEST_PI: 'TEST PI',
  TEST_PS: 'TEST PS',
  TEST_NM: 'TEST Nm',
  CRONO_NM: 'Crono NM',
  BPM: 'BPM',
  ZONE: 'ZONE',
  ZONE_HEAD: 'ZONE_HEAD',
  SUSTAINABLE_WATT: 'Sostenibile Watt',
  IDEAL_RHYTHMS: 'Ritmi Ideali',
  RACE: 'Crono Nm Km',
  ROUTE: 'Percorso',
  ROUTE_NEWTON: 'Percorso Newton',
  PROGRESSION_JOULE: 'Prog. Joule',
  TEST_JOULE: 'Test Joule',
  SPRINT: 'SPRINT',
  STOP: 'STOP',
  POWER_PEAK_TEST: 'POWER PEAK TEST',
  HIIT_SPRINT: 'HIIT_SPRINT',
  SLOPE: 'Slope',
  PURE_STRENGTH: 'FORZA PURA',
  WINGATE: 'WINGATE',
  UNKNOWN: 'UNKNOWN',
};
export type stepTypesKeys = $Keys<typeof stepTypes>;
export const stepActivityTypes = {
  BRAKE_POSITION: 'NORMAL',
  AUTO_WATT: 'AUTO WATT',
  PROGRESSION_WATT: 'PROG WATT',
  AUTO_NEWTON: 'AUTO NEWTON',
  PROGRESSION_NEWTON: 'PROG NEWTON',
  PROGRESSION_RPM: 'PROG RPM',
  TEST_PI: 'TEST_PI',
  TEST_PS: 'TEST_PS',
  TEST_NM: 'TEST_NM',
  CRONO_NM: 'TEST_NM', // TODO: REVIEW, in Win same as TEST_NM, for now we use same
  BPM: 'BPM',
  ZONE: 'ZONE',
  ZONE_HEAD: 'ZONE_HEAD',
  SUSTAINABLE_WATT: 'SostWATT',
  IDEAL_RHYTHMS: 'RITMI_IDEALI',
  RACE: 'GARA',
  ROUTE: 'PERCORSO',
  ROUTE_NEWTON: 'PERCORSONEWTON',
  PROGRESSION_JOULE: 'PROJOULE',
  TEST_JOULE: 'TESTJOULE',
  SPRINT: 'SPRINT',
  STOP: 'STOP',
  SLOPE: 'SLOPE',
  PURE_STRENGTH: 'FORZA PURA',
  // SZ TODO: stepActivityTypes for
  // POWER_PEAK_TEST
  // HIIT_SPRINT
};

export type HeartRateControlModes = $ReadOnly<{|
  PAUSE: 0,
  PERCENT_DECREASE: 1,
|}>;
export type HeartRateControlMode = $Values<HeartRateControlModes>;
export const controlModes: HeartRateControlModes = {
  PAUSE: 0,
  PERCENT_DECREASE: 1,
};

export const heart = {
  // DEFAULT_HEART_STRING: '0;0;0;0;0;0;0;0;0;0;0;0;0;0'
  DEFAULT_HEART_STRING: '0;200;160;3;10;60;2;False;60;10;;;;',
  CONTROL_DEFAULT_ENABLED: true,
  CONTROL_DEFAULT_THRESHOLD: 120,
  CONTROL_DEFAULT_MODE: controlModes.PAUSE,
  CONTROL_DEFAULT_MODE_VALUE: 20,
  CONTROL_DECREASE_BPM_OFFSET: 5,
  CONTROL_DECREASE_TIME_OFFSET: 7, // seconds
  controlModes,
};

// Nr.;Rapporto;Freno;Tempo (sec);Watt;Rpm;Bpm;MediaValori;Descrizione;perceWatt;perceRpm;NewtonMetro;'
// 'perceN;Lavoro;tipoProg;p2;p3;p4;p5;p6;p7;p8;p9;p10;p11;p12;p13;p14;p15;p16;p17;p18;p19;p20
export const stepCSVStringIndex = {
  INDEX: 0,
  RAPPORTO: 1,
  STEP_TYPE: 2,
  BRAKE_POSITION: 2, // if we have constant brake position it will be number as step_type with value less than 31
  DURATION: 3,
  WATT: 4,
  RPM: 5, // number or text
  BPM: 6,
  AVERAGE: 7,
  DESCRIPTION: 8,
  WATT_PERCENT: 9,
  RPM_OFFSET: 10,
  NEWTON: 11,
  NEWTON_OFFSET: 12,
  WORK: 13,
  PROGRESSION_TYPE: 14,

  OFFSET_SETTINGS: 33,
  OFFSET_SETTINGS_OLD: 29,
  MASTER: 35,
  SLAVE: 36,
  SMART_RECOVERY: 42,
  SMART_RECOVERY_BPM_PERCENT: 34,
  TEST_PI_MASTER_PERCENT: 29,
  TEST_PI_TI2_MASTER_PERCENT: 23,

  DESCRIPTION_IT: 38,
  DESCRIPTION_EN: 39,
};

export const ant = {
  tx: {
    NO: 0,
    FEC: 1,
    POWER: 2,
  },
  rpm: {
    MD_CABLE: 0,
    SPEED_CADENCE: 1,
    CADENCE: 2,
  },
};

export const curve = {
  types: {
    BRAKE_POSITION: 'FRENO',
    NEWTON: 'NEWTON',
    NEWTON_FAST: 'AUTO_VELOCE',
    NEWTON_SLOW: 'AUTO_LENTA',
    NEWTON_CUSTOM: 'AUTO_CUSTOM',
  },
  directions: {
    DOWN: 'DOWN',
    UP: 'UP',
  },
};

export const substep = {
  types: {
    DISTANCE: 'DISTANCE',
    CURVE: 'CURVE',
  },
};

const JARVIS: 'JARVIS' = 'JARVIS';
const P30: '30' = '30';
const P25: '25' = '25';
const UNKNOWN: 'UNKNOWN' = 'UNKNOWN';

const rollerTypes: RollerTypes = {
  JARVIS,
  P30,
  P25,
  UNKNOWN,
};

export const roller: {
  +types: RollerTypes,
} = {
  types: rollerTypes,
};

export default {
  appVersionCode: 41,
  appVersionString: '2.9.3',
  appVersionFullString: 'mobile 2.9.3',
  // telemetry: false,
  workoutsStructure: 24,
  statusInterval: 500,
  workoutsStepCount: 200,
  tcpSyncConn: false,
  step: {
    count: 200,
    types: stepTypes,
    activityTypes: stepActivityTypes,
    csvIndex: stepCSVStringIndex,
  },
  substep,
  heart,
  ant,
  curve,
  roller,
  secondsToIncrementWorkoutExecutionsCounter: 300,
  secondsToSaveActivity: 300,
};
