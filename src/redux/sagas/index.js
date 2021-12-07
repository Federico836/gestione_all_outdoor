import { call, put, takeEvery, takeLatest, all, actionChannel } from 'redux-saga/effects'
import api from '../../api'
import { setListaFrameworks, getListaFrameworks } from '../actions/FrameworkActions'
import { getListaEventi, setListaEventi } from '../actions/EventActions'
import { getListaTemplate, setListaTemplate } from '../actions/TemplateActions'
import * as selectors from './selectors'
import {select} from 'redux-saga/effects'

// FRAMEWORK

export function* getFrameworks(action) {
    
    const {payload} = action

    const response = yield call(api.getFrameworks, payload)
    console.log(response)
    
    yield put(setListaFrameworks(response.data.map((el, index) => {

        const {id, dati} = el
        return {dbid: id, ...JSON.parse(dati)}
    })))
}

export function* postFramework(action) {

    const {payload} = action

    const response = yield call(api.postFramework, payload);

    yield put(getListaFrameworks())

}

export function* updateFramework(action) {

    const lista = yield select(selectors.frameworks)

    const {payload} = action

    const framework = lista.find(el => el.id === payload.id)
    const {dbid} = framework

    const response = yield call(api.updateFramework, {dbid,...payload});

    yield put(getListaFrameworks())

}

export function* deleteFramework(action) {
    
    const lista = yield select(selectors.frameworks)

    const {payload} = action

    const framework = lista.find(el => el.id === payload.id)
    const {dbid} = framework

    const response = yield call(api.deleteFramework, dbid);

    yield put(getListaFrameworks())

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
    
    yield put(getListaEventi())
}

export function* updateEvento(action) {
    const { payload } = action

    const response = yield call(api.updateEvent, payload)
    
    yield put(getListaEventi())
}

export function* eliminaEvento(action) {
    const { payload } = action

    const response = yield call(api.deleteEvent, payload)

    yield put(getListaEventi())
}

// TEMPLATE

export function* getTemplates(action) {
    const { payload } = action

    const response = yield call(api.getTemplates, payload)
    console.log(response)

    yield put(setListaTemplate(response.data.map(el => {
        const { id, dati } = el

        const template = {dbid: id, ...JSON.parse(dati)}
        template.start = template.start === null ? null : new Date(template.start)
        template.end = template.end === null ? null : new Date(template.end)
        return template
    })))
}

export function* addTemplate(action) {
    const { payload } = action

    const response = yield call(api.postTemplate, payload)

    yield put(getListaTemplate())
}

export function* updateTemplate(action) {
    const { payload } = action

    const response = yield call(api.updateTemplate, payload)

    yield put(getListaTemplate())
}

export function* eliminaTemplate(action) {
    const { payload } = action

    const response = yield call(api.eliminaTemplate, payload)

    yield put(getListaTemplate())
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
}

export default rootSaga
