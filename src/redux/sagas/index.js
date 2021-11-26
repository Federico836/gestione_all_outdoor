import { call, put, takeEvery, takeLatest, all, actionChannel } from 'redux-saga/effects'
import api from '../../api'
import { setListaFrameworks, getListaFrameworks } from '../actions/FrameworkActions'
import { getListaEventi, setListaEventi } from '../actions/EventActions'
import * as selectors from './selectors';
import {select} from 'redux-saga/effects';

export function* getFrameworks(action) {
    
    const {payload} = action

    const response = yield call(api.getFrameworks, payload);
    
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

export function* getEventi(action) {
    const { payload } = action

    const response = yield call(api.getEvents, payload)

    yield put(setListaEventi(response.data.map((el, index) => {
        const { id, dati } = el
        return {dbid: id, ...JSON.parse(dati)}
    })))

}

export function* addEvento(action) {
    const { payload } = action

    const response = yield call(api.postEvent, payload)
    
    yield put(getListaEventi())
}

export function* eliminaEvento(action) {
    const { payload } = action

    const response = yield call(api.deleteEvent, payload)

    yield put(getListaEventi())
}

function* rootSaga() {
    yield takeLatest('GET_LISTA_FRAMEWORKS', getFrameworks)
    yield takeLatest('ADD_FRAMEWORK', postFramework)
    yield takeLatest('REPLACE_FRAMEWORK', updateFramework)
    yield takeLatest('DELETE_FRAMEWORK', deleteFramework)

    yield takeLatest('GET_LISTA_EVENTI', getEventi)
    yield takeLatest('ADD_EVENTO', addEvento)
    yield takeLatest('ELIMINA_EVENTO', eliminaEvento)
}

export default rootSaga
