import { call, put, takeEvery, takeLatest, all, actionChannel } from 'redux-saga/effects'
import api from '../../api'
import {setListaFrameworks, getListaFrameworks} from '../actions/FrameworkActions'
import * as selectors from './selectors';
import {select} from 'redux-saga/effects';

export function* getFrameworks(action) {
    
    const {payload} = action

    const response = yield call(api.getFrameworks, payload);
    
    yield put(setListaFrameworks(response.data.map((el,index) => {

        const {id,dati} = el
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

function* rootSaga() {
    yield takeLatest('GET_LISTA_FRAMEWORKS', getFrameworks)
    yield takeLatest('ADD_FRAMEWORK', postFramework)
    yield takeLatest('REPLACE_FRAMEWORK', updateFramework)
    yield takeLatest('DELETE_FRAMEWORK', deleteFramework)
}

export default rootSaga
