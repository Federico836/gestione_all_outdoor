
const setListaWorkouts = (lista) => {
  return {type: 'SET_LISTA_WORKOUTS', payload: lista}
}

const getListaWorkouts = () => {
  return {type: 'GET_LISTA_WORKOUTS'}
}

export default {
  setListaWorkouts,
  getListaWorkouts
}
