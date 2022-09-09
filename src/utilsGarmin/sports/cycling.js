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

const getCyclingSteps = (workout) => {

    const {listaRighe} = workout

    let steps = []

    listaRighe.forEach((step, index) => {

        const {ripetizioni,serie,durata,zona,note} = step

        const rip = Number(ripetizioni) || 1
        const ser = Number(serie) || 1
        const description = note || ''

        for(let i = 0; i < rip*ser; i++) {
            steps.push({
                type: workoutStepType.WorkoutStep,
                stepOrder: i +1,
                intensity: stepIntensityType.INTERVAL,
                description: (rip*ser > 1) ? description + ' #' + (i + 1) : description,
                durationType: stepDurationType.TIME,
                durationValue: Number(convertStringToSeconds(durata)),
                targetType: stepTargetType.HEART_RATE,
                targetValue: Number(zona),
                secondaryTargetType: stepTargetType.POWER,
                secondaryTargetValue: Number(zona)
            })
        }
    })

    return steps

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
