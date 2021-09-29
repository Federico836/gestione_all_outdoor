
function pdfReducer(state = { nuoto: {passo_100: 0}, ciclismo: {ftp: 0, fc: 0}, corsa: {passo_1000: 0, fc: 0} }, action) {

  if(!action || !action.type || !action.payload) return state;

  const {type, payload} = action;

  switch (type) {

    case 'SET_NUOTO_PASSO_100': {
      return {...state, nuoto: {...state.nuoto, passo_100: payload}}
    }
    case 'SET_CICLISMO_FTP': {
      return {...state, ciclismo: {...state.ciclismo, ftp: payload}}
    }
    case 'SET_CICLISMO_FC': {
      return {...state, ciclismo: {...state.ciclismo, fc: payload}}
    }
    case 'SET_CORSA_FTP': {
      return {...state, corsa: {...state.corsa, passo_1000: payload}}
    }
    case 'SET_CORSA_FC': {
      return {...state, corsa: {...state.corsa, fc: payload}}
    }

    default:
        return state;
  }
}

export default pdfReducer;
