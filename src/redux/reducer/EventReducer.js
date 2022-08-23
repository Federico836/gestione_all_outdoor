function eventReducer(state = { lista: null }, action ) {
    if(!action || !action.type || !action.payload === null || action.payload === undefined) return {...state};

    const { type, payload } = action
    
    if(type==="SET_LISTA_EVENTI") {
        return {...state, lista: payload}
    } else {
        return state
    }
}

export default eventReducer