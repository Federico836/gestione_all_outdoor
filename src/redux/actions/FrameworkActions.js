
const setListaFrameworks = lista => {
  return {type: 'SET_LISTA_FRAMEWORKS', payload: lista}
}

const getListaFrameworks = () => {
  return {type: 'GET_LISTA_FRAMEWORKS'}
}

const addFramework = framework => {
  return {type: 'ADD_FRAMEWORK', payload: framework}
}

const replaceFramework = framework => {
  return {type: 'REPLACE_FRAMEWORK', payload: framework}
}

export {
  setListaFrameworks,
  getListaFrameworks,
  addFramework,
  replaceFramework
}

