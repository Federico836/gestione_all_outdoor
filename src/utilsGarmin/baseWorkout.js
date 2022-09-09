const {workoutProvider} = require('./const')

const convertToGarminBaseWorkout = (workout) => {

    const {nomeFramework,description = ''} = workout


    const garminWorkout = {
        workoutName: nomeFramework || '',
        description,
        workoutProvider: workoutProvider,
        workoutSourceId: workoutProvider
    }

    return garminWorkout
}

module.exports = {convertToGarminBaseWorkout}
