const setMDWorkouts = lista => {
    return {type: 'SET_MD_WORKOUTS', payload: lista}
}

const getMDWorkouts = id_utente => {
    return {type: 'GET_MD_WORKOUTS', payload: id_utente}
}

export {
    setMDWorkouts,
    getMDWorkouts
}