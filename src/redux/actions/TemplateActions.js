const getListaTemplate = (coach_id) => {
    return {type: 'GET_LISTA_TEMPLATE', payload: coach_id}
}

const setListaTemplate = lista => {
    return {type: 'SET_LISTA_TEMPLATE', payload: lista}
}

const addTemplate = template => {
    return {type: 'ADD_TEMPLATE', payload: template}
}

const replaceTemplate = template => {
    return {type: 'REPLACE_TEMPLATE', payload: template}
}

const eliminaTemplate = template => {
    return {type: 'ELIMINA_TEMPLATE', payload: template}
}

export { getListaTemplate, setListaTemplate, addTemplate, replaceTemplate, eliminaTemplate }