/**
 * @format
 * @flow
 */

import type {User as AppUser, Sex} from './AppTypeDefinition';
import {
  NONE,
  CLIENT_ERROR,
  SERVER_ERROR,
  TIMEOUT_ERROR,
  CONNECTION_ERROR,
  NETWORK_ERROR,
  UNKNOWN_ERROR,
  CANCEL_ERROR,
} from 'apisauce';

type ApiUserCapabilities = {[key: string]: boolean}; // key in: administrator, atleta
export type User = {
  id: number,
  username: string,
  nicename: string,
  email: string,
  url: string,
  registered: string, // REVIEW
  displayname: string,
  firstname: string,
  lastname: string,
  nickname: string,
  description: string,
  capabilities: ApiUserCapabilities,
  avatar: string,
};
type ApiUser = User;

export type WebApiObject = {
  ping: () => any,
  auth: {
    authorize: (email: string, password: string) => WebApiAuthorizeResponse,
    setAuthCookie: (cookie: string) => void,
    clearRequestTransforms: () => void,
    getNonce: () => WebApiGetNonceResponse,
    register: (
      user: AppUser,
      nonce: string,
    ) => WebApiUserRegistrationDataResponse,
  },
  chat: {},
  data: {
    getUserData: (userId: number, token?: string) => UserDataResponse,
    getWorkoutsList: (userId: number, token?: string) => WorkoutsListResponse,
    getWorkout: (workoutId: number, token?: string) => WorkoutResponse,
    getActivitiesList: (
      userId: number,
      token?: string,
    ) => ActivitiesListResponse,
    getBlacklist: (token: string) => BlacklistResponse,
    getWhitelist: (token: string) => WhitelistResponse,
    uploadDeviceLogEvent: (event: Object, token: string) => Object, // TODO: flow
    // getUserData,
    // getWorkoutsList,
    // getWorkout,
    // getActivitiesList,
    // getActivity,
    // getWorkoutsList: (userId: number) => WorkoutsListResponse,
    // getWorkout: (workoutId: number) => WorkoutData
    // saveActivity: (activity: Object, token?: string) =>
  },
};

type apiSauceResponseProblem =
  | NONE
  | CLIENT_ERROR
  | SERVER_ERROR
  | TIMEOUT_ERROR
  | CONNECTION_ERROR
  | NETWORK_ERROR
  | UNKNOWN_ERROR
  | CANCEL_ERROR;

type apiSauceBaseResponse = {
  // ok: boolean, // True is the status code is in the 200's; false otherwise.
  // problem: apiSauceResponseProblem, // One of 6 different values (see above - problem codes)
  // data?: Object, // response data
  status?: number, // the HTTP response code
  headers?: Object, // the HTTP response headers
  config?: Object, // the `axios` config object used to make the request
  duration?: number, // the number of milliseconds it took to run this request
};

type apiSauceOkResponse = apiSauceBaseResponse & {
  ok: true, // True is the status code is in the 200's; false otherwise.
  problem: NONE, // One of 6 different values (see above - problem codes)
};

type apiSauceErrorResponse = apiSauceBaseResponse & {
  ok: false, // True is the status code is in the 200's; false otherwise.
  problem: apiSauceResponseProblem, // One of 6 different values (see above - problem codes)
};

/* Authorize start */
export type WebApiAuthorizeRequest = {
  email: string,
  password: string,
};
type WebApiAuthorizeOkResponse = apiSauceOkResponse & {
  data: {
    status: 'ok',
    cookie: string,
    cookie_name: string,
    user: ApiUser,
  },
};
type WebApiAuthorizeErrorResponse =
  | (apiSauceOkResponse & {
      data: {
        status: 'error',
        error: string,
      },
    })
  | apiSauceErrorResponse;

export type WebApiAuthorizeResponse =
  | WebApiAuthorizeOkResponse
  | WebApiAuthorizeErrorResponse;

/* Authorize end */

/* Registration start */
type WebApiGetNonceOkResponse = apiSauceOkResponse & {
  data: {
    status: 'ok',
    nonce: string,
  },
  // controller: 'user' string
  // method: 'register' string
};
export type WebApiGetNonceResponse =
  | WebApiGetNonceOkResponse
  | apiSauceErrorResponse;

export type WebApiUserRegistrationDataRequest = {
  nonce: string,
  username: string,
  email: string,
  user_pass?: string,
  first_name: string,
  last_name: string,
  data_nascita: string, // REVIEW
  sesso: Sex, // REVIEW
  peso: string, // REVIEW
  altezza?: string, // REVIEW
  // REVIEW all below this
  /*
  massa_grassa: any,
  frequenza_cardiaca
  indirizzo
  citta
  provincia
  cap
  tel1
  tel2
  sport
  specialita
  categoria
  societa
  lunghezza_pedivella
  */
};

type WebApiUserRegistrationDataOkResponse = apiSauceOkResponse & {
  // TODO
  // status: 'ok',
  // nonce: string
};

export type WebApiUserRegistrationDataResponse =
  | WebApiUserRegistrationDataOkResponse
  | apiSauceErrorResponse;
/* Registration end */

/* User calls start */

export type UserData = $ReadOnly<{
  id_utente: string,
  nome: ?string,
  cognome: ?string,
  data_nascita: ?string, // "03/03/1978" || "12/7/1968"
  peso: ?string,
  altezza: ?string,
  massa_grassa: ?string,
  frequenza_cardiaca: ?string,
  controllo_cuore: {|
    enabled: boolean,
    soglia_cuore: number,
    tipo_controllo: number,
    perc_ricalcolo: number,
  |},
}>;

type UserDataOkResponse = apiSauceOkResponse & {
  data: {
    status: 'ok',
    utente: Array<UserData>,
  },
};
type UserDataErrorResponse = apiSauceErrorResponse & {
  data?: ?{
    status: 'error',
    error: string,
  },
};
export type UserDataResponse = UserDataOkResponse | UserDataErrorResponse;
/* User calls end */

/* Data calls start */
export type WorkoutListData = {
  id: string,
  nome: string,
  tipo: string,
  id_allenatore: string,
  id_scheletro: string,
  deleted: string,
  expired: string,
  licenza: string,
  data: string,
  data_aggiornamento: string,
};
type WorkoutsListOkResponse = apiSauceOkResponse & {
  data: {
    status: 'ok',
    allenamenti: Array<WorkoutListData>,
  },
};
type WorkoutsListErrorResponse =
  | apiSauceErrorResponse
  | {
      data: {
        status: 'error',
        error: string,
      },
    };

export type WorkoutsListResponse =
  | WorkoutsListOkResponse
  | WorkoutsListErrorResponse;

export type ActivityListData = {
  id: string,
  nome: string,
  data: string,
  data_inserimento: string,
  id_allenamento_originale: string,
  tipo: ?string,
  deleted: string,
};

type ActivitiesListOkResponse = apiSauceOkResponse & {
  data: {
    status: 'ok',
    allenamenti: Array<ActivityListData>,
  },
};

type ActivitiesListErrorResponse =
  | apiSauceErrorResponse
  | {
      data: {
        status: 'error',
        error: string,
      },
    };

export type ActivitiesListResponse =
  | ActivitiesListOkResponse
  | ActivitiesListErrorResponse;

export type WorkoutHeadData = {
  id: string,
  nome: string,
  tipo: string,
  tipo_workout: ?string,
  id_allenatore: string,
  licenza: string,
  dati_cuore: string,
  id_scheletro: string,
  data: string,
  data_aggiornamento: string,
  note: string,
  ver: ?string,
  watt_rif: string,
  rpm_rif: string,
  bpm_rif: string,
  nm_rif: string,
  training_framework: string,
  deleted: string,
  expired: string,
  max_executions: string,
  remaining_downloads: string,
  download_limit_reached?: boolean,
};
export type WorkoutBodyData = string[];
export type WorkoutOkResponseData = {
  status: 'ok',
  allenamento: WorkoutHeadData[],
  dati: WorkoutBodyData,
};
type WorkoutOkResponse = apiSauceOkResponse & {
  data: WorkoutOkResponseData,
};
type WorkoutErrorResponse = apiSauceErrorResponse & {
  data?: ?{
    status: 'error',
    error: string,
  },
};
export type WorkoutResponse = WorkoutOkResponse | WorkoutErrorResponse;
type BlacklistOkResponse = apiSauceOkResponse & {
  data: {
    status: 'ok',
    blacklist: Array<string>,
  },
};
type BlacklistErrorResponse = apiSauceErrorResponse & {
  data?: ?{
    status: 'error',
    error: string,
  },
};
export type BlacklistResponse = BlacklistOkResponse | BlacklistErrorResponse;
type WhitelistOkResponse = apiSauceOkResponse & {
  data: {
    status: 'ok',
    whitelist: Array<string>,
  },
};
type WhitelistErrorResponse = apiSauceErrorResponse & {
  data?: ?{
    status: 'error',
    error: string,
  },
};
export type WhitelistResponse = WhitelistOkResponse | WhitelistErrorResponse;
/* Data calls end */
