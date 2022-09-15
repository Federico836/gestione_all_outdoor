// @flow
// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import qs from 'qs'
import { Platform } from 'react-native';

import type {
  WebApiObject,
  WebApiAuthorizeRequest,
  WebApiAuthorizeResponse,
  WebApiUserRegistrationDataRequest,
  WebApiUserRegistrationDataResponse
} from '../types/WebApiTypeDefinition'

const postHeaders = {
  headers: {
    'Accept'      : 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
// REVIEW:
import RNFetchBlob from 'rn-fetch-blob';

// TODO rename to createWebApiClient, etc.
// our "constructor"
const create = (baseURL ?: string = 'https://www.magneticdays.com/api/', appType?: string = ''): WebApiObject => { // TODO flow
  const authAppType: string = appType;
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 60 second timeout...
    // timeout: 60000
    timeout: 600000
  })

  const setAuthCookie = (cookie) => {
    api.addRequestTransform((request) => {
      request.params['auth_cookie'] = cookie
    })
  }

  const clearRequestTransforms = () => {
    api.requestTransforms = []
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const ping = (timeout = 3000) => api.head('/', {}, {timeout})

  // auth part start
  const authorize = (email, password) => {
    const data: WebApiAuthorizeRequest = { email, password, app_type: authAppType }
    return api.get('md/generate_auth_cookie/', data)
    // TODO: review
    // RNFetchBlob.fetch('GET', 
    //   'https://www.magneticdays.com/api/user/generate_auth_cookie/?email='
    //   + email
    //   + '&password='
    //   + password
    // ).then((res) => {
    //   let status = res.info().status;
      
    //   if(status == 200) {
    //     // the conversion is done in native code
    //     let base64Str = res.base64()
    //     // the following conversions are done in js, it's SYNC
    //     let text = res.text()
    //     let json = res.json()
    //   } else {
    //     // handle other status codes
    //   }
    // })
    // // Something went wrong:
    // .catch((errorMessage, statusCode) => {
    //   console.log(errorMessage, statusCode);
    //   // error handling
    // })
    // return new Promise();
    // return fetch('https://www.magneticdays.com/api/user/generate_auth_cookie/?email='
    //   + email
    //   + '&password='
    //   + password)
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   return responseJson;
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }

  const getNonce = () => api.get('get_nonce/', {controller: 'user', method: 'register'})

  const register = (user, nonce) => {
    let data: WebApiUserRegistrationDataRequest = {
      nonce: nonce,
      username: user.username,
      email: user.email,
      user_pass: user.password,
      first_name: user.firstname,
      last_name: user.lastname,
      data_nascita: String(user.birthDate) || '', // TODO Date to string format
      sesso: user.sex || 0, // REVIEW
      peso: String(user.weight) || '', // REVIEW parseInt(user.weight, 10)
    }
    if (user.height) data.altezza = (String(user.height) || '')
    return api.post('user/register/', qs.stringify(data), postHeaders)
    // return api.post('user/register/', data)
  }

  const getUserData = (userId: number, token?: string) => {
    let data: {id_utente: number, auth_cookie?: string} = {id_utente: userId}
    token && (data.auth_cookie = token)
    return api.get('md/get_utente/', data)
  }
  const retrievePassword = (userName: string) => {
    return api.get('user/retrieve_password/', {user_login: userName}) // TODO test if retrievePassword available for email
  }
  // auth part end

  // data part start
  const getWorkoutsList = (userId: number, token?: string) => {
    let data: {id_utente: number, auth_cookie?: string} = {id_utente: userId}
    token && (data.auth_cookie = token)
    return api.get('md/get_elenco_allenamenti_da_eseguire/', data)
  }
  const getWorkout = (workoutId: number, token?: string) => {
    let data: {id_allenamento: number, auth_cookie?: string, decrement: 1} = {id_allenamento: workoutId, decrement: 1};
    token && (data.auth_cookie = token);
    return api.get('md/get_allenamento_da_eseguire/', data)
  }
  const getActivitiesList = (userId: number, token?: string) => {
    let data: {id_utente: number, auth_cookie?: string} = {id_utente: userId}
    token && (data.auth_cookie = token)
    return api.get('md/get_elenco_allenamenti_eseguiti/', data)
  }
  const getActivity = (activityId: number, token?: string) => {
    let data: {id_allenamento: number, auth_cookie?: string} = {id_allenamento: activityId}
    token && (data.auth_cookie = token)
    return api.get('md/get_allenamento_eseguito/', data)
  }
  const saveActivity = (activity: Object, token?: string) => {

    let act = {...{}, ...activity}
    if (token) {
      act.auth_cookie = token;
    }
    return api.post('md/post_allenamento_eseguito_json/', act,   {
      headers: {
        'Content-Encoding': 'gzip',
        'Accept'      : 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    /*
    if (Platform.OS === 'android') {
      const data = new FormData();
      getFormData(data, activity);
      const url = 'md/post_allenamento_eseguito/' + (token?'?auth_cookie='+token:'');
      return api.post(url, data)
    }
    let tmpData = {...{}, ...activity}
    token && (tmpData.auth_cookie = token)
    return api.post('md/post_allenamento_eseguito/', qs.stringify(tmpData), postHeaders)
    */
    // const data = new FormData();
    // getFormData(data, activity);
    // // const data = getFormData(activity);
    // // if (token) {data.append('auth_cookie', token)}
    // const url = 'md/post_allenamento_eseguito/' + (token?'?auth_cookie='+token:'');
    // return api.post(url, data)
    // let tmpData = {...{}, ...activity}
    // token && (tmpData.auth_cookie = token)
    // return api.post('md/post_allenamento_eseguito/', qs.stringify(tmpData), postHeaders)
  }
  const saveActivityOnDev = (data: Object) => {
    const tmpApi = apisauce.create({
      baseURL: 'http://dev.magneticdays.com/',
      headers: {
        'Cache-Control': 'no-cache'
      },
      timeout: 60000
    })
    const tmpData = {...{}, ...data, api_key: 'IU42zMf9egtluH7ar4iQHLbMyQiLCLKl'}
    return tmpApi.post('activity_events', tmpData, {
      headers: {
        'Content-Encoding': 'gzip',
        'Accept'      : 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }
  const saveDeviceData = (data: Object) => {
    const tmpApi = apisauce.create({
      baseURL: 'http://dev.magneticdays.com/',
      headers: {
        'Cache-Control': 'no-cache'
      },
      timeout: 60000
    })
    const tmpData = {...{}, ...data, api_key: 'IU42zMf9egtluH7ar4iQHLbMyQiLCLKl'}
    return tmpApi.post('device_data', tmpData)
  }
  const saveSzDebug = (data: Object) => {
    const tmpApi = apisauce.create({
      baseURL: 'http://www.magneticdays.com/',
      headers: {
        'Cache-Control': 'no-cache'
      },
      timeout: 600000
    })
    if (Platform.OS === 'android') {
      const fData = new FormData();
      getFormData(fData, data);
      fData.append('api_key', 'IU42zMf9egtluH7ar4iQHLbMyQiLCLKl');
      return tmpApi.post('szdebug.php', fData)
    }
    // const fData = new FormData();
    // getFormData(fData, data);
    // fData.append('api_key', 'IU42zMf9egtluH7ar4iQHLbMyQiLCLKl');
    // const data = getFormData(activity);
    // if (token) {data.append('auth_cookie', token)}
    // const url = 'md/post_allenamento_eseguito/' + (token?'?auth_cookie='+token:'');
    // return api.post(url, data)

    const tmpData = {...{}, ...data, api_key: 'IU42zMf9egtluH7ar4iQHLbMyQiLCLKl'}
    return tmpApi.post('szdebug.php', qs.stringify(tmpData), postHeaders)
    // return tmpApi.post('szdebug.php', fData)
  }

  const getBlacklist = (token: string) => {
    let data: {auth_cookie: string} = {auth_cookie: token};
    return api.get('md/get_blacklist/', data);
  }

  const getWhitelist = (token: string) => {
    let data: {auth_cookie: string} = {auth_cookie: token};
    return api.get('md/get_whitelist/', data);
  }

  const uploadDeviceLogEvent = (event: Object, token: string) => {
    let data = {...event, auth_cookie: token};
    return api.post('md/post_stato_rullo/', qs.stringify(data), postHeaders)
  }

  // data part end

  // chat part start
  /*
  chat start
  const getMessage(id: number) => {
    return api.get('chat/get_messaggio', {id_messaggio: id})
  }
  const getMessageList() => {
  }
  // auth_cookie required
  // 404 or
  // {
  //   "status": "ok",
  //   "messaggi": 0
  // }
  const getUnreadMessages(userId: number) => {
    return api.get('chat/check_messaggi', {id_utente: userId})
  }
  */
  // chat part end

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    ping: ping,
    auth: {
      authorize,
      setAuthCookie,
      clearRequestTransforms,
      getNonce,
      register
    },
    chat: {

    },
    data: {
      getUserData,
      getWorkoutsList,
      getWorkout,
      getActivitiesList,
      getActivity,
      saveActivity,
      saveSzDebug,
      saveActivityOnDev,
      saveDeviceData,
      getBlacklist,
      getWhitelist,
      uploadDeviceLogEvent,
    }
  }
}

export type WebApiCreateObjectType = {
  create: (baseURL ?: string, appType?: string) => WebApiObject
}
const webApiCreateObject: WebApiCreateObjectType = {
  create
}
export default webApiCreateObject
// let's return back our create method as the default.
// export default {
//   create
// }

// getFormData = object => Object.keys(object).reduce((formData, key) => {
//     formData.append(key, object[key]);
//     return formData;
// }, new FormData());

const getFormData = (formData, data, previousKey) => {
  if (data instanceof Object) {
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (value instanceof Object && !Array.isArray(value)) {
        return getFormData(formData, value, key);
      }
      if (previousKey) {
        key = `${previousKey}[${key}]`;
      }
      if (Array.isArray(value)) {
        value.forEach((val, index) => {
          getFormData(formData, val, `${key}[${index}]`);
          // formData.append(`${key}[]`, val);
        });
      } else {
        (value !== null) && formData.append(key, value);
      }
    });
  } else {
    formData.append(previousKey, data);
  }
}
