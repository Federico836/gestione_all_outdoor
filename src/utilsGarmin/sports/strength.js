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

const getSteps = (workout) => {

    let steps = []



    return steps
}

const convertToStrengthWorkout = (workout) => {

    return {
        sport: workoutSportType.STRENGTH_TRAINING,
        ...convertToGarminBaseWorkout(workout),
        steps: getSteps(workout)
    }
}

module.exports = {
    convertToStrengthWorkout
}
