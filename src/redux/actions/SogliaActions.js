const getSoglia = idUtente => {
    return {type: 'GET_SOGLIA', payload: idUtente}
}

const setSoglia = soglia => {
    return {type: 'SET_SOGLIA', payload: soglia}
}

const addSoglia = (soglia, user_id) => {
    return {type: 'ADD_SOGLIA', payload: {soglia, user_id}}
}

const replaceSoglia = (soglia, user_id) => {
    return {type: 'REPLACE_SOGLIA', payload: {soglia, user_id}}
}

const eliminaSoglia = (soglia, user_id) => {
    return {type: 'ELIMINA_SOGLIA', payload: {soglia, user_id}}
}

export { getSoglia, setSoglia, addSoglia, replaceSoglia, eliminaSoglia }
