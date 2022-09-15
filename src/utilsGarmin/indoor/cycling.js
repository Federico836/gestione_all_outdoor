const {
    workoutProvider,
    workoutSportType,
    workoutStepType,
    stepRepeatType,
    stepIntensityType,
    stepDurationType,
    stepTargetType,
    stepTargetValueType,
    stepDurationValueType,
} = require('../const')

const {convertToGarminBaseWorkout} = require('../baseWorkout')
const {convertStringToSeconds} = require('../utils')

let step_index = 0;

const steps = [
      {
        uuid: '6b08930d-7e69-453c-a9a5-4b090e7a2dba',
        selected: false,
        data: {
          brakePosition: 5,
          rpm: '85',
          description: '',
          duration: '30',
          uuid: '',
          type: 'BRAKE_POSITION'
        }
      },
      {
        uuid: '62b45687-1860-4a54-a6a5-48769c921838',
        selected: false,
        data: {
          watt: '',
          rpm: '',
          description: '',
          duration: '30',
          uuid: '',
          wattPercent: 55,
          rpmOffset: '',
          type: 'AUTO'
        }
      },
      {
        uuid: '1bf52f93-9a28-499c-9844-a3bd72cf5815',
        selected: false,
        data: {
          progressionStartWatt: '',
          progressionEndWatt: '',
          progressionStartRpm: '',
          progressionEndRpm: '',
          progressionStepWatt: 1,
          progressionStepRpm: '',
          progressionStepWattTime: 3,
          description: '',
          duration: 0,
          uuid: '',
          progressionStartWattPercent: 55,
          progressionEndWattPercent: 75,
          progressionStartRpmOffset: '',
          progressionEndRpmOffset: '',
          progressionStepRpmTime: 0,
          type: 'PROG. W'
        }
      },
      {
        uuid: '4f72ce1d-b1d2-484b-b5c9-16baebbbc06d',
        selected: false,
        data: {
          subSteps: [
            {
              index: 0,
              distance: 5,
              distanceOffset: 0,
              distanceDone: 0,
              slope: 12,
              alt: 595.7261030921533,
              altOffset: 0,
              x: 5,
              y: 595.7
            },
            {
              index: 1,
              distance: 1,
              distanceOffset: 5,
              distanceDone: 0,
              slope: 3,
              alt: 29.986509105671004,
              altOffset: 595.7261030921533,
              x: 6,
              y: 625.7
            }
          ],
          description: '',
          uuid: '',
          type: 'Slope'
        }
      }
    ]

const workout = {
    name: 'Prova',
    steps
}

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
        targetValue: Math.round((Number(brakePosition) / 30)*100),
    }

}

const stepAutoWatt = (step,i) => {
    
    const {watt,description = '',duration,wattPercent} = step

    return {
        type: workoutStepType.WorkoutStep,
        stepOrder: i +1,
        intensity: stepIntensityType.INTERVAL,
        description: description,
        durationType: stepDurationType.TIME,
        durationValue: Number(duration),
        targetType: stepTargetType.POWER,
        targetValue: (wattPercent && !isNaN(Number(wattPercent))) ? Number(wattPercent) : Number(watt),
        targetValueType: (wattPercent && !isNaN(Number(wattPercent))) ? stepTargetValueType.PERCENT : null
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
        targetValue: Number(slope),
    }

}

const getCyclingSteps = (workout) => {


    const steps = preparaSteps(workout.steps.map(el => {return {data: el}}))

    console.log({steps})

   return steps.map((step,index) => {

        const {data} = step
        const {type} = data

        switch (type) {
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
