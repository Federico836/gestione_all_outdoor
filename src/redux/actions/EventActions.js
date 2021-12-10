const getListaEventi = idUtente => {
    return {type: 'GET_LISTA_EVENTI', payload: idUtente}
}

const setListaEventi = lista => {
    return {type: 'SET_LISTA_EVENTI', payload: lista}
}

const addEvento = (evento, user_id) => {
    return {type: 'ADD_EVENTO', payload: {evento, user_id}}
}

const replaceEvento = (evento, user_id) => {
    return {type: 'REPLACE_EVENTO', payload: {evento, user_id}}
}

const eliminaEvento = evento => {
    return {type: 'ELIMINA_EVENTO', payload: evento}
}

export { getListaEventi, setListaEventi, addEvento, replaceEvento, eliminaEvento }