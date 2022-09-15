import physics from '../utils/physics'
import trans from '../utils/trans'
import appConst from '../const'
import { v4 as uuidv4 } from 'uuid';
import szTrans from '../../mdwifi/services/Transforms'


function calcStepByReference(
    step,
    params = {},
  ) {
    if (!step || !step.type) {
      return step;
    }
    const defParams = {
      wattReference: 200,
      rpmReference: 80,
      newtonReference: physics.calcNewton(200, 80),
      bpmReference: 80,
      previewMode: false,
    };
    const paramsTmp = {...defParams, ...params};
    const {bpmReference, previewMode} = paramsTmp;
    const wattReference = trans.isNumeric(paramsTmp.wattReference)
      ? parseInt(paramsTmp.wattReference)
      : paramsTmp.wattReference;
    const rpmReference = trans.isNumeric(paramsTmp.rpmReference)
      ? parseInt(paramsTmp.rpmReference)
      : paramsTmp.rpmReference;
    const newtonReference = trans.isNumeric(paramsTmp.newtonReference)
      ? Number(Number(paramsTmp.newtonReference).toFixed(2))
      : paramsTmp.rpmReference;
    let cStep = {...step};
    // if (step.wattPercent) {
    //   step.watt = Math.round(wattReference * (step.wattPercent/100))
    // }
    // if (step.rpmOffset) {
    //   step.rpm = Math.round(rpmReference + step.rpmOffset)
    // }
    // if (step.newtonOffset) {
    //   step.newton = newtonReference + step.newtonOffset
    // }
    switch (cStep.type) {

      case appConst.step.types.HIIT_SPRINT:
      case appConst.step.types.SPRINT:

        cStep.wattRequired = Number(calcolaWattSprint(wattReference,cStep.wattThreshold,cStep.wattReference,cStep.wattReferenceIncrement,cStep.wattThresholdIncrement).toFixed(0));
        cStep.wattUserThreshold = wattReference;
        
        if(cStep.recoverySubtype === 'AUTO_WATT' && Number(cStep.recoveryWattPercent)) {
          cStep.recoveryWatt = Math.max(
            0,
            Math.round(wattReference * (cStep.recoveryWattPercent / 100)),
          );
        }

        break;

      case appConst.step.types.AUTO_WATT:
        if (wattReference && cStep.wattPercent) {
          cStep.watt = Math.max(
            0,
            Math.round(wattReference * (cStep.wattPercent / 100)),
          );
        }
        if (rpmReference && trans.isNumeric(cStep.rpmOffset)) {
          cStep.rpm = Math.max(0, Math.round(rpmReference + cStep.rpmOffset));
        }
        if (cStep.watt && !isNaN(Number(cStep.rpm))) {
          cStep.newton = physics.calcNewton(cStep.watt, Number(cStep.rpm));
        }
        break;
      case appConst.step.types.TEST_JOULE:
      case appConst.step.types.TEST_PI:
        if (wattReference && cStep.progressionStartWattPercent) {
          cStep.progressionStartWatt = Math.max(
            0,
            Math.round(wattReference * (cStep.progressionStartWattPercent / 100)),
          );
        }
        if(cStep.type === appConst.step.types.TEST_JOULE) {
          cStep.progressionStepJouleThreshold = (cStep.progressionStartWatt * cStep.progressionStepWattTime);
          cStep.progressionStepWattThreshold = cStep.progressionStartWatt;
          let dataForSubSteps = {startWatt: cStep.progressionStartWatt,
            stepWattTime:cStep.progressionStepWattTime,
            stepJouleThreshold: (cStep.progressionStartWatt*cStep.progressionStepWattTime),
            stepWatt: cStep.progressionStepWatt,
            stepWattThreshold: cStep.progressionStartWatt
          }

          console.log(dataForSubSteps);

          cStep.subSteps = szTrans.buildSubstepsForTestJoule(dataForSubSteps,600)

        }
        break;
      case appConst.step.types.PROGRESSION_JOULE:
      case appConst.step.types.PROGRESSION_WATT:
        if (wattReference) {
          if (cStep.progressionStartWattPercent) {
            cStep.progressionStartWatt = Math.max(
              0,
              Math.round(
                wattReference * (cStep.progressionStartWattPercent / 100),
              ),
            );
          }
          if (cStep.progressionEndWattPercent) {
            cStep.progressionEndWatt = Math.max(
              0,
              Math.round(wattReference * (cStep.progressionEndWattPercent / 100)),
            );
          }
        }
        if (
          cStep.endless ||
          cStep.progressionStartWatt < cStep.progressionEndWatt
        ) {
          cStep.progressionStepWatt = Math.abs(cStep.progressionStepWatt);
        } else {
          if (cStep.progressionStepWatt > 0) {
            //cStep.progressionStepWatt *= -1;
          }
        }
        if (cStep.progressionStepWatt && cStep.progressionStepWattTime) {
          cStep.duration =
            cStep.progressionStepWattTime *
            (Math.ceil(
              Math.abs(
                (cStep.progressionEndWatt - cStep.progressionStartWatt) /
                  cStep.progressionStepWatt,
              ),
            ) +
              1);
        }
        if (rpmReference) {
          if (trans.isNumeric(cStep.progressionStartRpmOffset)) {
            cStep.progressionStartRpm = Math.max(
              0,
              rpmReference + cStep.progressionStartRpmOffset,
            );
            cStep.rpm = cStep.progressionStartRpm;
          }
          if (trans.isNumeric(cStep.progressionEndRpmOffset)) {
            cStep.progressionEndRpm = Math.max(
              0,
              rpmReference + cStep.progressionEndRpmOffset,
            );
          }
        }
        if (cStep.progressionEndRpm === undefined) {
          cStep.progressionStepRpm = cStep.progressionStepRpmTime = 0;
        } else if (cStep.progressionStartRpm > cStep.progressionEndRpm) {
          if (cStep.progressionStepRpm > 0) {
            //cStep.progressionStepRpm *= -1;
          }
        } else {
          if (cStep.progressionStepRpm < 0) {
            //cStep.progressionStepRpm *= -1;
          }
        }
        cStep.progressionStepRpmTime =
          !trans.isNumeric(cStep.progressionStartRpm) ||
          !trans.isNumeric(cStep.progressionEndRpm) ||
          !cStep.progressionStepRpm
            ? 0
            : Math.max(
                1,
                Math.floor(
                  cStep.duration /
                    (Math.ceil(
                      Math.abs(
                        (cStep.progressionEndRpm - cStep.progressionStartRpm) /
                          cStep.progressionStepRpm,
                      ),
                    ) +
                      1),
                ),
              );
          if(cStep.type === appConst.step.types.PROGRESSION_JOULE) {
            cStep.progressionStepJouleThreshold = (cStep.progressionStartWatt * cStep.progressionStepWattTime);
            let dataForSubSteps = {startWatt: cStep.progressionStartWatt,
              endWatt:cStep.progressionEndWatt,
              stepJouleThreshold: cStep.progressionStepJouleThreshold,
              stepWatt: cStep.progressionStepWatt}
            cStep.subSteps = szTrans.buildSubstepsForProgressionJoule(dataForSubSteps)
          }
        break;
        case appConst.step.types.PROGRESSION_RPM:
          if (rpmReference) {
              if (trans.isNumeric(cStep.progressionStartRpmOffset)) {
              cStep.progressionStartRpm = Math.max(
                  0,
                  rpmReference + cStep.progressionStartRpmOffset,
              );
              cStep.rpm = cStep.progressionStartRpm;
              }
              if (trans.isNumeric(cStep.progressionEndRpmOffset)) {
              cStep.progressionEndRpm = Math.max(
                  0,
                  rpmReference + cStep.progressionEndRpmOffset,
              );
              }
          }
          if (cStep.progressionEndRpm === undefined) {
              cStep.progressionStepRpm = cStep.progressionStepRpmTime = 0;
            } else if (cStep.progressionStartRpm > cStep.progressionEndRpm) {
              if (cStep.progressionStepRpm > 0) {
                //cStep.progressionStepRpm *= -1;
              }
            } else {
              if (cStep.progressionStepRpm < 0) {
                //cStep.progressionStepRpm *= -1;
              }
            }
          if (cStep.progressionStepRpm && cStep.progressionStepRpmTime) {
              cStep.duration =
              cStep.progressionStepRpmTime *
              (Math.ceil(
                  Math.abs(
                  (cStep.progressionEndRpm - cStep.progressionStartRpm) /
                      cStep.progressionStepRpm,
                  ),
              ) +
                  1);
          }
      break;
      case appConst.step.types.IDEAL_RHYTHMS:
        if (rpmReference && Number.isInteger(cStep.rpmReferenceOffset)) {
          cStep.rpmReference = Math.max(
            0,
            rpmReference + cStep.rpmReferenceOffset,
          );
          if (Number.isInteger(cStep.rpmOffset)) {
            cStep.rpm = rpmReference + cStep.rpmOffset;
            if (cStep.subSteps) {
              cStep.subSteps = cStep.subSteps.map(s => {
                if (Number.isInteger(s.rpmOffset)) {
                  s.rpm = rpmReference + s.rpmOffset;
                }
                return s;
              });
            }
          }
        }
        if (wattReference && rpmReference) {
          cStep.wattReference = Math.max(
            0,
            Math.round(
              (wattReference *
                (100 +
                  (((parseInt(cStep.rpm, 10) || 0) - cStep.rpmReference) /
                    cStep.rpmStepReference) *
                    cStep.wattPercentReference)) /
                100,
            ),
          );
        }
        break;
  
      case appConst.step.types.RACE:
        if (cStep.wattRace && wattReference) {
          cStep.watt = wattReference;
        }
        let duration = 0; // sec
        const subSteps = cStep.subSteps.map(subStep => {
          let rpm = subStep.rpm;
          if (rpmReference && trans.isNumeric(subStep.rpmOffset)) {
            rpm = String(rpmReference + (parseInt(subStep.rpmOffset, 10) || 0));
          }
          let speed = physics.calcSpeedByWattSlopeWeight(
            wattReference,
            subStep.slope,
            75, // default user weight: 75 kg
          ); // m/s,
          duration += Math.round((subStep.distance * 1000) / speed);
          let newton = subStep.newton;
          if (newtonReference) {
            newton = Math.max(0, newtonReference + subStep.newtonOffset);
          }
  
          return {
            ...subStep,
            newton,
            rpm,
          };
        });
        cStep.subSteps = subSteps;
        cStep.duration = duration;
        break;
  
      case appConst.step.types.AUTO_NEWTON:
        if (newtonReference && trans.isNumeric(cStep.newtonOffset)) {
          cStep.newton = Math.max(0, newtonReference + cStep.newtonOffset);
        }
        if (rpmReference && trans.isNumeric(cStep.rpmOffset)) {
          cStep.rpm = Math.max(0, Math.round(rpmReference + Number(cStep.rpmOffset)));
        }
        if (cStep.newton && !isNaN(Number(cStep.rpm))) {
          cStep.watt = physics.calcWattByRpmAndNewton(
            Number(cStep.rpm),
            cStep.newton,
          );
        }
        break;
      case appConst.step.types.PROGRESSION_NEWTON:
        if (newtonReference) {
          if (cStep.progressionStartNewtonOffset != null) {
            cStep.progressionStartNewton = Math.max(
              0,
              newtonReference + cStep.progressionStartNewtonOffset,
            );
          }
          if (cStep.progressionNewtonBlocked) {
            cStep.progressionStepNewton = cStep.progressionStepNewtonTime = 0;
          } else {
            if (cStep.progressionEndNewtonOffset != null) {
              cStep.progressionEndNewton = Math.max(
                0,
                newtonReference + cStep.progressionEndNewtonOffset,
              );
            }
            if (cStep.progressionStartNewton > cStep.progressionEndNewton) {
              if (cStep.progressionStepNewton > 0) {
                //cStep.progressionStepNewton *= -1;
              }
            } else {
              if (cStep.progressionStepNewton < 0) {
                //cStep.progressionStepNewton *= -1;
              }
            }
            if (cStep.progressionStepNewton && cStep.progressionStepNewtonTime) {
              cStep.duration =
                cStep.progressionStepNewtonTime *
                (Math.ceil(
                  Math.abs(
                    (cStep.progressionEndNewton - cStep.progressionStartNewton) /
                      cStep.progressionStepNewton,
                  ),
                ) +
                  1);
            }
          }
        }
        if (rpmReference) {
          if (trans.isNumeric(cStep.progressionStartRpmOffset)) {
            cStep.progressionStartRpm = Math.max(
              0,
              rpmReference + cStep.progressionStartRpmOffset,
            );
          }
          if (trans.isNumeric(cStep.progressionEndRpmOffset)) {
            cStep.progressionEndRpm = Math.max(
              0,
              rpmReference + cStep.progressionEndRpmOffset,
            );
          }
        }
        if (cStep.progressionEndRpm === undefined) {
          cStep.progressionStepRpm = cStep.progressionStepRpmTime = 0;
        } else if (cStep.progressionStartRpm > cStep.progressionEndRpm) {
          if (cStep.progressionStepRpm > 0) {
            //cStep.progressionStepRpm *= -1;
          }
        } else {
          if (cStep.progressionStepRpm < 0) {
            //cStep.progressionStepRpm *= -1;
          }
        }
        if (
          cStep.progressionNewtonBlocked &&
          cStep.progressionStepRpm &&
          cStep.progressionStepRpmTime
        ) {
          cStep.duration =
            cStep.progressionStepRpmTime *
            (Math.ceil(
              Math.abs(
                (cStep.progressionEndRpm - cStep.progressionStartRpm) /
                  cStep.progressionStepRpm,
              ),
            ) +
              1);
        }
        cStep.progressionStepRpmTime =
          !trans.isNumeric(cStep.progressionStartRpm) ||
          !trans.isNumeric(cStep.progressionEndRpm) ||
          !cStep.progressionStepRpm
            ? 0
            : Math.max(
                1,
                Math.floor(
                  cStep.duration /
                    (Math.ceil(
                      Math.abs(
                        (cStep.progressionEndRpm - cStep.progressionStartRpm) /
                          cStep.progressionStepRpm,
                      ),
                    ) +
                      1),
                ),
              );
        break;
        default:
          break;
    }
    if (!previewMode) {
      cStep.calculated = true;
    }
    return cStep;
  }
  


export const asStepsToSzSteps = (steps) => {

  return steps.map((step, index) => {
    return {...step.data, index: index + 1, uuid: step.uuid}
  })

}

export const szStepsToasSteps = (steps) => {
  return steps.map((step,index) => {
    return {uuid: step.uuid || uuidv4(), data: step}
  })
}

export default function calcola_workout(asSteps,wkOptions)
{
    const szSteps = asStepsToSzSteps(asSteps);
    
    let steps = [...szSteps];
    



    const previewObj = {
            wattReference: Number(wkOptions.thresholdWatt) || 0,
            rpmReference: Number(wkOptions.thresholdRpm) || 0,
            newtonReference: Number(wkOptions.thresholdNewton) || 0,
            bpmReference: null,
            previewMode: false,
          };
          
    for (let i = 0, len = steps.length; i < len; i++) {
        steps[i] = calcStepByReference(steps[i], previewObj);
        //console.log({step: steps[i]});
    }
  
    //return {...steps};
    const newAsSteps = szStepsToasSteps(steps);

    //console.log({sz: szSteps, calculated: steps, asNew: newAsSteps, asOld: asSteps});

    return newAsSteps;
}

export function calcola_dislivello(riga_dati) {

  let steps = riga_dati.split(';');
  let subSteps = steps[15].split('@');
  let dislivello = 0;

  if(steps[2] === "Slope") 
  {
    subSteps.forEach((el) => 
    { 
      let subStep = el.split('#'); 
      let d = (Number(subStep[0]) * (Number(subStep[1])))*10;  
      
      if(!isNaN(d) && d >= 0) 
      {
        dislivello+=d
      }

    });

  }
  else if(steps[2] === "Percorso") {

    subSteps.forEach((el) => 
    { 
      let subStep = el.split('#'); 
      let d = (Number(subStep[0]) * (Number(subStep[2])*2))*10;  
      
      if(!isNaN(d) && d >= 0) 
      {
        dislivello+=d
      }

    });

  }

  return dislivello;
  
}

export function calcolaWattSprint(soglia_utente,soglia_rif,watt_rif,incremento_watt,incremento_soglia) {


  return (soglia_utente <= soglia_rif) ? watt_rif : watt_rif + ((soglia_utente - soglia_rif) * (incremento_watt / incremento_soglia))

}