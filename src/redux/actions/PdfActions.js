
const setListaPdf = (lista) => {
  return {type: 'SET_LISTA_PDF', payload: lista}
}

const getListaPdf = () => {
  return {type: 'GET_LISTA_PDF'}
}

export default {
  setListaPdf,
  getListaPdf
}
