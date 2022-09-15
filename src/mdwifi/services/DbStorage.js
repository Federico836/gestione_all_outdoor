/**
 * @format
 * @flow
 */
import * as SQLiteHelper from '../storages/sqlite';
import {logger, trans} from '../utils';
import type {User, Workout} from '../types/AppTypeDefinition';

const connProm = new Promise((resolve, reject) => {
  SQLiteHelper.SQLiteConnection().then(c => resolve(c));
});

const wrapper = (func: Function, ...args: any) =>
  new Promise((resolve, reject) => {
    connProm.then(conn => func(conn, resolve, reject, ...args));
  });

function loadVersion(conn, resolve, reject) {
  return conn
    .executeSql('SELECT version_id FROM db_version LIMIT 1')
    .then(([result]) => {
      const version = result.rows.item(0).version_id;
      resolve(version);
    });
}

function loadWorkoutById(conn, resolve, reject, wkId: number) {
  return conn
    .executeSql('SELECT * FROM workouts WHERE id = ? LIMIT 1', [wkId])
    .then(([result]) => {
      resolve(result.rows.length === 0 ? null : result.rows.item(0));
    });
}
function loadWorkoutByUUID(conn, resolve, reject, wkUUID: string) {
  return conn
    .executeSql('SELECT * FROM workouts WHERE uuid = ? LIMIT 1', [wkUUID])
    .then(([result]) => {
      resolve(result.rows.length === 0 ? null : result.rows.item(0));
    });
}

function loadWorkouts(conn, resolve, reject, userUUID: string) {
  return conn
    .executeSql(
      ' SELECT * FROM workouts WHERE userUuid = ? order by datetime("updatedAt") DESC, id DESC ',
      [userUUID],
    )
    .then(([result]) => {
      let workouts = [];
      const len = result.rows.length;
      for (let i = 0; i < len; i++) {
        workouts.push(result.rows.item(i));
      }
      resolve(workouts);
    });
}

function insertWorkoutWrapped(conn, resolve, reject, wk: Workout) {
  return conn
    .executeSql(
      [
        ' INSERT INTO workouts ',
        ' (id, uuid, userId, userUuid, name, type, trainerId, baseId, license, createdAt, updatedAt, ',
        ' version, wattReference, rpmReference, bpmReference, newtonReference, framework, expired, ',
        ' bpmThreshold, tipoWorkout, executionsLimit, downloadsLeft, executionsCount) ',
        ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ',
      ].join(''),
      [
        wk.id,
        wk.uuid,
        wk.userId,
        wk.userUuid,
        wk.name,
        wk.type,
        wk.trainerId,
        wk.baseId,
        wk.license,
        wk.createdAt.format('YYYY-MM-DD HH:mm:ss'),
        wk.updatedAt.format('YYYY-MM-DD HH:mm:ss'),
        wk.version,
        wk.wattReference,
        wk.rpmReference,
        wk.bpmReference,
        wk.newtonReference,
        wk.framework,
        wk.expired,
        wk.bpmThreshold,
        wk.tipoWorkout,
        wk.executionsLimit,
        wk.downloadsLeft,
        wk.executionsCount,
      ],
    )
    .then(r => resolve(r));
}
function updateWorkoutWrapped(conn, resolve, reject, wk: Workout) {
  const fields = [
    'id',
    'uuid',
    'userId',
    'userUuid',
    'name',
    'type',
    'trainerId',
    'baseId',
    'license',
    'version',
    'wattReference',
    'rpmReference',
    'bpmReference',
    'newtonReference',
    'framework',
    'expired',
    'bpmThreshold',
    'tipoWorkout',
    'executionsLimit',
    'downloadsLeft',
    'executionsCount',
  ];
  let fieldNames = [];
  let fieldValues = [];
  for (const field of fields) {
    if (wk[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(wk[field]);
  }
  const dateFields = ['createdAt', 'updatedAt'];
  for (const field of dateFields) {
    if (wk[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(wk[field].format('YYYY-MM-DD HH:mm:ss'));
  }
  if (fieldNames.length === 0) {
    return reject(false);
  }
  fieldValues.push(wk.uuid);
  return conn
    .executeSql(
      [
        ' UPDATE workouts SET ',
        fieldNames.join(' = ? , ') + ' = ? ',
        ' WHERE uuid = ? ',
      ].join(''),
      fieldValues,
    )
    .then(r => resolve(r));
}

function loadUserById(conn, resolve, reject, userId: number) {
  return conn
    .executeSql('SELECT * FROM users WHERE id = ? LIMIT 1', [userId])
    .then(([result]) => returnUserFromResult(result, resolve));
}
function loadUserByUUID(conn, resolve, reject, userUUID: string) {
  return conn
    .executeSql('SELECT * FROM users WHERE uuid = ? LIMIT 1', [userUUID])
    .then(([result]) => returnUserFromResult(result, resolve));
}
function loadUserByEmail(conn, resolve, reject, email: string) {
  return conn
    .executeSql('SELECT * FROM users WHERE email = ? LIMIT 1', [email])
    .then(([result]) => returnUserFromResult(result, resolve));
}
function returnUserFromResult(result, resolve) {
  let user = null;
  if (result.rows.length !== 0) {
    const dbUser = result.rows.item(0);
    const {
      weight: w,
      riderWeight,
      bicycleWeight,
      chainrings: cr,
      cassette: cs,
      graph: gr,
      bpmControl: bC,
      bpmNotification: bN,
      metronomeEnabled: mtEnab,
      metronomeDoubleRate: mtDRt,
    } = dbUser;
    const weight = trans.weightStrToWeight(w, 75);
    const tmpCr = String(cr)
      .split(',')
      .map(el => parseInt(el, 10))
      .filter(el => el);
    // REVIEW move to one variable and use it also while create sqlite column
    const chainrings = tmpCr && tmpCr.length ? tmpCr : [53, 39, 30];
    const tmpCs = String(cs)
      .split(',')
      .map(el => parseInt(el, 10))
      .filter(el => el);
    // REVIEW move to one variable and use it also while create sqlite column
    const cassette =
      tmpCs && tmpCs.length
        ? tmpCs
        : [11, 12, 13, 14, 15, 17, 19, 21, 23, 25, 28];
    const graph = gr == 1;
    const bpmControl = bC == 1;
    const bpmNotification = bN == 1;
    const metronomeEnabled = mtEnab == 1;
    const metronomeDoubleRate = mtDRt == 1;
    user = {
      ...{},
      ...dbUser,
      weight,
      riderWeight,
      bicycleWeight,
      chainrings,
      cassette,
      graph,
      bpmControl,
      bpmNotification,
      metronomeEnabled,
      metronomeDoubleRate,
    };
  }
  resolve(user);
}
function loadLastLogin(conn, resolve, reject) {
  return conn
    .executeSql('SELECT * FROM last_login WHERE id = 1 LIMIT 1')
    .then(([result]) => {
      resolve(result.rows.length === 0 ? null : result.rows.item(0));
    });
}
function updateLastLogin(
  conn,
  resolve,
  reject,
  email: string,
  password: string,
) {
  return conn
    .executeSql(' UPDATE last_login SET email = ?, password = ? WHERE id = ?', [
      email,
      password,
      1,
    ])
    .then(r => resolve(r));
}

function insertUserWrapped(conn, resolve, reject, user: User) {
  // REVIEW thresholdWatt, thresholdRpm, bpmThreshold, bpmNotification values
  // REVIEW crankLength
  // REVIEW metronomeEnabled, metronomeDoubleRate
  return conn
    .executeSql(
      [
        ' INSERT INTO users ',
        ' (id, uuid, email, password, username, firstname, lastname, ',
        '   nicename, nickname, displayname, birthDate, ',
        '   weight, height, sex, dirName, registered, loggedIn, lastLogin) ',
        ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ',
      ].join(''),
      [
        user.id,
        user.uuid,
        user.email,
        user.password,
        user.username,
        user.firstname,
        user.lastname,
        user.nicename,
        user.nickname,
        user.displayname,
        user.birthDate,
        user.weight,
        user.height,
        user.sex,
        user.dirName,
        user.registered,
        user.loggedIn,
        user.lastLogin,
      ],
    )
    .then(r => resolve(r));
}

function updateUserWrapped(conn, resolve, reject, user: User, byId: boolean) {
  const fields = [
    'id',
    'uuid',
    'email',
    'password',
    'username',
    'firstname',
    'lastname',
    'nicename',
    'nickname',
    'displayname',
    'birthDate',
    'weight',
    'height',
    'sex',
    'dirName',
    'registered',
    'loggedIn',
    'lastLogin',
    'thresholdWatt',
    'thresholdRpm',
    'riderWeight',
    'bicycleWeight',
    'wheelCircumference',
    'frontSprocket',
    'rearSprocket',
    'graph',
    'realFrontSprocket',
    'realRearSprocket',
    // BPM
    'bpmControl',
    'bpmThreshold',
    'bpmControlMode',
    'bpmControlModeValue',
    'bpmNotification',
    'crankLength',
    'metronomeEnabled',
    'metronomeDoubleRate',
  ];
  let fieldNames = [];
  let fieldValues = [];
  for (const field of fields) {
    if (user[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(user[field]);
  }
  const csvFields = ['chainrings', 'cassette'];
  for (const field of csvFields) {
    if (user[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(user[field].join(','));
  }
  if (fieldNames.length === 0) {
    return reject(false);
  }
  fieldValues.push(byId ? user.id : user.uuid);
  return conn
    .executeSql(
      [
        ' UPDATE users SET ',
        fieldNames.join(' = ? , ') + ' = ? ',
        ' WHERE ' + (byId ? ' id ' : ' uuid') + ' = ? ',
      ].join(''),
      fieldValues,
    )
    .then(r => resolve(r));
}

function forceDeleteWorkoutByIdWrapped(conn, resolve, reject, wkId: number) {
  return conn
    .executeSql(' DELETE FROM workouts WHERE id = ? ', [wkId])
    .then(r => resolve(r));
}

function forceDeleteWorkoutByUuidWrapped(
  conn,
  resolve,
  reject,
  wkUuid: string,
) {
  return conn
    .executeSql(' DELETE FROM workouts WHERE uuid = ? ', [wkUuid])
    .then(r => resolve(r));
}

function loadActivities(conn, resolve, reject, userUUID: string) {
  return conn
    .executeSql(
      ' SELECT * FROM activities WHERE userUuid = ? order by datetime("updatedAt") DESC, id DESC ',
      [userUUID],
    )
    .then(([result]) => {
      let activities = [];
      const len = result.rows.length;
      for (let i = 0; i < len; i++) {
        activities.push(result.rows.item(i));
      }
      resolve(activities);
    });
}
function loadActivityById(conn, resolve, reject, actId: number) {
  return conn
    .executeSql('SELECT * FROM activities WHERE id = ? LIMIT 1', [actId])
    .then(([result]) => {
      resolve(result.rows.length === 0 ? null : result.rows.item(0));
    });
}
function loadActivityByUUID(conn, resolve, reject, actUUID: string) {
  return conn
    .executeSql('SELECT * FROM activities WHERE uuid = ? LIMIT 1', [actUUID])
    .then(([result]) => {
      resolve(result.rows.length === 0 ? null : result.rows.item(0));
    });
}
function insertActivityWrapped(conn, resolve, reject, act: Object) {
  const fields = [
    'id',
    'uuid',
    'userId',
    'userUuid',
    'name',
    'workoutId',
    'workoutUuid',
    'hidden',
  ];
  let fieldNames = [];
  let fieldValues = [];
  for (const field of fields) {
    if (act[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(act[field]);
  }
  const dateFields = ['createdAt', 'updatedAt'];
  for (const field of dateFields) {
    if (act[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(act[field].format('YYYY-MM-DD HH:mm:ss'));
  }
  if (fieldNames.length === 0) {
    return reject(false);
  }
  const query = [
    ' INSERT INTO activities (',
    fieldNames.join(', '),
    ') VALUES (' +
      Array(fieldNames.length)
        .fill('?')
        .join(', ') +
      ' ); ',
  ].join('');
  return conn.executeSql(query, fieldValues).then(r => resolve(r));
}
function updateActivityWrapped(conn, resolve, reject, act: Object) {
  const fields = [
    'id',
    'uuid',
    'userId',
    'userUuid',
    'name',
    'workoutId',
    'workoutUuid',
    'type',
    'hidden',
  ];
  let fieldNames = [];
  let fieldValues = [];
  for (const field of fields) {
    if (act[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(act[field]);
  }
  const dateFields = ['createdAt', 'updatedAt'];
  for (const field of dateFields) {
    if (act[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(act[field].format('YYYY-MM-DD HH:mm:ss'));
  }
  if (fieldNames.length === 0) {
    return reject(false);
  }
  fieldValues.push(act.uuid);
  return conn
    .executeSql(
      [
        ' UPDATE activities SET ',
        fieldNames.join(' = ? , ') + ' = ? ',
        ' WHERE uuid = ? ',
      ].join(''),
      fieldValues,
    )
    .then(r => resolve(r));
}

function forceDeleteActivityByIdWrapped(conn, resolve, reject, actId: number) {
  return conn
    .executeSql(' DELETE FROM activities WHERE id = ? ', [actId])
    .then(r => resolve(r));
}

function loadDeviceDataByName(conn, resolve, reject, name: string) {
  return conn
    .executeSql('SELECT * FROM devices WHERE name = ? LIMIT 1', [name])
    .then(([result]) => {
      resolve(result.rows.length === 0 ? null : result.rows.item(0));
    });
}
function insertDeviceWrapped(conn, resolve, reject, device: Object) {
  const fields = [
    'name',
    'userId',
    'firmware',
    'wFirmware',
    'wBootloader',
    'wTcpIp',
    'wHw',
    'timestamp',
    'uploaded',
  ];
  let fieldNames = [];
  let fieldValues = [];
  for (const field of fields) {
    if (device[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(device[field]);
  }
  if (fieldNames.length === 0) {
    return reject(false);
  }
  const query = [
    ' INSERT INTO devices (',
    fieldNames.join(', '),
    ') VALUES (' +
      Array(fieldNames.length)
        .fill('?')
        .join(', ') +
      ' ); ',
  ].join('');
  return conn.executeSql(query, fieldValues).then(r => resolve(r));
}
function updateDeviceWrapped(
  conn,
  resolve,
  reject,
  device: Object,
  options: Object = {},
) {
  const useTimestampInWhere = options.useTimestampInWhere || false;
  const fields = [
    'userId',
    'firmware',
    'wFirmware',
    'wBootloader',
    'wTcpIp',
    'wHw',
    'timestamp',
    'uploaded',
  ];
  let fieldNames = [];
  let fieldValues = [];
  for (const field of fields) {
    if (device[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(device[field]);
  }
  if (fieldNames.length === 0) {
    return reject(false);
  }
  fieldValues.push(device.name);
  if (useTimestampInWhere) {
    fieldValues.push(device.timestamp);
  }
  return conn
    .executeSql(
      [
        ' UPDATE devices SET ',
        fieldNames.join(' = ? , ') + ' = ? ',
        ' WHERE name = ? ' + (useTimestampInWhere ? ' AND timestamp = ? ' : ''),
      ].join(''),
      fieldValues,
    )
    .then(r => resolve(r));
}
function flagDevicesAsUploaded(
  conn,
  resolve,
  reject,
  deviceNames: Array<string>,
) {
  return conn
    .executeSql(
      ' UPDATE devices SET uploaded = 1 WHERE name IN = (?) ',
      deviceNames.join(', '),
    )
    .then(r => resolve(r));
}
function getDevicesDataToUpload(conn, resolve, reject) {
  return conn
    .executeSql(' SELECT * FROM devices WHERE uploaded = ? ', [0])
    .then(([result]) => {
      let devices = [];
      const len = result.rows.length;
      for (let i = 0; i < len; i++) {
        devices.push(result.rows.item(i));
      }
      resolve(devices);
    });
}

function loadBlacklist(conn, resolve, reject) {
  return conn
    .executeSql(' SELECT name FROM blacklist order by name ASC')
    .then(([result]) => {
      let blacklist = [];
      const len = result.rows.length;
      for (let i = 0; i < len; i++) {
        blacklist.push(result.rows.item(i).name);
      }
      resolve(blacklist);
    });
}

function insertToBlacklist(conn, resolve, reject, name: string) {
  return conn
    .executeSql(' INSERT INTO blacklist (name) VALUES (?) ; ', [name])
    .then(r => resolve(r));
}

function clearBlacklist(conn, resolve, reject) {
  return conn.executeSql(' DELETE FROM blacklist ').then(r => resolve(r));
}
function loadWhitelist(conn, resolve, reject) {
  return conn
    .executeSql(' SELECT name FROM whitelist order by name ASC')
    .then(([result]) => {
      let whitelist = [];
      const len = result.rows.length;
      for (let i = 0; i < len; i++) {
        whitelist.push(result.rows.item(i).name);
      }
      resolve(whitelist);
    });
}

function insertToWhitelist(conn, resolve, reject, name: string) {
  return conn
    .executeSql(' INSERT INTO whitelist (name) VALUES (?) ; ', [name])
    .then(r => resolve(r));
}

function clearWhitelist(conn, resolve, reject) {
  return conn.executeSql(' DELETE FROM whitelist ').then(r => resolve(r));
}

function insertDeviceLogWrapper(conn, resolve, reject, event: Object) {
  const fields = ['name', 'event', 'userId', 'app', 'timestamp', 'uploaded'];
  let fieldNames = [];
  let fieldValues = [];
  for (const field of fields) {
    if (event[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(event[field]);
  }
  if (fieldNames.length === 0) {
    return reject(false);
  }
  const query = [
    ' INSERT INTO deviceLog (',
    fieldNames.join(', '),
    ') VALUES (' +
      Array(fieldNames.length)
        .fill('?')
        .join(', ') +
      ' ); ',
  ].join('');
  return conn.executeSql(query, fieldValues).then(r => resolve(r));
}

function updateDeviceLogWrapper(conn, resolve, reject, event: Object) {
  const fields = ['name', 'event', 'userId', 'app', 'timestamp', 'uploaded'];
  let fieldNames = [];
  let fieldValues = [];
  for (const field of fields) {
    if (event[field] == null) {
      continue;
    } // == cose we are going to ignore [null] and [undefined]
    fieldNames.push(field);
    fieldValues.push(event[field]);
  }
  if (fieldNames.length === 0) {
    return reject(false);
  }
  fieldValues.push(event.name);
  fieldValues.push(event.timestamp);
  return conn
    .executeSql(
      [
        ' UPDATE deviceLog SET ',
        fieldNames.join(' = ? , ') + ' = ? ',
        ' WHERE name = ? AND timestamp = ? ',
      ].join(''),
      fieldValues,
    )
    .then(r => resolve(r));
}

function getDeviceLogDataToUpload(conn, resolve, reject) {
  return conn
    .executeSql(' SELECT * FROM deviceLog WHERE uploaded = ? ', [0])
    .then(([result]) => {
      let events = [];
      const len = result.rows.length;
      for (let i = 0; i < len; i++) {
        events.push(result.rows.item(i));
      }
      resolve(events);
    });
}

// function insertUser(conn, resolve, reject, user: User) {
//   return conn
//     .executeSql([` INSERT INTO users `,
//       ` (id, uuid, email, password, username, firstname, lastname, `,
//       `   nicename, nickname, displayname, birthDate, `,
//       `   weight, height, sex, dirName, registered) `,
//       ` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); `].join(''),
//     [user.id, user.uuid, user.email, user.password, user.username, user.firstname, user.lastname,
//       user.nicename, user.nickname, user.displayname, user.birthDate,
//       user.weight, user.height, user.sex, user.dirName, user.registered
//     ])
//     .then(r => resolve(r))
// }
// function updateUser(conn, resolve, reject, user: User) {
//   return conn
//     .executeSql([` UPDATE users SET `,
//       ` email = ?, `,
//       ` password = ?, `,
//       ` username = ?, `,
//       ` firstname = ?, `,
//       ` lastname = ?, `,
//       ` nicename = ?, `,
//       ` nickname = ?, `,
//       ` displayname = ?, `,
//       ` birthDate = ?, `,
//       ` weight = ?, `,
//       ` height = ?, `,
//       ` sex = ?, `,
//       ` registered = ?, `,
//       user.id?` uuid = ? `:` id = ? `,
//       ` WHERE `,
//       user.id?` id = ? `:` uuid = ? `].join(''),
//       [user.email, user.password, user.username, user.firstname, user.lastname,
//         user.nicename, user.nickname, user.displayname, user.birthDate,
//         user.weight, user.height, user.sex, user.registered,
//         user.id?user.uuid:user.id,
//         user.id?user.id:user.uuid])
//       .then(r => resolve(r))
// }
//
// function insertUpdateUser(conn, resolve, reject, user: User) {
//   return insertUser(conn, resolve, reject, user)
//           .catch((error) => {
//             updateUser(conn, resolve, reject, user)
//           });
// }

const getVersion = () => wrapper(loadVersion);
// const saveUser = (user: User) => wrapper(insertUpdateUser, user)
// const saveWorkout = (workout: Workout) => wrapper(insertUpdateWorkout, workout)
// const getWorkouts = (userId: number) => wrapper(loadWorkouts, userId)

// const getWorkout = (userId: number, workoutId: number) => wrapper(loadWorkout, userId, workoutId)

export default {
  users: {
    getById: (userId: number) => wrapper(loadUserById, userId),
    getByUuid: (userUUID: string) => wrapper(loadUserByUUID, userUUID),
    getByEmail: (email: string) => wrapper(loadUserByEmail, email),
    // getByUsername: (username: string) => wrapper(loadUserByUsername, username),
    insert: (user: User) => wrapper(insertUserWrapped, user),
    updateById: (user: User) => wrapper(updateUserWrapped, user, true),
    updateByUuid: (user: User) => wrapper(updateUserWrapped, user, false),
  },
  workouts: {
    getById: (wkId: number) => wrapper(loadWorkoutById, wkId),
    getByUuid: (wkUUID: string) => wrapper(loadWorkoutByUUID, wkUUID),
    // getUserWorkouts: (userId: number) => wrapper(loadWorkouts, userId),
    getUserWorkouts: (userUUID: string) => wrapper(loadWorkouts, userUUID),
    insert: (wk: Workout) => wrapper(insertWorkoutWrapped, wk),
    updateByUuid: (wk: Workout) => wrapper(updateWorkoutWrapped, wk),

    forceDeleteById: (wkId: number) =>
      wrapper(forceDeleteWorkoutByIdWrapped, wkId),
    forceDeleteByUuid: (wkUuid: string) =>
      wrapper(forceDeleteWorkoutByUuidWrapped, wkUuid),
  },
  activities: {
    getById: (actId: number) => wrapper(loadActivityById, actId),
    getByUuid: (actUUID: string) => wrapper(loadActivityByUUID, actUUID),
    getUserActivities: (userUUID: string) => wrapper(loadActivities, userUUID),
    insert: (act: Object) => wrapper(insertActivityWrapped, act),
    update: (act: Object) => wrapper(updateActivityWrapped, act),
    forceDeleteById: (actId: number) =>
      wrapper(forceDeleteActivityByIdWrapped, actId),
  },
  getVersion,
  lastLogin: {
    get: () => wrapper(loadLastLogin),
    set: (email: string, password: string) =>
      wrapper(updateLastLogin, email, password),
  },
  device: {
    getDataByName: (name: string) => wrapper(loadDeviceDataByName, name),
    insert: (device: Object) => wrapper(insertDeviceWrapped, device),
    update: (device: Object, options) =>
      wrapper(updateDeviceWrapped, device, options),
    getDataToUpload: () => wrapper(getDevicesDataToUpload),
    flagAsUploaded: (deviceNames: Array<string>) =>
      wrapper(flagDevicesAsUploaded, deviceNames),
  },
  deviceLog: {
    insert: (event: Object) => wrapper(insertDeviceLogWrapper, event),
    update: (event: Object) => wrapper(updateDeviceLogWrapper, event),
    getDataToUpload: () => wrapper(getDeviceLogDataToUpload),
  },
  blacklist: {
    get: () => wrapper(loadBlacklist),
    insert: (name: string) => wrapper(insertToBlacklist, name),
    clear: () => wrapper(clearBlacklist),
  },
  whitelist: {
    get: () => wrapper(loadWhitelist),
    insert: (name: string) => wrapper(insertToWhitelist, name),
    clear: () => wrapper(clearWhitelist),
  },

  // saveUser,
  // getUserByEmail,
  //
  // getWorkouts,
  // saveWorkout,
  // writeBinaryFile,
  // getWorkout,
};
