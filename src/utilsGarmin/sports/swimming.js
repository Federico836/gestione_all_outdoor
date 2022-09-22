import {workoutSportType} from '../const'
import {convertToGarminBaseWorkout} from '../baseWorkout'

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

export {
    convertToSwimmingWorkout
}
