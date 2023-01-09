import {workoutSportType,workoutStepType,stepIntensityType,stepDurationType,stepTargetType} from '../const'
import {convertToGarminBaseWorkout} from '../baseWorkout'
import {convertStringToSeconds} from '../utils'

const getRunningSteps = (workout) => {

    const {listaRighe = []} = workout


    let steps = []
    let index = 0;
    listaRighe.forEach(step => {

        /* 
        
        calorie: ""
        distanza: ""
        durationType: "TIME"
        fc: ""
        intensity: "WARMUP"
        note: ""
        passoMax: 0
        passoMedia: 0
        passoMin: 0
        perce_fc: ""
        recupero: "10:00"
        ripetizioni: "1"
        serie: "1"
        targetType: "ZONE_HR"
        tempo: "10:00"
        zonaHR: "2"
        
        */

        /* const {zona: ZONA,serie,ripetizioni,distanza,recupero,tempo,passoMin,passoMax,note,passoMedia, intensity,durationType,targetType} = step 
        const {zona,descrizione,min,max} = ZONA */

        const {calorie,distanza,durationType,fc,intensity,note,passoMax,passoMin,perce_fc,recupero,ripetizioni,targetType,tempo,zonaHR} = step

        const getStepDurationValue = (durationType) => {

            if(durationType === stepDurationType.TIME) return Number(convertStringToSeconds(tempo))
            else if(durationType === stepDurationType.DISTANCE) return Number(distanza)
            else if(durationType === stepDurationType.CALORIES) return Number(calorie)
            else if(durationType === stepDurationType.HR_LESS_THAN) return Number(perce_fc)
            return null
        }

        const getStepTargetTypeAndValue = (targetType) => {

            if(targetType === 'PERCENT_HR') return {type: stepTargetType.HEART_RATE, value: Number(perce_fc), valueType: 'PERCENT'}
            if(targetType === 'PERCENT_WATT') return {type: stepTargetType.POWER, value: Number(perce_fc), valueType: 'PERCENT'}
            if(targetType === 'ZONE_HR') return {type: stepTargetType.HEART_RATE, value: Number(zonaHR),valueType: null}
            if(targetType === 'ZONE_W') return {type: stepTargetType.POWER, value: Number(zonaHR),valueType: null}

        }

        

        const rip = Number(ripetizioni) || 1
        const description = note || ''

       
        for(let i = 0; i < rip; i++) {


            const tav = getStepTargetTypeAndValue(targetType)

            steps.push({
                type: workoutStepType.WorkoutStep,
                stepOrder: index +1,
                intensity,
                description: description,
                durationType,
                durationValue: getStepDurationValue(durationType),
                durationValueType: (durationType === stepDurationType.HR_LESS_THAN) ? 'PERCENT' : null,
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
                description: description,
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
