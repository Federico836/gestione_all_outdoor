const getListaEventi = () => {
    return {type: 'GET_LISTA_EVENTI'}
}

const setListaEventi = lista => {
    return {type: 'SET_LISTA_EVENTI', payload: lista}
}

const addEvento = evento => {
    return {type: 'ADD_EVENTO', payload: evento}
}

const eliminaEvento = evento => {
    return {type: 'ELIMINA_EVENTO', payload: evento}
}

export { getListaEventi, setListaEventi, addEvento, eliminaEvento }