
function workoutsReducer(state = {lista: []}, action) {

  if(!action || !action.type || !action.payload) return state;

  const {type, payload} = action;

  switch (type) {

    case 'SET_LISTA_WORKOUTS': {
      return {...state, lista: [...state.lista, payload]}
    }

    default:
        return state;
  }
}

export default workoutsReducer;
