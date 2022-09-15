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

const getSwimmingSteps = (workout) => {


    

    let steps = []



    return steps
}

const convertToSwimmingWorkout = (workout) => {

    return {
        sport: workoutSportType.LAP_SWIMMING,
        ...convertToGarminBaseWorkout(workout),
        steps: getSwimmingSteps(workout)
    }
}

module.exports = {
    convertToSwimmingWorkout
}
