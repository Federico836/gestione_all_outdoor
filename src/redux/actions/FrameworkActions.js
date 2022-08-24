const setListaFrameworks = lista => {
  return {type: 'SET_LISTA_FRAMEWORKS', payload: lista}
}

const getListaFrameworks = (coach_id) => {
  return {type: 'GET_LISTA_FRAMEWORKS', payload: coach_id}
}

const addFramework = framework => {
  return {type: 'ADD_FRAMEWORK', payload: framework}
}

const replaceFramework = framework => {
  return {type: 'REPLACE_FRAMEWORK', payload: framework}
}

const deleteFramework = framework => {
  return {type: 'DELETE_FRAMEWORK', payload: framework}
}

export {
  setListaFrameworks,
  getListaFrameworks,
  addFramework,
  replaceFramework,
  deleteFramework
}

