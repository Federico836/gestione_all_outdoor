
function pdfReducer(state = {lista: [{nome: 'pippo', data: '2021-09-29'}, {nome: 'pluto', data: '2021-09-23'}]}, action) {

  if(!action || !action.type || !action.payload) return state;

  const {type, payload} = action;

  switch (type) {

    case 'SET_LISTA_PDF': {
      return {...state, lista: [...payload]}
    }

    default:
        return state;
  }
}

export default pdfReducer;
