
function MDFrameworksReducer(state = { lista: []}, action) {

    if(!action || !action.type || !action.payload === null || action.payload === undefined) return {...state};
  
    const {type, payload} = action;
  
    switch (type) {
  
      case 'SET_MD_FRAMEWORKS': {
        return {...state, lista: [...payload]}
      }

      case 'SET_MD_FRAMEWORK_UPLOAD_STATUS': {

        const {id,status} = payload

        return {...state, lista: state.lista.map(el => {

          if(el.id === id) return {...el, status}

          return {...el}


        })}

      }

      case 'FIT_UPLOADED': {
        return {...state, lista: state.lista.map(el => {
  
          if(el.id === payload.id) {
            return {...el, uploaded: true}
          }
  
          return {...el}
  
  
        })}
      }
      case 'FIT_UPLOAD_ERROR': {
        return {...state, lista: state.lista.map(el => {
  
          if(el.id === payload.id) {
            return {...el, upload_error: payload.error}
          }
  
          return {...el}
  
  
        })}
      }
  
  
      case 'RESET_UPLOADED_FIT': {
        return {...state, lista: state.lista.map(el => { return {...el, uploaded: false}})}
      }
      case 'RESET_ERROR_UPLOADED_FIT': {
        return {...state, lista: state.lista.map(el => { return {...el, upload_error: false}})}
      }
    
      default:
        return state;
    }
  }
  
  export default MDFrameworksReducer
  