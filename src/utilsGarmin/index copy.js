
const {convertToCyclingWorkout} = require('./sports/cycling')
const {convertToRunningWorkout} = require('./sports/running')
const {convertToSwimmingWorkout} = require('./sports/swimming')
const {convertToStrengthWorkout} = require('./sports/strength')
const {workoutSportType} = require('./const')
const axios = require('axios')
const qs = require('qs')
const {create} = require('apisauce')

const api_workouts = create({
  baseURL: 'https://www.magneticdays.com/',
  headers: {
    'Accept'      : 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 30000
})

let auth_cookie  = null
const getCookie = () => { return axios.get('https://www.magneticdays.com/api/md/generate_auth_cookie/?username=andresole&password=Bossolina0Pulcino0')}


const convertWorkout = (type,workout) => {

    if(!type || !workout || !workout.listaRighe) return null

    switch (type) {
        case workoutSportType.CYCLING:
            return convertToCyclingWorkout(workout)
        case workoutSportType.LAP_SWIMMING:
            return convertToSwimmingWorkout(workout)
        case workoutSportType.RUNNING:
            return convertToRunningWorkout(workout)
        case workoutSportType.STRENGTH_TRAINING:
            return convertToStrengthWorkout(workout)
        default:
            return null
    }

}


const workoutCiclismo = {
    dbid: 123,
    listaRighe: [
      {
        zona: 1,
        percZona: '',
        serie: '',
        ripetizioni: '1',
        recupero: '0:00',
        rpm: '',
        note: 'warm up',
        durata: '20:00',
        wattPerc: 0,
        fcPerc: 0,
        wattMin: 0,
        wattMax: 0,
        fcMin: 0,
        fcMax: 0,
        idRiga: 'ad91dd5c-076e-47cf-aa0e-c96bfe1a3c9c'
      },
      {
        zona: 3,
        percZona: '90',
        serie: '',
        ripetizioni: '3',
        recupero: '1:00',
        rpm: '',
        note: 'activatiopnb',
        durata: '0:10',
        wattPerc: 0,
        fcPerc: 0,
        wattMin: 0,
        wattMax: 0,
        fcMin: 0,
        fcMax: 0,
        idRiga: 'a38acac2-161e-49ac-8ec1-9d7455a013d3'
      }
    ],
    tipo: 'Cycling',
    tipoPerSelect: 'ciclismo',
    dataDaFare: '',
    dataCreazione: 1658237762018,
    nomeFramework: 'cycling12356878',
    id: '0c547826-2a8e-43c2-a1a8-91b14f9350fd'
}



const workoutCorsa =      {
    dbid: 131,
    listaRighe: [
      {
        zona: {
          zona: 1,
          descrizione: 'Recupero Attivo',
          min: 0,
          max: 0
        },
        serie: '1',
        ripetizioni: '2',
        distanza: 10000,
        recupero: '10:00',
        tempo: '0:00',
        passoMin: 0,
        passoMax: 0,
        note: '',
        passoMedia: 0,
        idRiga: '8db6b57b-2a33-47ee-8b36-3de057c8d2c7'
      },
      {
        zona: {
          zona: 3,
          min: null,
          max: null,
          media: null,
          descrizione: 'Fondo Medio'
        },
        serie: '2',
        ripetizioni: '3',
        distanza: 20000,
        recupero: '10:00',
        tempo: '0:00',
        passoMin: 0,
        passoMax: 0,
        note: '',
        passoMedia: 0,
        idRiga: '1a365a38-1d9e-4bdc-9036-efb9d7a32072'
      }
    ],
    tipo: 'Corsa',
    tipoPerSelect: 'corsa',
    dataDaFare: '2022-07-20',
    dataCreazione: 1658407377136,
    nomeFramework: 'prova corsa',
    id: 'd3637c19-98bb-4781-b119-51b58a75a10a'
  }


const workout = convertWorkout(workoutSportType.CYCLING,workoutCiclismo)

console.log(workout)


/* getCookie().then(res => {

  const {data} = res
  const {cookie} = data
  auth_cookie = cookie

  const user_id = 824


  api_workouts.post('/garmin/endpoints/training.php',qs.stringify({user_id,workout: JSON.stringify(workout)})).then(response => {
     
    console.log({data: response.data})
    
})

  
  
}) */


/* axios.get('https://www.magneticdays.com/api/md/generate_auth_cookie/?username=andresole&password=Bossolina0Pulcino0').then(res => {

  const {data} = res
  const {cookie} = data

  axios.post('https://www.magneticdays.com/garmin/endpoints/training.php', {auth_cookie: cookie,user_id: 824,workout: JSON.stringify(workout)}).then(res => {
    console.log({res})
  })


}) */


