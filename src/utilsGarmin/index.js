
import {convertToCyclingWorkout} from './sports/cycling'
import {convertToRunningWorkout} from './sports/running'
import {convertToSwimmingWorkout} from './sports/swimming'
import {convertToStrengthWorkout} from './sports/strength'
import {convertToIndoorCyclingWorkout} from './indoor/cycling'
import {workoutSportType} from './const'


const convertWorkout = (type,workout, indoor = false, ftp,hr) => {

    if(!type || !workout || (!indoor && !workout.listaRighe)) return null

    if(indoor) return convertToIndoorCyclingWorkout(workout,ftp,hr)

    switch (type) {
        case workoutSportType.CYCLING:
            return convertToCyclingWorkout(workout)
        case workoutSportType.LAP_SWIMMING:
            return convertToSwimmingWorkout(workout)
        case workoutSportType.RUNNING:
            return convertToRunningWorkout(workout)
        case workoutSportType.STRENGTH_TRAINING:
            return convertToStrengthWorkout(workout)
        default:
            return null
    }

}

export default convertWorkout






