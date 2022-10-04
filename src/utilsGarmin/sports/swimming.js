import {workoutSportType,workoutStepType,
    stepDurationType,
    stepTargetType,
    stepIntensityType} from '../const'
import {convertToGarminBaseWorkout} from '../baseWorkout'
import {convertStringToSeconds} from '../utils'

const getSwimmingSteps = (workout) => {

    const {listaRighe} = workout

    
    let steps = []
    
    listaRighe.forEach((step, index) => {
        
        const {durationType,equipmentType,intensity,strokeType,tempo,ripetizioni,recupero,distanza = '',calorie = '',perceHr = ''} = step
        const rip = Number(ripetizioni) || 1

        const getStepDurationValue = (durationType) => {

            if(durationType === stepDurationType.TIME) return Number(convertStringToSeconds(tempo))
            else if(durationType === stepDurationType.DISTANCE) return Number(distanza)
            else if(durationType === stepDurationType.CALORIES) return Number(calorie)
            else if(durationType === stepDurationType.HR_LESS_THAN) return Number(perceHr)
            return null
        }

        for(let i = 0; i < rip; i++) {
            const step = {
                type: workoutStepType.WorkoutStep,
                stepOrder: i +1,
                intensity: intensity,
                description: '',
                durationType: durationType,
                durationValue: getStepDurationValue(durationType),
                /* durationValueType: (durationType === stepDurationType.HR_LESS_THAN) ? 'PERCENT' : null, */
                targetType: stepTargetType.OPEN,
                targetValue: null,
                equipmentType,
                strokeType

            }
            steps.push(step)
        }

        const seconds_recupero = convertStringToSeconds(recupero)

        if(seconds_recupero > 1) {

            steps.push({
                type: workoutStepType.WorkoutStep,
                stepOrder: 99,
                intensity: stepIntensityType.RECOVERY,
                description: '',
                durationType: stepDurationType.TIME,
                durationValue: seconds_recupero,
                /* durationValueType: null, */
                targetType: stepTargetType.OPEN,
                targetValue: null,
                equipmentType,
                strokeType

            })

        }


    })

    return steps.map((el,index) => { return {...el, stepOrder: index + 1}})
}

const convertToSwimmingWorkout = (workout) => {

    return {
        sport: workoutSportType.LAP_SWIMMING,
        ...convertToGarminBaseWorkout(workout),
        steps: getSwimmingSteps(workout),
        poolLength: 25,
        poolLengthUnit: 'METER'
    }
}

export {
    convertToSwimmingWorkout
}
