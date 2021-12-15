function sogliaReducer(state = { soglia: {} }, action ) {
    if(!action || !action.type || !action.payload === null || action.payload === undefined) return {...state}

    const { type, payload } = action
    
    if(type==="SET_SOGLIA") {
        return {...state, soglia: payload}
    } else {
        return state
    }
}

export default sogliaReducer