const {
    workoutProvider,
    workoutSportType,
    workoutStepType,
    stepRepeatType,
    stepIntensityType,
    stepDurationType,
    stepTargetType,
    stepTargetValueType,
} = require('../const')

const {convertToGarminBaseWorkout} = require('../baseWorkout')
const {convertStringToSeconds} = require('../utils')
const { BorderVertical } = require('@mui/icons-material')

const getCyclingSteps = (workout) => {

    const {listaRighe} = workout


    let steps = []

    listaRighe.forEach((step, index) => {

        const {ripetizioni,serie,durata,zona,note,intensity,durationType,targetType,wattPerc,fcPerc,distanza,calorie,percZona, rpm} = step

        const rip = Number(ripetizioni) || 1
        const ser = Number(serie) || 1
        const description = note || ''
        
        const getStepDurationValue = (durationType) => {

            if(durationType === stepDurationType.TIME) return Number(convertStringToSeconds(durata))
            else if(durationType === stepDurationType.DISTANCE) return Number(convertStringToSeconds(distanza))
            else if(durationType === stepDurationType.CALORIES) return Number(convertStringToSeconds(calorie))
            else if(durationType === stepDurationType.HR_LESS_THAN) return Number(convertStringToSeconds(percZona))
            return null
        }

        const getStepTargetTypeAndValue = (targetType) => {

            if(targetType === 'PERCENT_HR') return {type: stepTargetType.HEART_RATE, value: Number(percZona), valueType: 'PERCENT'}
            if(targetType === 'PERCENT_WATT') return {type: stepTargetType.POWER, value: Number(percZona), valueType: 'PERCENT'}
            if(targetType === 'ZONE_HR') return {type: stepTargetType.HEART_RATE, value: Number(zona),valueType: null}
            if(targetType === 'ZONE_W') return {type: stepTargetType.POWER, value: Number(zona),valueType: null}
            if(targetType === 'CADENCE') return {type: stepTargetType.CADENCE, value: Number(rpm),valueType: null}

        }

        for(let i = 0; i < rip*ser; i++) {

            const tav = getStepTargetTypeAndValue(targetType)

            const step = {
                type: workoutStepType.WorkoutStep,
                stepOrder: i +1,
                intensity: intensity,
                description: (rip*ser > 1) ? description + ' #' + (i + 1) : description,
                durationType: durationType,
                durationValue: getStepDurationValue(durationType),
                durationValueType: (durationType === stepDurationType.HR_LESS_THAN) ? 'PERCENT' : null,
                targetType: tav.type,
                targetValue: (targetType === 'ZONE_HR' || targetType === 'ZONE_W') ? tav.value : null,
                targetValueLow: (targetType === 'ZONE_HR' || targetType === 'ZONE_W') ? null : tav.value,
                targetValueHigh: (targetType === 'ZONE_HR' || targetType === 'ZONE_W') ? null : tav.value,
                targetValueType: tav.valueType
            }

        
            steps.push(step)
        }
    })

    return steps.map((el,index) => { return {...el, stepOrder: index + 1}})

}

const convertToCyclingWorkout = (workout) => {

    return {
        sport: workoutSportType.CYCLING,
        ...convertToGarminBaseWorkout(workout),
        steps: getCyclingSteps(workout)
    }
}

module.exports = {
    convertToCyclingWorkout
}
