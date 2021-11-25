const getListaEventi = () => {
    return {type: 'GET_LISTA_EVENTI'}
}

const setListaEventi = lista => {
    return {type: 'SET_LISTA_EVENTI', payload: lista}
}