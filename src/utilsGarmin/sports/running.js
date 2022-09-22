import {workoutSportType,workoutStepType,stepIntensityType,stepDurationType,stepTargetType} from '../const'
import {convertToGarminBaseWorkout} from '../baseWorkout'

const getRunningSteps = (workout) => {

    const {listaRighe = []} = workout


    let steps = []
    let index = 0;
    listaRighe.forEach(step => {

        const {zona: ZONA,serie,ripetizioni,distanza,recupero,tempo,passoMin,passoMax,note,passoMedia, intensity,durationType,targetType} = step 
        const {zona,descrizione,min,max} = ZONA

        const rip = Number(ripetizioni) || 1
        const ser = Number(serie) || 1
        const description = note || ''

       
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

  
    return steps
}

const convertToRunningWorkout = (workout) => {

    return {
        sport: workoutSportType.RUNNING,
        ...convertToGarminBaseWorkout(workout),
        steps: getRunningSteps(workout)
    }
}

export {
    convertToRunningWorkout
}
