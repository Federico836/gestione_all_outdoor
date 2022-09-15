// @flow
import RNFetchBlob from 'rn-fetch-blob';
import type { Workout } from '../types/AppTypeDefinition';
import { Platform } from 'react-native';

const baseDir: string = RNFetchBlob.fs.dirs.DocumentDir;
const getUserDir = (userDir: string) => `${baseDir}/${userDir}`;
const getWorkoutsDir = (userDir: string) => (getUserDir(userDir) + '/workouts');
const getWorkoutPath = (userDir: string, wkFile: string) => (getWorkoutsDir(userDir) + `/${wkFile}`);
const getActivitiesDir = (userDir: string) => getUserDir(userDir) + '/activities';
const getActivityPath = (userDir: string, acFile: string) => getActivitiesDir(userDir) + `/${acFile}`;

// {
//   if (Platform.OS === 'android') {
//     console.log(RNFetchBlob.fs.dirs)
//     const path = RNFetchBlob.fs.dirs.CacheDir + '/sync_' + `${acFile}`;
//     return path;
//   }
//   return (getActivitiesDir(userDir) + `/${acFile}`)
// }
// (getActivitiesDir(userDir) + `/${acFile}`)
// const writeBinaryFile = (workout) =>
//   new Promise((resolve, reject) => {
//     console.log(RNFetchBlob.fs.dirs.DocumentDir);
//     const path = RNFetchBlob.fs.dirs.DocumentDir + '/' + workout.name;
//     const buf = Buffer.from(workout.notes === null? '':workout.notes, 'utf8');
//     const arr = Array.from(buf)
//     RNFetchBlob.fs.writeFile(path, arr, 'ascii').then(r => resolve(r));
//     // resolve(RNFetchBlob.fs.dirs.DocumentDir + buf.name)
//     // connProm.then(conn => func(conn, resolve, reject, ...args))
//   })

const userDirExists = (userDir: string) => RNFetchBlob.fs.isDir(getUserDir(userDir));
const prepareUserDir = (userDir: string) => RNFetchBlob.fs.mkdir(getUserDir(userDir))
  .then(() => RNFetchBlob.fs.mkdir(getWorkoutsDir(userDir)))
  .then(() => RNFetchBlob.fs.mkdir(getActivitiesDir(userDir)));

// const saveWorkout = (userDir: string, workout: Workout) =>
//   new Promise((resolve, reject) => {
//     const filePath = (getWorkoutsDir(userDir) + `/${workout.name}`)
//     let workoutContent: Array<string> = [ workout.name, "Watt Rif.;", "Rpm Rif.;", " ",
//      "Nr.;Rapporto;Freno;Tempo (sec);Watt;Rpm;Bpm;MediaValori;Descrizione;perceWatt;perceRpm;Nm;"]
//     for (let i = 0; i<200; i++) {
//       workoutContent.push(workout.steps[i]?workout.steps[i].csvString:`${(i+1)};;AUTO;0;;;;Med;;;;;;;;;;;;;;;;;;;;;;;;;;False:0;`)
//     }
//     RNFetchBlob.fs.writeFile(filePath, workoutContent.join("\r\n"), 'utf8').then(r => resolve(r));
//   })
const saveWorkoutCsv = (userDir: string, wkName: string, content: string) =>
  new Promise((resolve, reject) => {
    // const filePath = (getWorkoutsDir(userDir) + `/${wkName}`)
    const filePath = getWorkoutPath(userDir, wkName);
    RNFetchBlob.fs.writeFile(filePath, content, 'utf8').then(r => resolve(r));
  });

const loadWorkoutCsv = (userDir: string, wkName: string) =>
  new Promise((resolve, reject) => {
    // const filePath = (getWorkoutsDir(userDir) + `/${wkName}`)
    const filePath = getWorkoutPath(userDir, wkName);
    RNFetchBlob.fs.readFile(filePath, 'utf8').then(r => resolve(r));
  });

const deleteWorkoutCsv = (userDir: string, wkName: string) =>
  new Promise((resolve, reject) => {
    const filePath = getWorkoutPath(userDir, wkName);
    RNFetchBlob.fs.unlink(filePath).then(r => resolve(r));
  });

const saveActivityJSON = (userDir: string, actName: string, content: string) =>
  new Promise((resolve, reject) => {
    const filePath = getActivityPath(userDir, actName);
    RNFetchBlob.fs.writeFile(filePath, content, 'utf8').then(r => resolve(r));
  });

const loadActivityJSON = (userDir: string, actName: string) =>
  new Promise((resolve, reject) => {
    const filePath = getActivityPath(userDir, actName);
    RNFetchBlob.fs.readFile(filePath, 'utf8').then(r => resolve(r)).catch(e => reject(e));
  });

const deleteActivityJSON = (userDir: string, actName: string) =>
  new Promise((resolve, reject) => {
  const filePath = getActivityPath(userDir, actName);
  RNFetchBlob.fs.unlink(filePath).then(r => resolve(r));
});
// const writeBinaryFile = (name, buf) =>
//   new Promise((resolve, reject) => {
//     const path = RNFetchBlob.fs.dirs.DocumentDir + '/' + name;
//     // const buf = Buffer.from(workout.notes === null? '':workout.notes, 'utf8');
//     const arr = Array.from(buf)
//     RNFetchBlob.fs.writeFile(path, arr, 'ascii').then(r => resolve(r));
//     // resolve(RNFetchBlob.fs.dirs.DocumentDir + buf.name)
//     // connProm.then(conn => func(conn, resolve, reject, ...args))
//   })

export default {
  users: {
    dirExists: userDirExists,
    prepareDir: prepareUserDir,
  },
  workouts: {
    saveCsv: saveWorkoutCsv,
    loadCsv: loadWorkoutCsv,
    deleteCsv: deleteWorkoutCsv,
    // save: (userDir: string, workout: Workout) => saveWorkout,
    // read: readWorkout,
    // delete: deleteWorkout
  },
  activities: {
    saveJSON: saveActivityJSON,
    loadJSON: loadActivityJSON,
    deleteJSON: deleteActivityJSON,
  },

  // writeBinaryFile,
  // getWorkout,
};
