
//const payload = {lista_righe: [],tipo,id}
/* import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' */

function frameworksReducer(state = { lista: []}, action) {

  if(!action || !action.type || action.payload === null || action.payload === undefined) return {...state};

  const {type, payload} = action;

  switch (type) {

    case 'SET_LISTA_FRAMEWORKS': {
      return {...state, lista: [...payload]}
    }
    
    case 'ADD_FRAMEWORK': {
      //return {...state, lista: [...state.lista, payload]}
    }

    case 'REPLACE_FRAMEWORK': {
      /* const { id } = payload

      const listaFrameReplace = state.lista.map(frame => {
        if(frame.id===id) {
          return {...payload}
        }
        return {...frame}
      })
      return {...state, lista: listaFrameReplace} */
    }

    case 'FRAMEWORK_UPLOADED': {
      return {...state, lista: state.lista.map(el => {

        if(el.id === payload.id) {
          return {...el, uploaded: true}
        }

        return {...el}


      })}
    }


    case 'RESET_UPLOADED_FRAMEWORKS': {
      return {...state, lista: state.lista.map(el => { return {...el, uploaded: false}})}
    }
    
    default:
      return state;
  }
}

export default frameworksReducer
