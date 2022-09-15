/**
 * @format
 * @flow
 */

export type Settings = $ReadOnly<{|
  deviceName: string,
  serverHost: string,
  serverPort: string,
  trainerHost: string,
  trainerPort: string,
  graph: boolean,
|}>;

export type SettingsShape = $Shape<Settings>;

export type User = $ReadOnly<{|
  uuid_temp: string, // uuid temporaneo per controllo modifica utente su server
  id: string, // it's uuid, hi @andrea.solimine, it's yours structure :)
  first_name: string,
  last_name: string,
  email: string,
  ftp: number,
  weight: number,
  bicycle_weight: number,
  chainrings?: Array<number>,
  cogset: Array<number>,
  cassette: Array<number>,
  wheel_circumference: number,
  frontSprocket?: number,
  rearSprocket?: number,
  color: string,
|}>;

// TODO: workout format
export type Workout = $ReadOnly<Object>;
// TODO: review, move to separate package all shared(core) data
import type {TrainingMode, TrainingRunningMode} from '../const/training';

export type TickData = $ReadOnly<{|
  mode: TrainingMode,
  runningStatus: TrainingRunningMode,
  speed: number,
  watt: number,
  rpm: number,
  bpm: number,
  newton: number,
  time: number, // minutes
  timestamp: number,
  offset: number,
  deltaRpm?: number,
  brPosReal?: number,
  brPosCom?: number,
  t?: number,
  distance: number,
  realDistanceDone: number,
  totalTickCounter: number,
  stepTickCounter: number,
  substepTickCounter: number,
  recoveryTickCounter: number,
  curveTickCounter: number,
  activityStepIndex: number,
  activitySubStepIndex: number,
  frontSprocket: number,
  rearSprocket: number,
  trainerName: ?string,
|}>;

export type RollerFirmware = $ReadOnly<{|
  major: number,
  equipment: number,
  minor: number,
  minorLetter: string,
  text: string,
|}>;

export type Event = $ReadOnly<{|
  timestamp: string,
  type: string,
  info?: string,
|}>;

export type ActivityData = $ReadOnly<{|
  name: string,
  records: Array<Object>,
  events: Array<Event>,
  workout: Workout,
  user: User,
  userWeight: number,
  wkOptions: Object,
  createdAt: string,
  updatedAt: string,
  notes: string,
  appVersionFullString: string,
  statusInterval: number,
  tcpSyncConn: boolean,
  rollerFirmwareObject: RollerFirmware,
|}>;

export type AppVersion = $ReadOnly<{|
  major: number,
  minor: number,
  patch: number,
  text: string,
|}>;

export type MessageShow = $ReadOnly<{|
  text: string,
  duration: number,
|}>;

export type ErrorMessage = $ReadOnly<{|
  code: number,
  message: string,
|}>;
