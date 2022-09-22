import {
    workoutProvider,
    workoutSportType,
    workoutStepType,
    stepRepeatType,
    stepIntensityType,
    stepDurationType,
    stepTargetType,
    stepTargetValueType,
    stepDurationValueType,
} from '../const'

import {convertToGarminBaseWorkout} from '../baseWorkout'

const preparaSteps = (steps,ftp = (window.md.logged_user.ftp || 200)) => {

    let new_steps = []

    steps.forEach(el => {

        if(el.data && el.data.type === "Slope") {
            new_steps.push(...el.data.subSteps.map(ss => {return {data: {...ss, type: el.data.type}}}))
        }
        else if(el.data && el.data.type === "PROG. W") {

            const {progressionStartWatt: startWatt,
            progressionEndWatt: endWatt,
            progressionStepWatt,
            progressionStepWattTime,
            description = '',
            duration,
            progressionStartWattPercent,
            progressionEndWattPercent} = el.data

            let currWatt = 0

            const progressionStartWatt = null//(progressionStartWattPercent && Number(progressionStartWattPercent) > 0) ? (progressionStartWattPercent / 100)*ftp : startWatt
            const progressionEndWatt = null//(progressionEndWattPercent && Number(progressionEndWattPercent) > 0) ? (progressionEndWattPercent / 100)*ftp : endWatt


            if(progressionStartWatt && progressionEndWatt) {

                const wDiff = Number(progressionStartWatt) - Number(progressionEndWatt)

                if(wDiff === 0) {
                    new_steps.push({
                        data: {
                            watt: Number(progressionStartWatt),
                            percent: Number(Math.round((progressionStartWatt/ftp)*100)),
                            description: description,
                            duration: Number(progressionStepWattTime),
                            type: 'AUTO'
                          }
                    })
                } else if(wDiff < 0) {

                    // progressione

                    while (currWatt <= Number(progressionEndWatt)) {

                        currWatt += Number(progressionStepWatt)
                        
                        new_steps.push({
                            data: {
                                watt: Number(currWatt),
                                percent: Number(Math.round((currWatt/ftp)*100)),
                                description: description,
                                duration: Number(progressionStepWattTime),
                                type: 'AUTO'
                              }
                        })

                        
                    }

                } else {
                    while (currWatt >= Number(progressionEndWatt)) {

                        currWatt -= Number(progressionStepWatt)
                        
                        new_steps.push({
                            data: {
                                watt: Number(currWatt),
                                percent: Number(Math.round((currWatt/ftp)*100)),
                                description: description,
                                duration: Number(progressionStepWattTime),
                                type: 'AUTO'
                              }
                        })

                        
                    }

                }


            }
            else {
                new_steps.push({
                    data: {
                        wattPercent: Number(progressionStartWattPercent),
                        description: description,
                        duration: Number(progressionStepWattTime),
                        type: 'AUTO'
                      }
                })

                new_steps.push({
                    data: {
                        wattPercent: Number(progressionEndWattPercent),
                        description: description,
                        duration: Number(progressionStepWattTime),
                        type: 'AUTO'
                      }
                })
            }
            



        }
        else {
            new_steps.push(el)
        }
        
    });


    return new_steps
}

const stepBrakePosition = (step,i) => {
    const {brakePosition,description = '',duration} = step

    //console.log(step)

    return {
        type: workoutStepType.WorkoutStep,
        stepOrder: i +1,
        intensity: stepIntensityType.INTERVAL,
        description: description,
        durationType: stepDurationType.TIME,
        durationValue: Number(duration),
        targetType: stepTargetType.RESISTANCE,
        targetValue: 9,
    }

}


const stepBpm = (step,i) => {

    const {description = '', duration, bpmPercent, zona} = step

    if(bpmPercent && !isNaN(Number(bpmPercent)) && Number(bpmPercent) > 0) {
        return {
            type: workoutStepType.WorkoutStep,
            stepOrder: i +1,
            intensity: stepIntensityType.INTERVAL,
            description: description,
            durationType: stepDurationType.TIME,
            durationValue: Number(duration),
            targetType: stepTargetType.HEART_RATE,
            targetValueLow: Number(bpmPercent) - 1,
            targetValueHigh: Number(bpmPercent) + 1,
            targetValueType: stepTargetValueType.PERCENT
        }
    }

    return {
        type: workoutStepType.WorkoutStep,
        stepOrder: i +1,
        intensity: stepIntensityType.INTERVAL,
        description: description,
        durationType: stepDurationType.TIME,
        durationValue: Number(duration),
        targetType: stepTargetType.HEART_RATE,
        targetValue: (zona) ? Number(zona) : 1
        /* targetValueType: (wattPercent && !isNaN(Number(wattPercent))) ? stepTargetValueType.PERCENT : null */
    }


}

const stepAutoWatt = (step,i) => {
    
    const {description = '',duration,wattPercent, zona} = step


    if(wattPercent && !isNaN(Number(wattPercent)) && Number(wattPercent) > 0) {
        return {
            type: workoutStepType.WorkoutStep,
            stepOrder: i +1,
            intensity: stepIntensityType.INTERVAL,
            description: description,
            durationType: stepDurationType.TIME,
            durationValue: Number(duration),
            targetType: stepTargetType.POWER,
            targetValueLow: Number(wattPercent) - 1,
            targetValueHigh: Number(wattPercent) + 1,
            targetValueType: stepTargetValueType.PERCENT
            /* targetValueType: (wattPercent && !isNaN(Number(wattPercent))) ? stepTargetValueType.PERCENT : null */
        }
    }

    return {
        type: workoutStepType.WorkoutStep,
        stepOrder: i +1,
        intensity: stepIntensityType.INTERVAL,
        description: description,
        durationType: stepDurationType.TIME,
        durationValue: Number(duration),
        targetType: stepTargetType.POWER,
        targetValue: (zona) ? Number(zona) : 1
    }

}
const stepProgWatt = (step,i) => {

}

const stepSlope = (step,i) => {

    const {distance,slope, description = ''} = step

    return {
        type: workoutStepType.WorkoutStep,
        stepOrder: i +1,
        intensity: stepIntensityType.INTERVAL,
        description: description,
        durationType: stepDurationType.DISTANCE,
        durationValue: Number(distance),
        durationValueType: stepDurationValueType.KILOMETER,
        targetType: stepTargetType.GRADE,
        targetValue: 8,
        
    }

}

const getCyclingSteps = (workout) => {


    const steps = preparaSteps(workout.steps.map(el => {return {data: el}}))

    console.log({steps})

   return steps.map((step,index) => {

        const {data} = step
        const {type} = data

        switch (type) {
            case 'BPM': 
                return stepBpm(data,index)
            case 'BRAKE_POSITION':
                return stepBrakePosition(data,index)               
            case 'AUTO':
                return stepAutoWatt(data,index)
            case 'Slope':
                return stepSlope(data,index)
        
            default:
                break;
        }

    })
}

const convertToIndoorCyclingWorkout = (workout) => {


    return {
        sport: workoutSportType.CYCLING,
        ...convertToGarminBaseWorkout({nomeFramework: workout.nome}),
        steps: getCyclingSteps(workout)
    }
}

export {convertToIndoorCyclingWorkout}
