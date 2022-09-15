/**
 * @format
 * @flow
 */
import type moment from 'moment';

export type Exact<T> = T & $Shape<T>;

export type Store = {|
  nav: Object,
  auth: StoreAuthState,
  md: StoreMdState,
  user: StoreUserState,
  users: StoreUsersState,
  workouts: StoreWorkoutsState,
  activities: StoreActivitiesState,
  training: StoreTrainingState,
  netinfo: NetInfoState,
|};

// key uuid
export type StoreUsersState = $ReadOnly<{|
  [uuid: string]: User & {
    syncing?: ?boolean,
    syncingUserData?: ?boolean,
    syncingWorkouts?: ?boolean,
    syncingActivities?: ?boolean,
  },
|}>;
export type StoreWorkoutsState = {|
  [uuid: string]: Workout, // key uuid
|};
export type StoreActivitiesState = {|
  [uuid: string]: Activity, // key uuid
|};

export type NetInfoState = {|
  status: string,
  apiResponds: ?boolean,
|};

export type StoreAuthState = {|
  // user: User | null,
  isLoading: boolean,
  isRegistering: boolean,
  error: string | null,
  // regError: string | null,
  lastLoginEmail: string,
  lastLoginPassword: string,
  userId: number | null,
  userUuid: string | null,
|};

export type StoreMdState = {
  device: DeviceType | null,
  status: Object | null,
  statusWaitingRequests: number,
  statusOutdatedTicks: number,
  connectionSettings: Object | null,
  isConnected: boolean,
  error: string | null,
  gettingSettings: boolean,
  savingSettings: boolean,
};

export type StoreUserState = {
  data: User | null,
  workouts: Array<Workout>,
  workoutsListIsLoading: boolean,
  workoutsListLoadingError: ?string,
};

export type StoreTrainingState = {
  readyToStart: boolean,
  runningStatus: string,
  freeTrainingMode: string,
  freeTrainingValue: number,
  progressionValue: number,
  userOffset: number,
  brakeValueRequired: number,
  brakeModeRequired: number,
  maxBrakePosition: number,
  requirements: Set<string>,
  // speedZeroTickCounter: number,
  resetKeysRequired: number,
  status: {
    wattUnder10: number,
    rpmUnder40: number,
  },
  workout: ?Workout,
  workoutStep: ?WorkoutStep,
  workoutStepIndex: number,
  stepTickCounter: number,
  totalTickCounter: number,
  avgObj: avgObjType,
  totalObj: totalObjType,
  records: Array<ActivityRecord>,
  events: Array<Object>,
  lastRealTickData: realTickDataType,
  hardKeyPlusPressed: number,
  hardKeyMinusPressed: number,
  useLatestRpmValue: boolean,
  previousTrainingValue: number,
  recoveryEnabled: boolean,
  recoveryStartTickNumber: number,
  stepPeakWattage: number,
  rpmWasHigherThanThreshold: boolean,
  user: ?User,
  userWeight: number,
};

export type avgObjType = {|
  speed: Array<number>,
  watt: Array<number>,
  rpm: Array<number>,
  bpm: Array<number>,
|};
export type realTickDataType = {|
  speed: number,
  watt: number,
  rpm: number,
  bpm: number,
  newton: number,
  timestamp: number,
|};
export type totalObjType = {|
  speed: number,
  watt: number,
  rpm: number,
  bpm: number,
|};

export type ActivityRecordTickData = {|
  speed: number,
  watt: number,
  rpm: number,
  bpm: number,
  newton: number,
  status: Object,
|};

export type ActivityRecord = {|
  timestamp: number,
  // time: number,
  tick: ActivityRecordTickData,
  speed: number,
  watt: number,
  rpm: number,
  bpm: number,
  speedTick: number,
  wattTick: number,
  rpmTick: number,
  bpmTick: number,
  newton: number,
  stepType: string,
  //
  // var iappV : Float = 0
  // //var iappW : uint = 0
  // //var iappR : uint = 0
  // //var iappH : Int = 0
  // var Spazio : Float = 0
|};

export type DeviceType = {
  firmware: string,
  firmwareObj: firmwareVersionObject,
  name: string,
  maxBrakePosition: number,
  wifi?: WifiSettingsType,
  ant?: AntSettingsType,
  rpmSensor?: rpmSensorType,
  bpmSensor?: bpmSensorType,
  memDatOriginalBuffer?: Buffer,
};

export type DeviceSettingsType = {
  wifi?: WifiSettingsType,
  ant?: AntSettingsType,
  rpmSensor?: rpmSensorType,
  bpmSensor?: bpmSensorType,
  blocked?: boolean,
};

// tx
// AntEnabled[5] == 1 "FE-C"
// AntEnabled[6] == 1 "Power"
// else Setup_TipoANT = "No"
// rpm
// AntEnabled[2] == 1) "ANT+ Speed & Cadence"
// AntEnabled[3] == 1) "ANT+ Cadence"
// else Setup_TipoRPM "MD Cable"

// AntEnabled[0]
// AntEnabled[1]
// AntEnabled[2] rpm
// AntEnabled[3] rpm
// AntEnabled[4]
// AntEnabled[5] tx
// AntEnabled[6] tx
// AntEnabled[7]

export type AntSettingsType = {|
  tx: number,
  // rpm: number,
|};

export type rpmSensorType = {|
  type?: number,
  serials?: {
    CADENCE: number,
    SPEED_CADENCE: number,
  },
|};

export type bpmSensorType = {|
  serial: number,
|};
// hrm: boolean,
// bp: boolean,
// bsc: boolean,
// bs: boolean,
// fecTx: boolean,
// bpTx: boolean,
// bscTx: boolean,
// ant+ TX: No/Power/FE-C
// heartRate: ANT+ (MD)
// rpm: MD Cable/ANT+ Cadence/ANT+ Speed & Cadence/SRM Cadence
// if rpm: MD Cable SerialRpm.hidden = true

export type WifiSettingsType = {|
  mode: number, // //1=STA 2=AP
  addr: string,
  mask: string,
  gateway: string,
  port: number,
  name: string,
  password: string,
  channel?: number,
|};

export type UserData = {
  id: number,
  firstname?: string,
  lastname?: string,
  birthDate?: string, //?moment
  weight?: number,
  height?: number,
  bodyFat?: number,
  heartRate?: number,
  bpmControl: boolean,
  bpmThreshold: number,
  bpmControlMode: number,
  bpmControlModeValue: number,
  bpmNotification: boolean,
  metronomeEnabled: boolean,
  metronomeDoubleRate: boolean,
};

export type User = {
  // data from "generate_auth_cookie" web api
  id?: number,
  uuid?: string,
  dirName?: string,
  email: string,
  password: string,
  username: string,
  firstname: string,
  lastname: string,
  nicename: string,
  nickname: string,
  displayname: string,

  // REVIEW inmemory variables for webapi sync. Do not save them
  cookie: string | null,
  cookie_name: string | null,

  //TODO other data
  url: string,
  description: string,
  avatarUrl: string,
  // "registered": "2017-03-08 10:39:14",
  capabilities: Object, // "atleta": true

  // data from "get_utente" web api
  birthDate?: string, // moment, // "data_nascita": "", REVIEW
  weight?: string, // "peso": "",
  height?: string, // "altezza": "",
  // TODO other data
  // "massa_grassa": "",
  // "frequenza_cardiaca": ""
  //TODO where to get sex flag\
  sex?: Sex,
  registered: number, // 0 - no, 1 - yes
  loggedIn: number,
  // registered is number and may be used to used "2" as "already exists on server with this username/email/etc"
  thresholdWatt: number,
  syncingUserData?: boolean,
  syncingWorkouts?: boolean,
  syncingActivities?: boolean,

  metronomeEnabled?: boolean,
  metronomeDoubleRate?: boolean,

  graph?: boolean,
  lastLogin?: number,
  thresholdRpm: number,
};

export type Sex = 0 | 1;

export type Heart = {
  bpmReference: number,
  wattThreshold: number,
  bpmThreshold: number,
  wattPerBpm: number,
  firstStepDuration: number,
  nextStepsDuration: number,
  coefficient: number,
  halve: boolean,
  // tempo1 //REVIEW unused
  // tempo2
};

export type TestPiDataType = {
  progressionStartWatt: number, // PI_watt: number,
  progressionStepWatt: number, // PI_incremento: number,
  progressionStepWattTime: number, // PI_intervallo: number,
  // progressionStepRepeat: number, // PI_ripetizioni: number,
  progressionStepRpm: number | string, // PI_rpm_string: number | string,
  recoveryEnabled?: boolean, // PI_check_recupero: number,
  recoveryType?: number, // PI_tipo_recupero: number,
  recoveryTime?: number, // PI_tempo_recupero: number,
  recoveryValue?: number, // PI_freno_recupero: number,
  recoveryBpmPercentPoint?: number, // PI_soglia_recupero: number,
};
export type TestPsDataType = {
  testType: number, // int.TryParse(sapp[1], out frm1.PS_tipo_test);
  distance?: number, // int.TryParse(sapp[2], out frm1.PS_km_test);
  duration?: number, // int.TryParse(sapp[3], out frm1.PS_secondi_test);
  brakePosition?: number, // int.TryParse(sapp[4], out frm1.PS_freno_test);
  watt?: number, // int.TryParse(sapp[5], out frm1.PS_watt_target);
  // TODO recovery
  // recoveryEnabled?: boolean
  // bool.TryParse(sapp[6], out frm1.PS_recupero);
  // int.TryParse(sapp[7], out frm1.PS_tipo_soglia);
  // int.TryParse(sapp[8], out frm1.PS_soglia_recupero);
  // int.TryParse(sapp[9], out frm1.PS_freno_recupero);
  // int.TryParse(sapp[11], out frm1.PS_auto_watt_test);
};

export type WattOffset = {|rpm: number, watt: number|};
export type NewtonOffset = {|rpm: number, newton: number|};

export type Workout = {
  id?: number,
  uuid?: string,
  userId?: number,
  userUuid?: number,
  name: string,
  type: string,
  tipoWorkout: ?string,
  trainerId: number,
  baseId: ?number, // REVIEW id_scheletro
  date?: moment, // TODO add speaking name, created_at?
  license?: string, // REVIEW
  heartString?: string, // REVIEW
  heart?: Heart,
  notes?: string,
  steps?: Array<WorkoutStep>,
  deleted: boolean,
  expired: boolean,
  version: number,
  wattReference: number,
  rpmReference: number,
  bpmReference: number,
  newtonReference: number,
  framework: number,
  createdAt: string,
  updatedAt: string,
  executionsLimit: number,
  downloadsLeft: number,
  executionsCount: number,
  isLoading?: boolean,
  isSaving?: boolean,
  isError?: boolean,
  testIndexString?: string,
  testPiOldString?: string,
  testPiObject?: ?TestPiDataType,
  testPsHeaderString?: string,
  testPsString?: string,
  testPsObject?: ?TestPsDataType,
};

export type WorkoutStepUnknown = {|
  index: number,
  type: 'UNKNOWN',
  csvString: string,
  crankLeftUnblocked?: boolean,
  crankRightUnblocked?: boolean,
|};

// 'Nr.;Rapporto;Freno;Tempo (sec);Watt;Rpm;Bpm;MediaValori;Descrizione;perceWatt;perceRpm;NewtonMetro;'
// + 'perceN;Lavoro;tipoProg;p2;p3;p4;p5;p6;p7;p8;p9;p10;p11;p12;p13;p14;p15;p16;p17;p18;p19;p20'
export type WorkoutBaseStep = {
  index: number,
  rapporto: string,
  duration: number,
  watt: number | string,
  rpm: number | string,
  newton: number | string,
  description: string,
  offsetTableUse: boolean,
  offsetTableType: number,
  csvString: string,
  avgMode: number,
  avgPoints: number,
  isMaster: boolean,
  isSlave: boolean,
  wattPercent: number | null,
  rpmOffset: number | null,
  newtonOffset: number | null,
  crankLeftUnblocked?: boolean,
  crankRightUnblocked?: boolean,
};

// if (frm1.trnData[ii].vett_prog[1] == "A") dataGridView1.Rows[ii].Cells["Freno"].Value = "PROG. W";
// else if (frm1.trnData[ii].vett_prog[1] == "B") dataGridView1.Rows[ii].Cells["Freno"].Value = "BPM";
// else if (frm1.trnData[ii].vett_prog[1] == "C") dataGridView1.Rows[ii].Cells["Freno"].Value = "PROG. RPM";
// else if (frm1.trnData[ii].vett_prog[1] == "D") dataGridView1.Rows[ii].Cells["Freno"].Value = "AUTO Nm";
// else if (frm1.trnData[ii].vett_prog[1] == "TEST_PI") dataGridView1.Rows[ii].Cells["Freno"].Value = "TEST PI";
// else if (frm1.trnData[ii].vett_prog[1] == "TEST_PS") dataGridView1.Rows[ii].Cells["Freno"].Value = "TEST PS";
// else if (frm1.trnData[ii].vett_prog[1] == "G") dataGridView1.Rows[ii].Cells["Freno"].Value = "PROG. Nm";
// else if (frm1.trnData[ii].vett_prog[1] == "NM") dataGridView1.Rows[ii].Cells["Freno"].Value = "TEST Nm";
// else if (frm1.trnData[ii].vett_prog[1] == "CM") dataGridView1.Rows[ii].Cells["Freno"].Value = "Crono NM";
// else if (frm1.trnData[ii].vett_prog[1] == "GARA") dataGridView1.Rows[ii].Cells["Freno"].Value = "Crono Nm Km";

export type WorkoutStepAutoWatt = {|
  ...$Exact<WorkoutBaseStep>,
  type: 'AUTO',
  activityType: 'AUTO WATT',
  watt: number,
  offsetAllowed: boolean,
|}; // & WorkoutBaseStep // require update flow to ^0.111

export type WorkoutStepZone = {
  type: 'ZONE',
  activityType: 'ZONE',
  watt: number,
} & WorkoutBaseStep;

export type WorkoutStepZoneHead = {
  index: number,
  type: 'ZONE_HEAD',
  csvString: string,
  crankLeftUnblocked?: boolean,
  crankRightUnblocked?: boolean,
};

export type WorkoutStepBrakePosition = {
  type: 'BRAKE_POSITION',
  activityType: 'NORMAL',
  brakePosition: number,
} & WorkoutBaseStep;

export type WorkoutStepStop = {
  type: 'STOP',
  activityType: 'STOP',
  brakePosition: number,
  offsetAllowed: true,
} & WorkoutBaseStep;

export type WorkoutStepBPM = {
  type: 'BPM',
  activityType: 'BPM',
  bpmReference: number,
  wattThreshold: number,
  bpmThreshold: number,
  wattPerBpm: number,
  firstStepDuration: number,
  nextStepsDuration: number,
  coefficient: number,
  halve: boolean,
} & WorkoutBaseStep;

export type WorkoutStepTestPI = {
  type: 'TEST PI',
  activityType: 'TEST PI',
  progressionStartWatt: number,
  progressionStepWatt: number,
  progressionStepWattTime: number,
  // progressionStepRepeat: number,
  progressionStepRpm: number | string,
  recoveryEnabled?: boolean,
  recoveryType?: number,
  recoveryTime?: number,
  recoveryValue?: number,
  recoveryBpmPercentPoint?: number,
} & WorkoutBaseStep;

export type WorkoutStepTestPS = {
  type: 'TEST PS',
  activityType: 'TEST PS',
  testType: number, // int.TryParse(sapp[1], out frm1.PS_tipo_test);
  distance?: number, // int.TryParse(sapp[2], out frm1.PS_km_test);
  duration?: number, // int.TryParse(sapp[3], out frm1.PS_secondi_test);
  brakePosition?: number, // int.TryParse(sapp[4], out frm1.PS_freno_test);
  watt?: number, // int.TryParse(sapp[5], out frm1.PS_watt_target);
  // TODO recovery
  // recoveryEnabled?: boolean
  // bool.TryParse(sapp[6], out frm1.PS_recupero);
  // int.TryParse(sapp[7], out frm1.PS_tipo_soglia);
  // int.TryParse(sapp[8], out frm1.PS_soglia_recupero);
  // int.TryParse(sapp[9], out frm1.PS_freno_recupero);
  // int.TryParse(sapp[11], out frm1.PS_auto_watt_test);
} & WorkoutBaseStep;

export type WorkoutStepIdealRhythms = {
  type: 'Ritmi Ideali',
  activityType: 'RITMI_IDEALI',
  rpmReference: number,
  rpmReferenceOffset: number | null,
  rpmOffset: number | null,
  wattPercentReference: number,
  rpmStepReference: number,
  wattReference: number,
  subSteps: Array<WorkoutSubStepIdealRhythms>,
} & WorkoutBaseStep;

export type WorkoutSubStepIdealRhythms = {|
  index: number,
  duration: number,
  rpm: string | number,
  rpmOffset: number | null,
|};

export type WorkoutStepCronoNM = {
  type: 'Crono NM',
  activityType: 'CRONO NEWTON',
  subSteps: Array<WorkoutSubStepTestNM>,
} & WorkoutBaseStep;

export type WorkoutStepTestNM = {
  type: 'TEST Nm',
  activityType: 'TEST_NM',
  subSteps: Array<WorkoutSubStepTestNM>,
} & WorkoutBaseStep;

export type WorkoutSubStepTestNM = {|
  index: number,
  duration: number,
  durationOffset: number,
  newton: number,
  rpm: string,
|};
export type WorkoutStepRace = {
  type: 'Crono Nm Km',
  activityType: 'GARA',
  distance: number,
  subSteps: Array<WorkoutSubStepRace>,
  offsetAllowed: boolean,
  wattRace: boolean,
} & WorkoutBaseStep;

export type WorkoutSubStepRace = {|
  index: number,
  distance: number,
  newton: number,
  newtonOffset: number,
  slope: number,
  rpm: string,
  rpmOffset: string,
  alt?: number,
  altOffset?: number,
  distanceOffset: number,
  distanceDone: number,
|};

export type WorkoutStepRoute = {
  type: 'Percorso',
  activityType: 'PERCORSO',
  distance: number,
  subSteps: Array<WorkoutSubStepRoute>,
} & WorkoutBaseStep;

export type WorkoutSubStepRoute = {|
  index: number,
  distance: number,
  distanceOffset: number,
  distanceDone: number,
  newtonOffset: number,
  slope: number,
  alt: number,
  altOffset: number,
|};

export type WorkoutStepRouteNewton = {
  type: 'Percorso Newton',
  activityType: 'PERCORSONEWTON',
  distance: number,
  subSteps: Array<WorkoutSubStepRouteNewton>,
  offsetAllowed: false,
} & WorkoutBaseStep;

export type WorkoutSubStepRouteNewton = {|
  index: number,
  distance: number,
  distanceOffset: number,
  distanceDone: number,
  newton: number,
  newtonOffset: number,
  slope: number,
  alt: number,
  altOffset: number,
  rpm: string,
  rpmOffset: string,
|};

export type WorkoutStepSlope = {
  type: 'Slope',
  activityType: 'SLOPE',
  distance: number,
  subSteps: Array<WorkoutSubStepSlope>,
} & WorkoutBaseStep;

export type WorkoutSubStepSlope = {|
  index: number,
  distance: number,
  distanceOffset: number,
  distanceDone: number,
  slope: number,
  alt: number,
  altOffset: number,
|};

export type WorkoutStepProgWatt = {
  type: 'PROG. W', // REVIEW import value from data/step.js
  activityType: 'PROG WATT',
  progressionStartWatt: number,
  progressionEndWatt: number,
  progressionStepWatt: number,
  progressionStepWattTime: number, // seconds
} & WorkoutBaseStep;

export type WorkoutStepProgNewton = {
  type: 'PROG. Nm', // REVIEW import value from data/step.js
  activityType: 'PROG NEWTON',
  progressionStartNewton: number,
  progressionEndNewton: number,
  progressionStepNewton: number,
  progressionStepNewtonTime: number,
  progressionStartRpm: number | string,
  progressionEndRpm: number,
  progressionStepRpm: number,
  progressionStepRpmTime: number,
} & WorkoutBaseStep;

export type WorkoutStepProgRpm = {
  type: 'PROG. RPM',
  activityType: 'PROG RPM',
  progressionStartRpm: number,
  progressionEndRpm: number,
  progressionStepRpm: number,
  progressionStepRpmTime: number, // seconds
  brakePosition: number,
} & WorkoutBaseStep;

export type WorkoutStepAutoNM = {
  type: 'AUTO Nm',
  activityType: 'AUTO NEWTON',
  newton: number,
} & WorkoutBaseStep;

export type WorkoutStepSustainableWatt = {
  type: 'Sostenibile Watt',
  activityType: 'SostWATT',
  watt: number,
  offsetStepWatt: number,
} & WorkoutBaseStep;

export type WorkoutStepSprint = {
  type: 'SPRINT',
  activityType: 'SPRINT',
  wattReference: number,
  rpmReference: number,
  wattReferenceIncrement: number,
  wattThresholdIncrement: number,
  wattThreshold: number,
  brakePositionOffset: number,
  wattUserThreshold: number,
  wattRequired: number,
  brakePosition?: number,
} & WorkoutBaseStep;

export type WorkoutStepHIITSubStep =
  | WorkoutStepHIITSubSprint
  | WorkoutStepHIITSubRecovery;

export type WorkoutStepHIITSprint = {
  type: 'HIIT_SPRINT',
  duration: number,
  subSteps: Array<WorkoutStepHIITSubStep>,
  sprintDuration: number,
  //  durationSprint: number,
  brakePositionOffset: number,
  repetitions: number,
  failureControl: boolean,
  failureMaxNumber: number,
  failurePercent: number,
  failureControlType: string,
  wattReferenceIncrement: number,
  wattThresholdIncrement: number,
  rpmReference: number,
  wattReference: number,
  wattThreshold: number,
  wattUserThreshold: number,
  wattRequired: number,
  wattRequiredOverride: ?number,
  rpmRequiredOverride: ?number,
  recoveryDuration: number,
  //  durationRecovery: number,
} & WorkoutBaseStep;

export type WorkoutStepPowerPeakTestSubStep =
  | WorkoutStepHIITSubSprint
  | WorkoutStepHIITSubRecovery;

export type WorkoutStepPowerPeakTest = {
  type: 'POWER PEAK TEST',
  duration: number,
  brakePositionOffset: number,
  subSteps: Array<WorkoutStepPowerPeakTestSubStep>,
  durationSprint: number,
  durationRecovery: number,
  wattReference: number,
  rpmReference: number,
  wattReferenceIncrement: number,
  wattThresholdIncrement: number,
  wattThreshold: number,
  wattUserThreshold: number,
  wattRequired: number,
  wattRequiredOverride: ?number,
  rpmRequiredOverride: ?number,
} & WorkoutBaseStep;

export type WorkoutStepHIITSubSprint = {|
  type: 'SPRINT',
  sprintIndex: number,
  duration: number,
  brakePositionOffset: number,
  brakePosition?: number,
|};

export type WorkoutStepHIITSubRecovery =
  | WorkoutStepHIITSubRecoveryStop
  | WorkoutStepHIITSubRecoveryBrake
  | WorkoutStepHIITSubRecoveryWatt;

export type WorkoutStepHIITSubRecoveryStop = {|
  type: 'RECOVERY',
  subtype: 'STOP',
  duration: number,
  brakePosition?: number,
|};
export type WorkoutStepHIITSubRecoveryBrake = {|
  type: 'RECOVERY',
  subtype: 'BRAKE',
  duration: number,
  brakePosition: number,
|};
export type WorkoutStepHIITSubRecoveryWatt = {|
  type: 'RECOVERY',
  subtype: 'AUTO_WATT',
  duration: number,
  watt: number,
  wattPercent?: ?number,
|};

export type WorkoutStepPureStrength = {
  type: 'FORZA PURA',
  duration: number,
  crankLeftUnblocked: boolean,
  crankRightUnblocked: boolean,
} & WorkoutBaseStep;

export type WorkoutStep =
  | WorkoutStepAutoWatt
  | WorkoutStepBrakePosition
  | WorkoutStepUnknown
  | WorkoutStepProgWatt
  | WorkoutStepProgRpm
  | WorkoutStepAutoNM
  | WorkoutStepZone
  | WorkoutStepZoneHead
  | WorkoutStepTestPI
  | WorkoutStepTestPS
  | WorkoutStepBPM
  | WorkoutStepProgNewton
  | WorkoutStepSustainableWatt
  | WorkoutStepIdealRhythms
  | WorkoutStepCronoNM
  | WorkoutStepTestNM
  | WorkoutStepRace
  | WorkoutStepRoute
  | WorkoutStepRouteNewton
  | WorkoutStepSlope
  | WorkoutStepSprint
  | WorkoutStepStop
  | WorkoutStepPowerPeakTest
  | WorkoutStepHIITSprint
  | WorkoutStepPureStrength;
// export type WorkoutStep = {
//   index: number,
//   rapporto: string, // REVIEW
//   brake: string,
//   duration: number, // in seconds
//   watt: number,
//   rpm: number | string,
//   bpm: number | null,
//   average: string, // REVIEW
//   name: string,
//   perceWatt: string, // REVIEW
//   perceRpm: string, // REVIEW
//   Nm: string, // REVIEW
// }

export type Activity = {
  uuid: string,
  id?: string,
  isUploading?: boolean,
  uploadError?: string,
  name: string,
  type: string,
  createdAt: string, // TODO: moment
  updatedAt: string, // TODO: moment
  records: Array<ActivityRecord>,
};

// export type ActivityRecord = {
//   power: number,
//   speed: number,
//   cadence: number,
//   heartRate: number,
//   avgPower: number,
//   avgSpeed: number,
//   avgCadence: number,
//   avgHeartRate: number,
//   iappW: number,
//   iappV: number,
//   iappR: number,
//   iappH: number,
// }

export type firmwareVersionObject = {
  major: number,
  minor: number,
  minorLetter: string,
  equipment: number,
};

/*
public TimeSpan Tempo;
public float Velocita;
public uint Potenza;
public uint Rpm;
public int heartrate;
public float avgVelocita;
public uint avgPotenza;
public uint avgRpm;
public int avgheartrate;

public float iappV;
public uint iappW;
public uint iappR;
public int iappH;

public float Spazio;

// valore che indica tipo step
public string tipo_step;
*/
