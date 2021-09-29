import { call, put, takeEvery, takeLatest,all,actionChannel } from 'redux-saga/effects'

export function* getListaWorkouts(action) {
    /* const {payload} = action

    const response = yield call(api.getWorkouts, payload);
    
    const grouped = _.groupBy(response.data.allenamenti.filter(el => el.deleted !== "1"), allenamento => allenamento.category);
    console.log(response)
    //console.log({grouped})

    const groupedArray = Object.entries(grouped).map((el) => {
        return {category: el[0], workouts: el[1]}
    })
    
    yield put({type: WorkoutActions.SET_LISTA_ALLENAMENTI, payload: groupedArray});
    yield put({type: WorkoutActions.SET_LISTA_ALL_NON_GROUPED, payload: response.data.allenamenti}); */
}

export function* getListaFrameworks(action) {
    
    /* return

    const {payload} = action

    const response = yield call(api.getFrameworks, payload);
    yield put({type: FrameworkActions.SET_LISTA_FRAMEWORKS, payload: response.data.scheletri.map((el,index) => {
        return {...el}
    })}); */


}



function* rootSaga() {
   /* yield takeLatest(WorkoutActions.GET_LISTA_ALLENAMENTI, getListaWorkouts)
   yield takeLatest(FrameworkActions.GET_LISTA_FRAMEWORKS, getListaFrameworks) */
   //yield takeEvery(FrameworkActions.UPLOAD_WORKOUT_TO_USER,handleInviaWorkout)
}

export default rootSaga
