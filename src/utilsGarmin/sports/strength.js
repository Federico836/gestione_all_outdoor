import {workoutSportType} from '../const'
import {convertToGarminBaseWorkout} from '../baseWorkout'

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

export {
    convertToStrengthWorkout
}
