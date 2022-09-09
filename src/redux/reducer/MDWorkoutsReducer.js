
function MDWorkoutsReducer(state = { lista: []}, action) {

    if(!action || !action.type || !action.payload === null || action.payload === undefined) return {...state};
  
    const {type, payload} = action;
  
    switch (type) {
  
      case 'SET_MD_WORKOUTS': {
        return {...state, lista: [...payload]}
      }
    
      default:
        return state;
    }
  }
  
  export default MDWorkoutsReducer
  