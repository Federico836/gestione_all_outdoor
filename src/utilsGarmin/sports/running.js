const {
    workoutProvider,
    workoutSportType,
    workoutStepType,
    stepRepeatType,
    stepIntensityType,
    stepDurationType,
    stepTargetType,
    stepTargetValueType,
    stepStrokeType,
    stepEquipmentType,
    exerciseCategory,
    stepWeightDisplayUnit
} = require('../const')


const {convertToGarminBaseWorkout} = require('../baseWorkout')

const getRunningSteps = (workout) => {

    const {listaRighe = []} = workout


    let steps = []
    let index = 0;
    listaRighe.forEach(step => {

        const {zona: ZONA,serie: ser,ripetizioni: rip,distanza,recupero,tempo,passoMin,passoMax,note,passoMedia} = step 
        const {zona,descrizione,min,max} = ZONA
        for(let i = 0; i < rip*ser; i++) {
            steps.push({
                type: workoutStepType.WorkoutStep,
                stepOrder: index +1,
                intensity: Number(zona) > 2 ? stepIntensityType.INTERVAL :  stepIntensityType.WARMUP,
                description: (rip*ser > 1) ? descrizione + ' #' + (i + 1) : descrizione,
                durationType: stepDurationType.DISTANCE,
                durationValue: Number(distanza),
                targetType: stepTargetType.PACE,
                targetValueLow: Number(passoMin),
                targetValueHigh: Number(passoMax),
            })

            index++;

            if(recupero && recupero.length > 0) {
                steps.push({
                type: workoutStepType.WorkoutStep,
                stepOrder: i +1,
                intensity: stepIntensityType.RECOVERY,
                description: (rip*ser > 1) ? descrizione + ' #' + (i + 1) : descrizione,
                durationType: stepDurationType.TIME,
                durationValue: Number(recupero),
                targetType: stepTargetType.OPEN,
                targetValue: null,
                })
            }
        }


    });

    /* 
    
    {
    dbid: 200,
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
        idRiga: '3464504f-f354-4509-bff7-4c39f13deca4'
      },
      {
        zona: {
          zona: 3,
          min: null,
          max: null,
          media: null,
          descrizione: 'Fondo Medio'
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
        idRiga: 'a4aff654-62bc-4cab-91d5-4648df5350c7'
      },
      {
        zona: {
          zona: 6,
          min: null,
          max: null,
          media: null,
          descrizione: 'VO2MAX'
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
        idRiga: 'fa707d1f-899e-4c9f-8af6-80a48495562a'
      }
    ],
    tipo: 'Corsa',
    tipoPerSelect: 'corsa',
    dataDaFare: '',
    dataCreazione: 1659535921370,
    nomeFramework: 'prova corsa andrea',
    id: '51e6d401-7b32-46bf-ae33-8d5a29d2b0ef'
  }
    
    */



    return steps
}

const convertToRunningWorkout = (workout) => {

    return {
        sport: workoutSportType.RUNNING,
        ...convertToGarminBaseWorkout(workout),
        steps: getRunningSteps(workout)
    }
}

module.exports = {
    convertToRunningWorkout
}
