// @flow
import moment from 'moment'
import trans from '../utils/trans'
import type { Workout as AppWorkout} from '../types/AppTypeDefinition'
import type { Workout as StorageWorkout} from '../types/StorageTypesDefinition'
import appConst from '../const'
import transforms from './Transforms'

export const transformStorageWorkoutToAppWorkout = (wk: StorageWorkout): AppWorkout => {
  return {
    ...wk,
    createdAt: moment(wk.createdAt, "YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment(wk.updatedAt, "YYYY-MM-DD HH:mm:ss"),
    expired: (wk.expired == 1),
  }
}
export const transformStorageActivityToAppActivity = (act: Object): Object => {
  return {
    ...act,
    createdAt: moment(act.createdAt, "YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment(act.updatedAt, "YYYY-MM-DD HH:mm:ss"),
  }
}

export const transformAppWorkoutToCsv = (wk: AppWorkout): string => {
  let CsvContent: Array<string> = [
    wk.name, 'Watt Rif.;', 'Rpm Rif.;', ' ',
    'Nr.;Rapporto;Freno;Tempo (sec);Watt;Rpm;Bpm;MediaValori;Descrizione;perceWatt;perceRpm;NewtonMetro;'
    + 'perceN;Lavoro;tipoProg;p2;p3;p4;p5;p6;p7;p8;p9;p10;p11;p12;p13;p14;p15;p16;p17;p18;p19;p20'
  ];
  for (let i=0; i<appConst.workoutsStepCount; i++) {
    if (wk.steps && wk.steps[i] && wk.steps[i].csvString) {
      CsvContent.push(wk.steps[i].csvString)
    } else {
      CsvContent.push((i+1) + `;;AUTO;0;0;0;0;No;;;;;;;;;;;;;;;;;;;;;;;;`)
    }
  }
  if (wk.license) { CsvContent.push(wk.license) }
  if (wk.heartString) { CsvContent.push(wk.heartString) }
  if (wk.testIndexString) { CsvContent.push(wk.testIndexString) }
  if (wk.testPiOldString) { CsvContent.push(wk.testPiOldString) }
  if (wk.testPsHeaderString) { CsvContent.push(wk.testPsHeaderString) }
  if (wk.testPsString) { CsvContent.push(wk.testPsString) }
  return CsvContent.join('\r\n')
}

export const transformCsvToAppWorkout = (wk: AppWorkout, csv: string): AppWorkout => {
  let headCsvArr = csv.split("\r\n")
  let bodyCsvArr = headCsvArr.splice(5)
  return {...wk,
    name: headCsvArr[0],
    ...transforms.transformCsvArrToWorkout(bodyCsvArr)
    }
}

type transformObjectType = {
  storageWorkoutToAppWorkout: (workout: StorageWorkout) => AppWorkout,
  storageActivityToAppActivity: (act: Object) => Object,
  appWorkoutToCsv: (workout: AppWorkout) => string,
  csvToAppWorkout: (workout: AppWorkout, csv: string) => AppWorkout,
}
const transformObject: transformObjectType = {
  storageWorkoutToAppWorkout: transformStorageWorkoutToAppWorkout,
  storageActivityToAppActivity: transformStorageActivityToAppActivity,
  appWorkoutToCsv: transformAppWorkoutToCsv,
  csvToAppWorkout: transformCsvToAppWorkout,
}
export default transformObject
