// @flow
import moment from 'moment';
import trans from '../utils/trans';
import appConst from '../const';
import avgConst from '../const/avg';
import transforms from './Transforms';

import type {
  User as AppUser,
  UserData as AppUserData,
  Heart,
  Workout as AppWorkout,
  WorkoutStep as AppWorkoutStep,
  WorkoutBaseStep,
  WorkoutStepUnknown,
  WorkoutStepAutoWatt,
  WorkoutStepBrakePosition,
  WorkoutStepProgWatt,
  WorkoutStepProgRpm,
  WorkoutStepAutoNM,
  Activity as AppActivity,
} from '../types/AppTypeDefinition';
import type {
  User as ApiUser,
  UserData as ApiUserData,
  WorkoutListData as ApiWorkoutListData,
  WorkoutHeadData as ApiWorkoutHeadData,
  WorkoutBodyData as ApiWorkoutBodyData,
  ActivityListData as ApiActivitiesListData,
} from '../types/WebApiTypeDefinition';

// import { step.types } from '../data/step'
// import heartData from '../data/heart'

export const transformApiUserDataToAppUserData = (userData: ApiUserData): AppUserData => {
  let ud: AppUserData = {
    id: parseInt(userData.id_utente, 10),
  };
  if (userData.nome) {ud.firstname = userData.nome;}
  if (userData.cognome) {ud.lastname = userData.cognome;}
  if (userData.data_nascita) {ud.birthDate = userData.data_nascita;}
  if (userData.peso) {
    let weight = parseFloat(String(userData.peso).replace(',','.'));
    if (!isNaN(weight)) {
      ud.weight = weight;
    }
  }
  // if (userData.peso && trans.isNumeric(userData.peso)) {ud.weight = parseFloat(userData.peso.replace(',','.'))}
  if (userData.altezza && trans.isNumeric(userData.altezza)) {ud.height = parseFloat(userData.altezza.replace(',','.'));}
  if (userData.massa_grassa && trans.isNumeric(userData.massa_grassa)) {ud.bodyFat = parseFloat(userData.massa_grassa.replace(',','.'));}
  if (userData.frequenza_cardiaca && trans.isNumeric(userData.frequenza_cardiaca)) {ud.heartRate = parseFloat(userData.frequenza_cardiaca.replace(',','.'));}

  // TODO: finished here
  if (Object.prototype.toString.call(userData.controllo_cuore) === '[object Object]') {
    const { controllo_cuore } : {controllo_cuore: Object} = userData;
    const { enabled, soglia_cuore, tipo_controllo, perc_ricalcolo } = controllo_cuore;
    switch (typeof enabled) {
      case 'boolean': ud.bpmControl = enabled; break;
      case 'string': ud.bpmControl = enabled.toLowerCase() === 'true'; break;
      case 'number': ud.bpmControl = !!enabled; break;
    }
    if (soglia_cuore !== undefined) {
      ud.bpmThreshold = parseInt(soglia_cuore, 10) || 120;
    }
    let controlMode = !isNaN(Number(tipo_controllo)) ? Number(tipo_controllo) : appConst.heart.CONTROL_DEFAULT_MODE;
    ud.bpmControlMode = (Object.values(appConst.heart.controlModes).includes(controlMode)) ? controlMode : appConst.heart.CONTROL_DEFAULT_MODE;
    ud.bpmControlModeValue = Number(perc_ricalcolo) || appConst.heart.CONTROL_DEFAULT_MODE_VALUE;
  }

  return ud;
};
export const transformApiUserToAppUser = (userData: ApiUser, cookie: string, cookie_name: string, password: string): AppUser => {
  const user: AppUser = {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      nicename: userData.nicename,
      nickname: userData.nickname,
      displayname: userData.displayname,
      cookie: cookie,
      cookie_name: cookie_name,
      url: userData.url,
      description: userData.description,
      avatarUrl: userData.avatar,
      // "registered": "2017-03-08 10:39:14",
      capabilities: userData.capabilities,
      birthDate: '',
      height: 0,
      weight: 0,
      sex: 0,
      registered: 1,
      password,
  };
  return user;
};
/*
export type Workout = {
  id: number,
  name: string,
  type: string,
  trainerId: number,
  baseId: number, // REVIEW id_scheletro
  date: Date, // TODO add speaking name, created_at?
  license: string,   // REVIEW
  heartData: string, // REVIEW
  notes: string,
  steps: Array<WorkoutStep>,
  deleted: boolean
}
*/

/*
export type WorkoutStep = {
  index: number,
  rapporto: string, // REVIEW
  brake: string,
  duration: number,
  watt: number,
  rpm: number,
  bpm: number,
  average: number, // REVIEW
  name: string,
  perceWatt: string, // REVIEW
  perceRpm: string, // REVIEW
  Nm: string, // REVIEW
}
*/

// export const transformApiWorkoutDataToAppWorkoutSteps = (body: ApiWorkoutBodyData, heart: Heart): Array<AppWorkoutStep> => {
//   if (body.length < appConst.step.count) { return [] }
//   let steps = []
//   for (let i=0; i<appConst.step.count; i++) {
//     let step = transformApiWorkoutStepToAppWorkoutStep(body[i], heart)
//     if (step) { steps.push(step) }
//   }
//   return steps
// }

// export const transformHeartStringToHeartDataObject = (s: string): Heart => {
//   let sA = s.split(";")
//   let def = appConst.heart.DEFAULT_HEART_STRING.split(";")
//   return {
//     CUORE_soglia_watt_cuore: Number((sA[1] !== '' && sA[1] !== undefined) ? sA[1] : def[1]),
//     CUORE_soglia_bpm: Number((sA[2] !== '' && sA[2] !== undefined) ? sA[2] : def[2]),
//     CUORE_w_per_bpm_cuore: Number((sA[3] !== '' && sA[3] !== undefined) ? sA[3] : def[3]),
//     CUORE_primo_step_cuore: Number((sA[4] !== '' && sA[4] !== undefined) ? sA[4] : def[4]),
//     CUORE_step_successivi_cuore: Number((sA[5] !== '' && sA[5] !== undefined) ? sA[5] : def[5]),
//     CUORE_k_cuore: Number((sA[6] !== '' && sA[6] !== undefined) ? sA[6] : def[6]),
//   }
// // file.WriteLine(PALL_bpmRIF.ToString() + ";" + PALL_wMAx.ToString() + ";" + PALL_hMAx.ToString() + ";" + PALL_wPerBpm.ToString() + ";" + PALL_secCheck.ToString() + ";" + PALL_secCheck1.ToString() + ";" + PALL_Kbpm.ToString() + ";" + PALL_dimezza.ToString() + ";" + PALL_tempo1.ToString() + ";" + PALL_tempo2.ToString() + ";;;;");
// /*
// // openDati
// if (!int.TryParse(sapp[0], out PALL_bpmRIF)) PALL_bpmRIF = 0;
//                         if (!int.TryParse(sapp[1], out PALL_wMAx)) PALL_wMAx = 0;
//                         if (!int.TryParse(sapp[2], out PALL_hMAx)) PALL_hMAx = 0;
//                         if (!float.TryParse(sapp[3], out PALL_wPerBpm)) PALL_wPerBpm = 0;
//                         if (!float.TryParse(sapp[4], out PALL_secCheck)) PALL_secCheck = 0;
//                         if (!float.TryParse(sapp[5], out PALL_secCheck1)) PALL_secCheck1 = 0;
//                         if (!float.TryParse(sapp[6], out PALL_Kbpm)) PALL_Kbpm = 0;
//
//                         if (sapp[7] == "True") PALL_dimezza = true;
//                         else PALL_dimezza = false;
//
//                         if (!int.TryParse(sapp[8], out PALL_tempo1)) PALL_tempo1 = 0;
//                         if (!int.TryParse(sapp[9], out PALL_tempo2)) PALL_tempo2 = 0;
// */
// /*
// carica_cuore
// if (!int.TryParse(sapp[0], out PALL_bpmRIF)) PALL_bpmRIF = 0;
//             if (!int.TryParse(sapp[1], out PALL_wMAx)) PALL_wMAx = 100;
//             if (!int.TryParse(sapp[2], out PALL_hMAx)) PALL_hMAx = 100;
//
//             if (!float.TryParse(sapp[3], out PALL_wPerBpm)) PALL_wPerBpm = 2;
//             if (!float.TryParse(sapp[4], out PALL_secCheck)) PALL_secCheck = 30;
//             if (!float.TryParse(sapp[5], out PALL_secCheck1)) PALL_secCheck1 = 30;
//             if (!float.TryParse(sapp[6], out PALL_Kbpm)) PALL_Kbpm = 2;
//
//             if (sapp[7] != null && sapp[7] == "True") PALL_dimezza = true;
//             else PALL_dimezza = false;
//
//             if (!int.TryParse(sapp[8], out PALL_tempo1)) PALL_tempo1 = 0;
//             if (!int.TryParse(sapp[9], out PALL_tempo2)) PALL_tempo2 = 0;
// */
// }
export const transformApiActivitiesListDataToAppActivity = (data: ApiActivitiesListData, user: AppUser): Object => {
  return {
    id: Number(data.id),
    name: data.nome,
    // data: string,
    // data_inserimento: string,
    // id_allenamento_originale: string,
    // type: data.tipo,
    deleted: (data.deleted === '1'),
  }
}

export const transformApiWorkoutListDataToAppWorkout = (data: ApiWorkoutListData, user: AppUser): AppWorkout => {
  let workout: AppWorkout = {
    id: Number(data.id),
    name: data.nome,
    type: data.tipo,
    trainerId: Number(data.id_allenatore) || 0,
    baseId: trans.isNumeric(data.id_scheletro) ? Number(data.id_scheletro) : null,
    deleted: (data.deleted === '1'),
    expired: (data.expired === '1'),
    license: data.licenza,
    createdAt: moment(data.data, 'YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(data.data_aggiornamento, 'YYYY-MM-DD HH:mm:ss'),
    executionsLimit: trans.isNumeric(data.max_executions) ? Number(data.max_executions) : -1,
    downloadsLeft: trans.isNumeric(data.remaining_downloads) ? Number(data.remaining_downloads) : -1,
  };
  if (user.uuid) {workout.userUuid = user.uuid;}
  if (user.id) {workout.userId = user.id;}
  return workout;
};
export const transformAppActivityToApiActivity = (user: AppUser, activity: Object): Object => {
  let wattArr = [], speedArr = [], rpmArr = [], bpmArr = [],
  avgWatt = [], avgSpeed = [], avgRpm = [], avgBpm = [],
  typeArr = [], wattProt = [], distanceArr = [], offsetArr = [], deltaRpmArr = [];
  let speedSum = wattSum = rpmSum = bpmSum = 0;
  let sumDivisor = 0;
  for (let i = 0, len = activity.records.length; i < len; i++) {
    const rec = activity.records[i];
    const {speed, watt, rpm, bpm} = rec;
    sumDivisor++;

    wattArr.push(watt);
    wattSum += watt;
    avgWatt.push((wattSum/sumDivisor).toFixed(1));

    speedArr.push(speed.toFixed(1));
    speedSum += speed;
    avgSpeed.push((speedSum/sumDivisor).toFixed(1));

    rpmArr.push(rpm);
    rpmSum += rpm;
    avgRpm.push((rpmSum/sumDivisor).toFixed(1));

    bpmArr.push(bpm);
    bpmSum += bpm;
    avgBpm.push((bpmSum/sumDivisor).toFixed(1));

    typeArr.push(rec.stepType);
    wattProt.push(0);
    distanceArr.push(trans.isNumeric(rec.distance) ? Number(rec.distance).toFixed(3) : null);
    // distanceArr.push(Number(rec.distance || 0).toFixed(3) || 0)
    offsetArr.push(trans.isNumeric(rec.offset) ? Number(rec.offset).toFixed(1) : null);
    // offsetArr.push(Number(rec.offset || 0).toFixed(1) || 0)
    deltaRpmArr.push(trans.isNumeric(rec.deltaRpm) ? parseInt(rec.deltaRpm) : null);
  }
  return {
    nome: activity.name,
    id_utente: (user.id || 0),
    id_allenamento_originale: (activity.workout && activity.workout.id) ? activity.workout.id : 1,
    data: moment.isMoment(activity.createdAt) ? activity.createdAt.format('YYYY-MM-DD HH:mm') : moment(activity.createdAt).format('YYYY-MM-DD HH:mm'),
    primo_punto: 0,
    punto_soglia: '-',
    punto_inizio_recupero_cuore: '-',
    punto_fine_recupero_cuore: '-',
    soglia_recupero: '-',
    tipo_soglia: '-',
    valore_soglia_recupero_percentuale: '-',
    durata_max_recupero: '-',
    note_atleta: (activity.notes ? activity.notes : '-'),
    note_test: '-',
    licenza: (activity.workout && activity.workout.license) ? activity.workout.license : '-',
    peso_utente: (activity.userWeight || 75), // CHECK SERVER SIDE
    potenza: wattArr,
    velocita: speedArr,
    rpm: rpmArr,
    heartrate: bpmArr,
    media_potenza: avgWatt,
    media_velocita: avgSpeed,
    media_rpm: avgRpm,
    media_heartrate: avgBpm,
    tipo_protocollo: typeArr,
    watt_protocollo: wattProt,
    km_fatti: distanceArr,
    offset: offsetArr,
    delta_rpm: deltaRpmArr,
    base_calibration: activity.calibrationOnLoadPercent,
    bpm_calibration: activity.calibrationBpmControlPercent,
    bpm_calibration_tick: activity.calibrationBpmControlTick,
    hidden: activity.hidden,
  };
};
export const transformApiWorkoutToAppWorkout = (user: AppUser, head: ApiWorkoutHeadData, body: ApiWorkoutBodyData): AppWorkout => {
  let tmpWorkout: AppWorkout = transforms.transformCsvArrToWorkout(body, head.dati_cuore);

  // const license = body[200] || 'no_lic'
  // // REVIEW if head heart data is different from body
  // const heartString = head.dati_cuore ? head.dati_cuore : ( body[201] ? body[201] : appConst.heart.DEFAULT_HEART_STRING)
  // const heart: Heart = transformHeartStringToHeartDataObject(heartString)
  // const steps = transformApiWorkoutDataToAppWorkoutSteps(body, heart)
  // return ...
  //   heartString: heartString,
  //   heart,
  //   deleted: (head.deleted === '1'),
  //   license,
  const trainerId = trans.isNumeric(head.id_allenatore) ? parseInt(head.id_allenatore) : 0;
  const baseId = trans.isNumeric(head.id_scheletro) ? parseInt(head.id_scheletro) : null;
  const version = trans.isNumeric(head.ver) ? parseInt(head.ver) : appConst.workoutsStructure;
  const wattReference = trans.isNumeric(head.watt_rif) ? parseInt(head.watt_rif) : 0;
  const rpmReference = trans.isNumeric(head.rpm_rif) ? parseInt(head.rpm_rif) : 0;
  const bpmReference = trans.isNumeric(head.bpm_rif) ? parseInt(head.bpm_rif) : 0;
  const newtonReference = trans.isNumeric(head.nm_rif) ? parseFloat(head.nm_rif) : 0;
  const framework = trans.isNumeric(head.training_framework) ? parseInt(head.training_framework) : 0;
  const executionsLimit = trans.isNumeric(head.max_executions) ? parseInt(head.max_executions) : -1;
  const downloadsLeft = trans.isNumeric(head.remaining_downloads) ? parseInt(head.remaining_downloads) : -1;
  const executionsCount = head.download_limit_reached ? Math.max(executionsLimit, 0) : 0;
  return {
    ...tmpWorkout,
    id: Number(head.id),
    userId: user.id,
    userUuid: user.uuid,
    name: head.nome,
    type: head.tipo,
    trainerId,
    baseId,
    createdAt: moment(head.data, 'YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(head.data_aggiornamento, 'YYYY-MM-DD HH:mm:ss'),
    notes: head.note,
    deleted: (head.deleted === '1'),
    expired: (head.expired === '1'),
    version,
    wattReference,
    rpmReference,
    bpmReference,
    newtonReference,
    framework,
    // bpmThreshold: head.bpm_threshold,
    tipoWorkout: head.tipo_workout ? head.tipo_workout : null,
    executionsCount,
  };
};

// const getAvgByString = (str: string): { mode: number, points: number } => {
//   switch (str.toLowerCase()) {
//     case 'no': return { mode: avgConst.modes.NO, points: avgConst.modes.NO };
//     case 'min': return { mode: avgConst.modes.MIN, points: avgConst.modes.MIN };
//     case 'med': return { mode: avgConst.modes.MED, points: avgConst.modes.MED };
//     case 'max': return { mode: avgConst.modes.MAX, points: avgConst.modes.MAX };
//     default: return { mode: avgConst.modes.MED, points: avgConst.modes.MED };
//   }
// }
//
// const transformToStepBase = (stepArray: Array<string>): WorkoutBaseStep => {
//
//   const tmpOffset = stepArray[appConst.step.csvIndex.OFFSET_SETTINGS] ?
//     stepArray[appConst.step.csvIndex.OFFSET_SETTINGS] :
//       (stepArray[appConst.step.csvIndex.OFFSET_SETTINGS_OLD] ? stepArray[appConst.step.csvIndex.OFFSET_SETTINGS_OLD] : "False:0")
//   const tmpArr = tmpOffset.split(':')
//   const offsetTableUse = (tmpArr[0] && tmpArr[0].toLowerCase() === 'true') ? true : false
//   const offsetTableType = (offsetTableUse === false ? 0 :
//     (tmpArr[1] && tmpArr[1].length && trans.isNumeric(tmpArr[1])) ? Number(tmpArr[1]) : 0)
//   const avgData = getAvgByString(stepArray[appConst.step.csvIndex.AVERAGE])
//   return {
//     index: Number(stepArray[appConst.step.csvIndex.INDEX]),
//     rapporto: stepArray[appConst.step.csvIndex.RAPPORTO],
//     description: stepArray[appConst.step.csvIndex.DESCRIPTION],
//     duration: Number(stepArray[appConst.step.csvIndex.DURATION]),
//     offsetTableUse,
//     offsetTableType,
//     csvString: stepArray.join(";"),
//     avgMode: avgData.mode,
//     avgPoints: avgData.points,
//   }
//   /*
//   export const step.csvIndex = {
//     INDEX: 0,
//     RAPPORTO: 1,
//     STEP_TYPE: 2,
//     BRAKE_POSITION: 2, // if we have constant brake position it will be number as step_type with value less than 31
//     DURATION: 3,
//     WATT: 4,
//     RPM: 5, // number or text
//     AVERAGE: 7,
//     DESCRIPTION: 8,
//     // REVIEW 9, 10
//     NEWTON: 11,
//
//     OFFSET_SETTINGS: 33,
//     OFFSET_SETTINGS_OLD: 29,
//   }
//   */
// }
// const transformToStepAutoWatt = (stepArray: Array<string>): ?WorkoutStepAutoWatt => {
//   const watt = parseInt(stepArray[appConst.step.csvIndex.WATT], 10) || 0
//   if (watt === 0) { return null }
//   return {
//     ...transformToStepBase(stepArray),
//     type: appConst.step.types.AUTO_WATT,
//     activityType: appConst.step.activityTypes.AUTO_WATT,
//     watt,
//   }
// }
// const transformToStepProgressionWatt = (stepArray: Array<string>): ?WorkoutStepProgWatt => {
//   if (stepArray.length < 21) { return null }
//   return {
//     ...transformToStepBase(stepArray),
//     type: appConst.step.types.PROGRESSION_WATT,
//     activityType: appConst.step.activityTypes.PROGRESSION_WATT,
//     progressionStartWatt: trans.isNumeric(stepArray[15]) ? Number(stepArray[15]) : 0,
//     progressionEndWatt: trans.isNumeric(stepArray[16]) ? Number(stepArray[16]) : 0,
//     progressionStepWatt: trans.isNumeric(stepArray[19]) ? Number(stepArray[19]) : 0,
//     progressionStepTime: trans.isNumeric(stepArray[20]) ? Number(stepArray[20]) : 0
//   }
// }
// const transformToStepProgressionRPM = (stepArray: Array<string>): ?WorkoutStepProgRPM => {
//   if (stepArray.length < 27) { return null }
//   return {
//     ...transformToStepBase(stepArray),
//     type: appConst.step.types.PROGRESSION_RPM,
//     activityType: appConst.step.activityTypes.PROGRESSION_RPM,
//     progressionStartRPM: trans.isNumeric(stepArray[15]) ? Number(stepArray[15]) : 0,
//     progressionEndRPM: trans.isNumeric(stepArray[16]) ? Number(stepArray[16]) : 0,
//     progressionStepRPM: trans.isNumeric(stepArray[21]) ? Number(stepArray[21]) : 0,
//     progressionStepTime: trans.isNumeric(stepArray[26]) ? Number(stepArray[26]) : 0
//   }
// }
// const transformToStepAutoNM = (stepArray: Array<string>): ?WorkoutStepAutoNM => {
//   if (stepArray.length < 11) { return null }
//   return {
//     ...transformToStepBase(stepArray),
//     type: appConst.step.types.AUTO_NEWTON,
//     activityType: appConst.step.activityTypes.AUTO_NEWTON,
//     newton: trans.isNumeric(stepArray[11]) ? Number(stepArray[11]) : 0
//   }
// }
// // const transformToStepTestPI = (stepArray: Array<string>): ?WorkoutStepAutoNM => {
// //   if (stepArray.length < 11) { return null }
// //   return {
// //     ...transformToStepBase(stepArray),
// //     type: appConst.step.types.TEST_PI,
// //     activityType: appConst.stepActivityTypes.TEST_PI,
// //     newton: trans.isNumeric(stepArray[11]) ? Number(stepArray[11]) : 0
// //   }
// // }
//
// const transformToStepBrake = (stepArray: Array<string>): WorkoutStepBrakePosition => {
//   // if (stepArray.length < 11) { return null }
//   return {
//     ...transformToStepBase(stepArray),
//     type: appConst.step.types.BRAKE_POSITION,
//     activityType: appConst.step.activityTypes.BRAKE_POSITION,
//     brakePosition: parseInt(stepArray[appConst.step.csvIndex.BRAKE_POSITION], 10),
//   }
// }
// const transformToUnknownStep = (stepString: string): WorkoutStepUnknown => {
//   return {
//     type: appConst.step.types.UNKNOWN,
//     csvString: stepString,
//   }
// }
//
// const transformApiWorkoutStepToAppWorkoutStep = (apiStep: string, heart: Heart): ?AppWorkoutStep => {
//   const stepArray = apiStep.split(';')
//   if (stepArray.length < 3) { return null }
//   if (parseInt(stepArray[appConst.step.csvIndex.BRAKE_POSITION], 10)) {
//     return transformToStepBrake(stepArray)
//   }
//   switch (stepArray[2]) {
//     case appConst.step.types.AUTO_WATT:
//       return transformToStepAutoWatt(stepArray)
//     case appConst.step.types.PROGRESSION_WATT:
//       return transformToStepProgressionWatt(stepArray)
//     case appConst.step.types.PROGRESSION_RPM:
//       return transformToStepProgressionRPM(stepArray)
//     case appConst.step.types.AUTO_NEWTON:
//       return transformToStepAutoNM(stepArray)
//     case appConst.step.types.ZONE:
//     case appConst.step.types.ZONE_HEAD:
//       // return transformToStepZone(stepArray)
//     // case appConst.step.types.TEST_PI:
//     //   return transformToStepTestPI(stepArray)
//     default:
//       return transformToUnknownStep(apiStep)
//   }
//   // const step: AppWorkoutStep = {
//   //   index: Number(stepArray[0]),
//   //   rapporto: stepArray[1], // REVIEW
//   //   brake: stepArray[2],
//   //   duration: Number(stepArray[3]),
//   //   watt: Number(stepArray[4]),
//   //   rpm: stepArray[5],
//   //   bpm: Number(stepArray[6]),
//   //   average: number, // REVIEW
//   //   name: string,
//   //   perceWatt: string, // REVIEW
//   //   perceRpm: string, // REVIEW
//   //   Nm: string, // REVIEW
//   // }
//   // return {
//   //   index: 1, name: "test", duration: 300, type: 'PROG. W',
//   //   progressionStartWatt: 1, progressionEndWatt: 200, progressionStepTime: 6, progressionStepWatt: 1
//   // }
//   // return step
// }


type transformObjectType = {
  ApiUserToAppUser: (userData: ApiUser, cookie: string, cookie_name: string, password: string) => AppUser,
  ApiUserDataToAppUserData: (userData: ApiUserData) => AppUserData,
  ApiWorkoutToAppWorkout: (user: AppUser, head: ApiWorkoutHeadData, body: ApiWorkoutBodyData) => AppWorkout,
  ApiListDataToAppWorkout: (data: ApiWorkoutListData, user: AppUser) => AppWorkout,
  ApiActivitiesListDataToAppActivity: (data: ApiActivitiesListData, user: AppUser) => Object,
  AppActivityToApiActivity: (user: AppUser, activity: Object) => Object,
}
const transformObject: transformObjectType = {
  ApiUserToAppUser: transformApiUserToAppUser,
  ApiUserDataToAppUserData: transformApiUserDataToAppUserData,
  ApiWorkoutToAppWorkout: transformApiWorkoutToAppWorkout,
  ApiListDataToAppWorkout: transformApiWorkoutListDataToAppWorkout,
  AppActivityToApiActivity: transformAppActivityToApiActivity,
  ApiActivitiesListDataToAppActivity: transformApiActivitiesListDataToAppActivity,
};
export default transformObject;
