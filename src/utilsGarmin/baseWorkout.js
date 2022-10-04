import {workoutProvider} from './const'

const convertToGarminBaseWorkout = (workout) => {

    const {nomeFramework,noteAll = ''} = workout

    const description = noteAll

    const garminWorkout = {
        workoutName: nomeFramework || '',
        description,
        workoutProvider: workoutProvider,
        workoutSourceId: workoutProvider
    }

    return garminWorkout
}

export {convertToGarminBaseWorkout}
