import { call, put, takeEvery, takeLatest, all, actionChannel } from 'redux-saga/effects'
import api from '../../api'
import garmin from '../../api/garmin'
import { setListaFrameworks, getListaFrameworks } from '../actions/FrameworkActions'
import { getListaEventi, setListaEventi } from '../actions/EventActions'
import { getListaTemplate, setListaTemplate } from '../actions/TemplateActions'
import { getSoglia, setSoglia } from '../actions/SogliaActions' 
import {getMDFrameworks, setMDFrameworks} from '../actions/MDFrameworksActions'
import {getMDWorkouts, setMDWorkouts} from '../actions/MDWorkoutsActions'
import * as selectors from './selectors'
import {select} from 'redux-saga/effects'
import i18n from 'i18next'
import convertWorkoutInGarminFormat from '../../utilsGarmin/index'
import {workoutSportType} from '../../utilsGarmin/const'
import transform from '../../mdwifi/services/Transforms'

// FRAMEWORK

export function* getFrameworks(action) {
    
    const {payload} = action

    const response = yield call(api.getFrameworks, payload)
    
    yield put(setListaFrameworks(response.data.map(el => {

        const {id, dati} = el
        return {dbid: id, ...JSON.parse(dati)}
    })))
}

export function* postFramework(action) {

    const {payload} = action

    const response = yield call(api.postFramework, payload);
    if(response) alert(i18n.t('scrivi-framework:frame-salvato'))

    yield put(getListaFrameworks(window.md.logged_user.ID))

}

export function* updateFramework(action) {

    const lista = yield select(selectors.frameworks)

    const {payload} = action

    const framework = lista.find(el => el.id === payload.id)
    const {dbid} = framework

    const response = yield call(api.updateFramework, {dbid,...payload});
    if(response) alert(i18n.t('scrivi-framework:frame-salvato'))

    yield put(getListaFrameworks(window.md.logged_user.ID))

}

export function* deleteFramework(action) {
    
    const lista = yield select(selectors.frameworks)

    const {payload} = action

    const framework = lista.find(el => el.id === payload.id)
    const {dbid} = framework

    const response = yield call(api.deleteFramework, dbid);

    yield put(getListaFrameworks(window.md.logged_user.ID))

}

// EVENTI

export function* getEventi(action) {
    const { payload } = action

    const response = yield call(api.getEvents, payload)

    yield put(setListaEventi(response.data.map(el => {
        const { id, dati } = el

        const evento = {dbid: id, ...JSON.parse(dati)}
        evento.start = evento.start === null ? null : new Date(evento.start)
        evento.end = evento.end === null ? null : new Date(evento.end)
        return evento
    })))

}

export function* addEvento(action) {
    const { payload } = action

    const response = yield call(api.postEvent, payload)
    console.log(response)
    
    yield put(getListaEventi(payload.user_id))
}

export function* updateEvento(action) {
    const { payload } = action

    const response = yield call(api.updateEvent, payload)
    
    yield put(getListaEventi(payload.user_id))
}

export function* eliminaEvento(action) {
    const { payload } = action

    const response = yield call(api.deleteEvent, payload.evento)

    yield put(getListaEventi(payload.user_id))
}

// TEMPLATE

export function* getTemplates(action) {
    const { payload } = action

    const response = yield call(api.getTemplates, payload)

    yield put(setListaTemplate(response.data.map(el => {
        const { id, dati } = el

        const template = {dbid: id, ...JSON.parse(dati)}
        template.dataCreazione = new Date(template.dataCreazione)
        /* template.listaEventi.forEach(evento => {
            evento.start = evento.start === null ? null : new Date(evento.start)
            evento.end = evento.end === null ? null : new Date(evento.end)
        }) */
        console.log(template)
        return template
    })))
}

export function* addTemplate(action) {
    const { payload } = action

    const response = yield call(api.postTemplate, payload)

    yield put(getListaTemplate(window.md.logged_user.ID))
}

export function* updateTemplate(action) {
    const { payload } = action

    const response = yield call(api.updateTemplate, payload)

    yield put(getListaTemplate(window.md.logged_user.ID))
}

export function* eliminaTemplate(action) {
    const { payload } = action

    const response = yield call(api.deleteTemplate, payload)

    yield put(getListaTemplate(window.md.logged_user.ID))
}

// SOGLIA

export function* getSogliaSaga(action) {
    const { payload } = action

    const response = yield call(api.getSoglia, payload)
    const { data } = response
    console.log(data)
    const soglia = {/* dbid: data[0].id,  */...data}
    console.log(soglia)

    yield put(setSoglia(soglia))
}

export function* addSoglia(action) {
    const { payload } = action

    const response = yield call(api.postSoglia, payload)

    yield put(getSoglia(payload.user_id))
}

export function* updateSoglia(action) {
    const { payload } = action

    const response = yield call(api.updateSoglia, payload)

    yield put(getSoglia(payload.user_id))
}

export function* eliminaSoglia(action) {
    const { payload } = action

    const response = yield call(api.deleteSoglia, payload)

    yield put(getSoglia(payload.user_id))
}


export function* getListaMDFrameworks(action) {

    const response = yield call(api.getMDFrameworks, null)
    const { data } = response

    const filteredFrameworks = data.scheletri.filter(el => (el.matrice !== "1" && el.deleted !== "1"))
                                             .filter( el => Number(el.id_creatore) === Number(window.md.logged_user.ID))
                                             .filter(el => el.licenza === 'FIT')

    yield put(setMDFrameworks(filteredFrameworks))

}
export function* getListaMDWorkouts(action) {


    const {payload} = action

    if(!payload) return

    const response = yield call(api.getMDWorkouts, payload)
    const { data } = response

    const filteredWorkouts = data.allenamenti.filter(el => Number(el.deleted) === 0)

    yield put(setMDWorkouts(filteredWorkouts))

}


export function* uploadFrameworkToGarmin(action) {

    if(!action || !action.payload) return

    const {payload} = action
    const {framework, user_id,date} = payload

    if(!framework || !user_id) return

    let workout = null

   
    if(framework.tipoPerSelect === 'ciclismo') workout = convertWorkoutInGarminFormat(workoutSportType.CYCLING,framework)
    if(framework.tipoPerSelect === 'corsa') workout = convertWorkoutInGarminFormat(workoutSportType.RUNNING,framework)
    if(framework.tipoPerSelect === 'nuoto') workout = convertWorkoutInGarminFormat(workoutSportType.LAP_SWIMMING,framework)

    const response =  yield call(garmin.upload,user_id,workout)
    const uploaded_workout = response.data

    console.log({uploaded_workout,workout})
    
    if(uploaded_workout.workoutId) yield put({type: 'FRAMEWORK_UPLOADED', payload: {id: framework.id}})

    if(date && uploaded_workout.workoutId) {
        const schedule_response = yield call(garmin.schedule,user_id,uploaded_workout.workoutId,date)
        console.log(schedule_response.data)
    }
    
}
export function* uploadToGarmin(action) {

    if(!action || !action.payload) return

    const {payload} = action
    const {events, user_id} = payload

    if(!events || !user_id) return

    const lista = yield select(selectors.frameworks)
    const listaFit = yield select(selectors.fit_frameworks)

    
    
    events.forEach((ev,index) => { 
        
        
        const frame = (ev.extendedProps.mdType === 'FIT') 
        ? listaFit.find(el => el.id === ev.extendedProps.mdId)
        : lista.find(el => el.id === ev.extendedProps.mdId)
        
        
        if(!frame) return

         if(ev.extendedProps.mdType === 'FIT') {
            setTimeout(() => {
                console.log({FIT: frame})
                put({type: 'UPLOAD_FIT_TO_GARMIN', payload: {framework: frame,user_id,date: new Date(ev.start).toISOString()}})
            },100) 
         }
         else {
            setTimeout(() => {
                console.log({WKT: frame})
                put({type: 'UPLOAD_FRAMEWORK_TO_GARMIN', payload: {framework: frame,user_id,date: new Date(ev.start).toISOString()}})
            },100)
         }


    })


    
    /* const cycling_event = events.find(ev => ev.extendedProps.mdType === 'ciclismo')
    const running_event = events.find(ev => ev.extendedProps.mdType === 'corsa')
    const swimming_event = events.find(ev => ev.extendedProps.mdType === 'nuoto')
    const fit_event = events.find(ev => ev.extendedProps.mdType === 'FIT') */
    
    
    /* if(cycling_event) {

        const frame = lista.find(el => el.id === cycling_event.extendedProps.mdId)
        if(!frame) return
        yield put({type: 'UPLOAD_FRAMEWORK_TO_GARMIN', payload: {framework: frame,user_id,date: new Date(cycling_event.start).toISOString()}})

        
    }

    if(running_event) {

        return

        const frame = lista.find(el => el.id === running_event.extendedProps.mdId)
        if(!frame) return
        yield put({type: 'UPLOAD_FRAMEWORK_TO_GARMIN', payload: {framework: frame,user_id,date}})

        

    }
    if(swimming_event) {

        return

        const frame = lista.find(el => el.id === swimming_event.extendedProps.mdId)  
        if(!frame) return
        yield put({type: 'UPLOAD_FRAMEWORK_TO_GARMIN', payload: {framework: frame,user_id,date}})
        

    }


    if(fit_event) {
        const frame = listaFit.find(el => el.id === fit_event.extendedProps.mdId)
        if(!frame) return
        yield put({type: 'UPLOAD_FIT_TO_GARMIN', payload: {framework: frame,user_id,date: new Date(fit_event.start).toISOString()}})
    } */


}

export function* uploadFitToGarmin(action) {

    if(!action || !action.payload) return

    const {payload} = action
    const {framework,user_id,date} = payload
    const {id} = framework

    const resp = yield call(api.getMDFrameworkByID,id)

    const {data} = resp
    const {scheletro,dati} = data
    const nome = scheletro[0].nome

    
    const w = transform.transformCsvArrToWorkout(dati)
    const workout = convertWorkoutInGarminFormat(workoutSportType.CYCLING,{...w,nome},true)
    const response =  yield call(garmin.upload,user_id,workout)
    const uploaded_workout = response.data

    console.log({uploaded_workout,workout})
    if(uploaded_workout.workoutId) yield put({type: 'FIT_UPLOADED', payload: {id: framework.id}})

    if(date && uploaded_workout.workoutId) {
        const schedule_response = yield call(garmin.schedule,user_id,uploaded_workout.workoutId,date)
        console.log(schedule_response.data)
    }

}



function* rootSaga() {
    yield takeLatest('GET_LISTA_FRAMEWORKS', getFrameworks)
    yield takeLatest('ADD_FRAMEWORK', postFramework)
    yield takeLatest('REPLACE_FRAMEWORK', updateFramework)
    yield takeLatest('DELETE_FRAMEWORK', deleteFramework)

    yield takeLatest('GET_LISTA_EVENTI', getEventi)
    yield takeLatest('ADD_EVENTO', addEvento)
    yield takeLatest('REPLACE_EVENTO', updateEvento)
    yield takeLatest('ELIMINA_EVENTO', eliminaEvento)

    yield takeLatest('GET_LISTA_TEMPLATE', getTemplates)
    yield takeLatest('ADD_TEMPLATE', addTemplate)
    yield takeLatest('REPLACE_TEMPLATE', updateTemplate)
    yield takeLatest('ELIMINA_TEMPLATE', eliminaTemplate)

    yield takeLatest('GET_SOGLIA', getSogliaSaga)
    yield takeLatest('ADD_SOGLIA', addSoglia)
    yield takeLatest('REPLACE_SOGLIA', updateSoglia)
    yield takeLatest('ELIMINA_SOGLIA', eliminaSoglia)

    yield takeLatest('GET_MD_FRAMEWORKS',getListaMDFrameworks)
    yield takeLatest('GET_MD_WORKOUTS',getListaMDWorkouts)

    yield takeLatest('UPLOAD_TO_GARMIN', uploadToGarmin)
    yield takeEvery('UPLOAD_FRAMEWORK_TO_GARMIN', uploadFrameworkToGarmin)
    yield takeEvery('UPLOAD_FIT_TO_GARMIN', uploadFitToGarmin)
}

export default rootSaga

