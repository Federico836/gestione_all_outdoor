/**
 * @format
 * @flow
 */

import type {
  Workout,
  WorkoutStep,
  Heart,
  TestPiDataType,
  WorkoutStepTestPI,
  TestPsDataType,
  WorkoutStepTestPS,
  WorkoutSubStepTestNM,
  WorkoutStepTestNM,
  WorkoutStepCronoNM,
  WorkoutSubStepIdealRhythms,
  WorkoutStepIdealRhythms,
  WorkoutSubStepRace,
  WorkoutStepRace,
  WorkoutStepBrakePosition,
  WorkoutBaseStep,
  WorkoutStepUnknown,
  WorkoutStepAutoWatt,
  WorkoutStepProgWatt,
  WorkoutStepZoneHead,
  WorkoutStepZone,
  WorkoutStepProgRpm,
  WorkoutStepAutoNM,
  WorkoutStepBPM,
  WorkoutStepProgNewton,
  WorkoutStepSustainableWatt,
  WorkoutStepSprint,
  WorkoutStepStop,
  WorkoutStepPowerPeakTest,
  WorkoutStepHIITSprint,
  WorkoutStepHIITSubRecovery,
  WorkoutStepRoute,
  WorkoutSubStepRoute,
  WorkoutStepRouteNewton,
  WorkoutSubStepRouteNewton,
  WorkoutStepSlope,
  WorkoutSubStepSlope,
  WorkoutStepPureStrength,
} from '../types/AppTypeDefinition';
import trans from '../utils/trans';
import appConst from '../const';
import avgConst from '../const/avg';
// import { i18n } from '../utils';
import { v4 } from 'uuid';

export const transformWorkoutStepToCsv = (wks: WorkoutStep): string => {
  throw 'IMPLEMENT IT'; // TODO:
};

const getAvgByString = (str: string): {mode: number, points: number} => {
  switch (str.toLowerCase()) {
    case 'no':
      return {mode: avgConst.modes.NO, points: avgConst.modePoints.NO};
    case 'min':
      return {mode: avgConst.modes.MIN, points: avgConst.modePoints.MIN};
    case 'med':
      return {mode: avgConst.modes.MED, points: avgConst.modePoints.MED};
    case 'max':
      return {mode: avgConst.modes.MAX, points: avgConst.modePoints.MAX};
    default:
      return {mode: avgConst.modes.MED, points: avgConst.modePoints.MED};
  }
};

// 'Nr.;Rapporto;Freno;Tempo (sec);Watt;Rpm;Bpm;MediaValori;Descrizione;perceWatt;perceRpm;NewtonMetro;'
// + 'perceN;Lavoro;tipoProg;p2;p3;p4;p5;p6;p7;p8;p9;p10;p11;p12;p13;p14;p15;p16;p17;p18;p19;p20'
const transformToStepBase = (stepArray: Array<string>): WorkoutBaseStep => {
  const tmpOffset = stepArray[appConst.step.csvIndex.OFFSET_SETTINGS]
    ? stepArray[appConst.step.csvIndex.OFFSET_SETTINGS]
    : stepArray[appConst.step.csvIndex.OFFSET_SETTINGS_OLD]
    ? stepArray[appConst.step.csvIndex.OFFSET_SETTINGS_OLD]
    : 'False:0';
  const tmpArr = tmpOffset.split(':');
  const offsetTableUse =
    tmpArr[0] && tmpArr[0].toLowerCase() === 'true' ? true : false;
  const offsetTableType =
    offsetTableUse === false
      ? 0
      : tmpArr[1] && tmpArr[1].length && trans.isNumeric(tmpArr[1])
      ? Number(tmpArr[1])
      : 0;
  const avgData = getAvgByString(stepArray[appConst.step.csvIndex.AVERAGE]);

  const wattTmp = stepArray[appConst.step.csvIndex.WATT];
  const watt = trans.isNumeric(wattTmp) ? Number(wattTmp) : wattTmp;
  const wattPercTmp = stepArray[appConst.step.csvIndex.WATT_PERCENT];
  const wattPercent = trans.isNumeric(wattPercTmp) ? Number(wattPercTmp) : null;

  const rpmTmp = stepArray[appConst.step.csvIndex.RPM];
  const rpm = trans.isNumeric(rpmTmp) ? Number(rpmTmp) : rpmTmp;
  const rpmOffsetTmp = stepArray[appConst.step.csvIndex.RPM_OFFSET];
  const rpmOffset = trans.isNumeric(rpmOffsetTmp) ? Number(rpmOffsetTmp) : null;

  const newtonTmp = stepArray[appConst.step.csvIndex.NEWTON];
  const newton = trans.isNumeric(newtonTmp) ? Number(newtonTmp) : newtonTmp;
  const newtonOffsetTmp = stepArray[appConst.step.csvIndex.NEWTON_OFFSET];
  const newtonOffset = trans.isNumeric(newtonOffsetTmp)
    ? Number(newtonOffsetTmp)
    : null;

  const isMaster =
    stepArray[appConst.step.csvIndex.MASTER] &&
    stepArray[appConst.step.csvIndex.MASTER].toLowerCase() === 'true'
      ? true
      : false;
  const isSlave =
    stepArray[appConst.step.csvIndex.SLAVE] &&
    stepArray[appConst.step.csvIndex.SLAVE].toLowerCase() === 'true'
      ? true
      : false;
  let masterSlaveOpt: {
    isMaster: boolean,
    isSlave: boolean,
    calculated?: boolean,
  } = {
    isMaster,
    isSlave,
  };
  if (isSlave) {
    masterSlaveOpt.calculated = false;
  }
  const isSmartRecovery =
    stepArray[appConst.step.csvIndex.SMART_RECOVERY] &&
    stepArray[appConst.step.csvIndex.SMART_RECOVERY].toLowerCase() === 'true'
      ? true
      : false;
  const smartRecoveryBpmPerc = !isSmartRecovery
    ? 0
    : trans.isNumeric(
        stepArray[appConst.step.csvIndex.SMART_RECOVERY_BPM_PERCENT],
      )
    ? Number(stepArray[appConst.step.csvIndex.SMART_RECOVERY_BPM_PERCENT])
    : 0;
  let descriptions = {};
  if (stepArray[appConst.step.csvIndex.DESCRIPTION_IT]) {
    descriptions.it = stepArray[appConst.step.csvIndex.DESCRIPTION_IT];
  }
  if (stepArray[appConst.step.csvIndex.DESCRIPTION_EN]) {
    descriptions.en = stepArray[appConst.step.csvIndex.DESCRIPTION_EN];
  }

  return {
    index: Number(stepArray[appConst.step.csvIndex.INDEX]),
    rapporto: stepArray[appConst.step.csvIndex.RAPPORTO],
    duration: Number(stepArray[appConst.step.csvIndex.DURATION]),
    description: stepArray[appConst.step.csvIndex.DESCRIPTION],
    descriptions: descriptions,
    watt,
    wattPercent,
    rpm,
    rpmOffset,
    newton,
    newtonOffset,
    offsetTableUse,
    offsetTableType,
    csvString: stepArray.join(';'),
    avgMode: avgData.mode,
    avgPoints: avgData.points,
    ...masterSlaveOpt,
    isSmartRecovery,
    smartRecoveryBpmPerc,
  };
  /*
  index: number,
  rapporto: string,
  duration: number,
  watt: number | string,
  rpm: number | string,
  description: string,
  offsetTableUse: boolean,
  offsetTableType: number,
  csvString: string,
  avgMode: number,
  avgPoints: number,
  */
};
const transformToUnknownStep = (stepString: string): WorkoutStepUnknown => {
  return {
    type: appConst.step.types.UNKNOWN,
    csvString: stepString,
    index: Number(stepString.split(';')[appConst.step.csvIndex.INDEX]),
  };
};

const transformToStepStop = (stepArray: Array<string>): WorkoutStepStop => {
  let baseStep = transformToStepBase(stepArray);
  const rpm = baseStep.rpm ? baseStep.rpm : 0;
  const brakePosition = 5;
  return {
    ...baseStep,
    type: appConst.step.types.STOP,
    activityType: appConst.step.activityTypes.STOP,
    brakePosition,
    rpm,
    offsetAllowed: true,
  };
};

const transformToStepBrakePosition = (
  stepArray: Array<string>,
): WorkoutStepBrakePosition => {
  return {
    ...transformToStepBase(stepArray),
    type: appConst.step.types.BRAKE_POSITION,
    activityType: appConst.step.activityTypes.BRAKE_POSITION,
    brakePosition: parseInt(
      stepArray[appConst.step.csvIndex.BRAKE_POSITION],
      10,
    ),
    offsetAllowed: true,
  };
};
const transformToStepAutoWatt = (
  stepArray: Array<string>,
): ?WorkoutStepAutoWatt => {
  // const watt = parseInt(stepArray[appConst.step.csvIndex.WATT], 10) || 0
  // if (watt === 0) { return null } // HERE workaround to skip empty steps that for now saved as AUTO_WATT with watt 0
  let baseStep = transformToStepBase(stepArray);
  if (baseStep.duration === 0) {
    return null;
  }
  const watt: number =
    parseInt(stepArray[appConst.step.csvIndex.WATT], 10) || 0;
  return {
    ...baseStep,
    type: appConst.step.types.AUTO_WATT,
    activityType: appConst.step.activityTypes.AUTO_WATT,
    watt: watt,
    offsetAllowed: !baseStep.offsetTableUse,
  };
};
const transformToStepZone = (
  stepArray: Array<string>,
): WorkoutStepZone | WorkoutStepZoneHead => {
  if (stepArray[14] === 'T') {
    return {
      type: appConst.step.types.ZONE_HEAD,
      csvString: stepArray.join(';'),
      index: Number(stepArray[appConst.step.csvIndex.INDEX]),
    };
  }
  const watt = parseInt(stepArray[appConst.step.csvIndex.WATT], 10) || 0;
  const step: WorkoutStepZone = {
    ...transformToStepBase(stepArray),
    type: appConst.step.types.ZONE,
    activityType: appConst.step.activityTypes.ZONE,
    watt,
  };
  return step;
};
const transformToStepProgressionWatt = (
  stepArray: Array<string>,
): ?WorkoutStepProgWatt => {
  if (stepArray.length < 21) {
    return null;
  }
  const stepBase = transformToStepBase(stepArray);
  const startWatt = trans.isNumeric(stepArray[15]) ? Number(stepArray[15]) : 0;
  const startWattPercent = trans.isNumeric(stepArray[17])
    ? Number(stepArray[17])
    : undefined;
  const endWatt = trans.isNumeric(stepArray[16]) ? Number(stepArray[16]) : 0;
  const endWattPercent = trans.isNumeric(stepArray[18])
    ? Number(stepArray[18])
    : undefined;
  let stepWatt = trans.isNumeric(stepArray[19]) ? Math.abs(Number(stepArray[19])) : 0;
  const endless = trans.isNumeric(stepArray[41]) && Number(stepArray[41]) === 1;
  if (endless) {
    stepWatt = Math.abs(stepWatt);
  } else if (startWatt > endWatt) {
    // ANDREA ERR -1 MENO UNO  stepWatt *= -1;
  }
  const stepWattTime = trans.isNumeric(stepArray[20])
    ? Number(stepArray[20])
    : 0;

  const rpmStart = trans.isNumeric(stepArray[24])
    ? Number(stepArray[24])
    : stepArray[24];
  const rpmStartOffset = trans.isNumeric(stepArray[26])
    ? Number(stepArray[26])
    : undefined;
  const rpmEnd = trans.isNumeric(stepArray[25])
    ? Number(stepArray[25])
    : undefined;
  const rpmEndOffset = trans.isNumeric(stepArray[27])
    ? Number(stepArray[27])
    : undefined;
  let rpmStep = trans.isNumeric(stepArray[28]) ? Number(stepArray[28]) : 0;
  if (
    trans.isNumeric(rpmStart) &&
    trans.isNumeric(rpmEnd) &&
    rpmStart > rpmEnd
  ) {
    // ANDREA ERR -1 MENO UNO rpmStep *= -1;
  }

  const rpmStepTime =
    !trans.isNumeric(rpmStart) || !trans.isNumeric(rpmEnd) || !rpmStep
      ? 0
      : Math.max(
          1,
          Math.floor(
            stepBase.duration /
              (Math.ceil(Math.abs((rpmEnd - rpmStart) / rpmStep)) + 1),
          ),
        );
  // parseInt(stepBase.duration / (Math.abs((rpmStart - rpmEnd)/rpmStep)) ) || 1

  return {
    ...stepBase,
    type: appConst.step.types.PROGRESSION_WATT,
    activityType: appConst.step.activityTypes.PROGRESSION_WATT,
    endless,
    progressionStartWatt: startWatt,
    progressionStartWattPercent: startWattPercent,
    progressionEndWatt: endWatt,
    progressionEndWattPercent: endWattPercent,
    progressionStepWatt: stepWatt,
    progressionStepWattTime: stepWattTime,
    progressionStartRpm: rpmStart,
    progressionStartRpmOffset: rpmStartOffset,
    progressionEndRpm: rpmEnd,
    progressionEndRpmOffset: rpmEndOffset,
    progressionStepRpm: rpmStep,
    progressionStepRpmTime: rpmStepTime,
  };
};
const transformToStepProgressionRPM = (
  stepArray: Array<string>,
): ?WorkoutStepProgRpm => {
  if (stepArray.length < 27) {
    return null;
  }
  const startRpm = trans.isNumeric(stepArray[15]) ? Number(stepArray[15]) : 0;
  const endRpm = trans.isNumeric(stepArray[16]) ? Number(stepArray[16]) : 0;
  let stepRpm = trans.isNumeric(stepArray[20]) ? Number(stepArray[20]) : 1;
  if (startRpm > endRpm) {
    // ANDREA ERR -1 MENO UNO stepRpm *= -1; 
  }
  return {
    ...transformToStepBase(stepArray),
    type: appConst.step.types.PROGRESSION_RPM,
    activityType: appConst.step.activityTypes.PROGRESSION_RPM,
    progressionStartRpm: startRpm,
    progressionEndRpm: endRpm,
    progressionStepRpm: stepRpm,
    progressionStepRpmTime: trans.isNumeric(stepArray[21])
      ? Number(stepArray[21])
      : 0,
    brakePosition: trans.isNumeric(stepArray[26]) ? Number(stepArray[26]) : 0,
  };
};
const transformToStepAutoNM = (
  stepArray: Array<string>,
): ?WorkoutStepAutoNM => {
  if (stepArray.length < 11) {
    return null;
  }
  let baseStep = transformToStepBase(stepArray);
  return {
    ...baseStep,
    type: appConst.step.types.AUTO_NEWTON,
    activityType: appConst.step.activityTypes.AUTO_NEWTON,
    // newton: trans.isNumeric(stepArray[11]) ? Number(stepArray[11]) : 0,
    offsetAllowed: !baseStep.offsetTableUse,
  };
};
const transformToStepProgressionNewton = (
  stepArray: Array<string>,
): ?WorkoutStepProgNewton => {
  if (stepArray.length < 31) {
    return null;
  }
  const stepBase = transformToStepBase(stepArray);
  const startNewton = trans.isNumeric(stepArray[15])
    ? Number(stepArray[15])
    : 0;
  const startOffsetNewton = trans.isNumeric(stepArray[17])
    ? Number(stepArray[17])
    : undefined;
  const endNewton = trans.isNumeric(stepArray[16]) ? Number(stepArray[16]) : 0;
  const endOffsetNewton = trans.isNumeric(stepArray[18])
    ? Number(stepArray[18])
    : undefined;
  let stepNewton = trans.isNumeric(stepArray[19]) ? Math.abs(Number(stepArray[19])) : 0;
  const endless = trans.isNumeric(stepArray[41]) && Number(stepArray[41]) === 1;
  if (endless) {
    stepNewton = Math.abs(stepNewton);
  } else if (startNewton > endNewton) {
    // ANDREA ERR -1 MENO UNO stepNewton *= -1; 
  }
  const stepNewtonTime = trans.isNumeric(stepArray[20])
    ? Number(stepArray[20])
    : 0;
  const newtonBlocked = stepArray[22].toLowerCase() === 'true' ? true : false;

  const rpmStart = trans.isNumeric(stepArray[25])
    ? Number(stepArray[25])
    : stepArray[25];
  const rpmStartOffset = trans.isNumeric(stepArray[27])
    ? Number(stepArray[27])
    : undefined;
  const rpmEnd = trans.isNumeric(stepArray[26])
    ? Number(stepArray[26])
    : undefined;
  const rpmEndOffset = trans.isNumeric(stepArray[28])
    ? Number(stepArray[28])
    : undefined;
  let rpmStep = trans.isNumeric(stepArray[29]) ? Math.abs(Number(stepArray[29])) : 0;
  if (
    trans.isNumeric(rpmStart) &&
    trans.isNumeric(rpmEnd) &&
    rpmStart > rpmEnd
  ) {
    // ANDREA ERR -1 MENO UNO rpmStep *= -1;
  }
  // const rpmStepTime = trans.isNumeric(stepArray[30]) ? Number(stepArray[30]) : 0
  const rpmStepTime =
    !trans.isNumeric(rpmStart) || !trans.isNumeric(rpmEnd) || !rpmStep
      ? trans.isNumeric(stepArray[30])
        ? Number(stepArray[30])
        : 0
      : Math.max(
          1,
          Math.floor(
            stepBase.duration /
              (Math.ceil(Math.abs((rpmEnd - rpmStart) / rpmStep)) + 1),
          ),
        );
  return {
    ...stepBase,
    type: appConst.step.types.PROGRESSION_NEWTON,
    activityType: appConst.step.activityTypes.PROGRESSION_NEWTON,
    endless,
    progressionNewtonBlocked: newtonBlocked,
    progressionStartNewton: startNewton,
    progressionStartNewtonOffset: startOffsetNewton,
    progressionEndNewton: endNewton,
    progressionEndNewtonOffset: endOffsetNewton,
    progressionStepNewton: stepNewton,
    progressionStepNewtonTime: stepNewtonTime,
    progressionStartRpm: rpmStart,
    progressionStartRpmOffset: rpmStartOffset,
    progressionEndRpm: rpmEnd,
    progressionEndRpmOffset: rpmEndOffset,
    progressionStepRpm: rpmStep,
    progressionStepRpmTime: rpmStepTime,
  };
};
const transformToStepProgressionJoule = (stepArray: Array<string>): ?Object => {
  if (stepArray.length < 22) {
    return null;
  }
  const stepBase = transformToStepBase(stepArray);
  const startWatt = trans.isNumeric(stepArray[15]) ? Number(stepArray[15]) : 0;
  const startWattPercent = trans.isNumeric(stepArray[17])
    ? Number(stepArray[17])
    : undefined;
  const endWatt = trans.isNumeric(stepArray[16]) ? Number(stepArray[16]) : 0;
  const endWattPercent = trans.isNumeric(stepArray[18])
    ? Number(stepArray[18])
    : undefined;
  const stepJouleThreshold = trans.isNumeric(stepArray[19])
    ? Number(stepArray[19])
    : 0;
  let stepWatt = trans.isNumeric(stepArray[20]) ? Number(stepArray[20]) : 0;
  const endless = stepArray[29] && stepArray[29].toLowerCase() === 'true';
  if (endless) {
    stepWatt = Math.abs(stepWatt);
  } else if (startWatt > endWatt) {
    // ANDREA ERR -1 MENO UNO stepWatt *= -1;
  }
  const stepWattTime = trans.isNumeric(stepArray[21])
    ? Number(stepArray[21])
    : 0;

  let subSteps = [];
  const ticksInSec = trans.secToTicks(1);
  if (endless) {
    subSteps = buildSubstepsForEndlessProgressionJoule(
      {startWatt, stepJouleThreshold, stepWatt},
      600,
    );
  } else {
    subSteps = buildSubstepsForProgressionJoule({
      startWatt,
      endWatt,
      stepJouleThreshold,
      stepWatt,
    });
  }

  // const duration = trans.ticksToSec(ticks)
  const duration = subSteps
    .map(step => step.duration)
    .reduce((prev, curr) => prev + curr);

  const rpmStart = trans.isNumeric(stepArray[23])
    ? Number(stepArray[23])
    : stepArray[23];
  const rpmStartOffset = trans.isNumeric(stepArray[25])
    ? Number(stepArray[25])
    : undefined;
  const rpmEnd = trans.isNumeric(stepArray[24])
    ? Number(stepArray[24])
    : undefined;
  const rpmEndOffset = trans.isNumeric(stepArray[26])
    ? Number(stepArray[26])
    : undefined;
  let rpmStep = trans.isNumeric(stepArray[27]) ? Number(stepArray[27]) : 0;
  if (
    trans.isNumeric(rpmStart) &&
    trans.isNumeric(rpmEnd) &&
    rpmStart > rpmEnd
  ) {
    // ANDREA ERR -1 MENO UNO  rpmStep *= -1;
  }

  const rpmStepTime =
    !trans.isNumeric(rpmStart) || !trans.isNumeric(rpmEnd) || !rpmStep
      ? 0
      : Math.max(
          trans.ticksToSec(1),
          Math.floor(
            (duration * ticksInSec) /
              (Math.ceil(Math.abs((rpmEnd - rpmStart) / rpmStep)) + 1),
          ) / ticksInSec,
        );

  return {
    ...stepBase,
    type: appConst.step.types.PROGRESSION_JOULE,
    activityType: appConst.step.activityTypes.PROGRESSION_JOULE,
    duration,
    subSteps,
    endless,
    progressionStepJouleThreshold: stepJouleThreshold,
    progressionStartWatt: startWatt,
    progressionStartWattPercent: startWattPercent,
    progressionEndWatt: endWatt,
    progressionEndWattPercent: endWattPercent,
    progressionStepWatt: stepWatt,
    progressionStepWattTime: stepWattTime,
    progressionStartRpm: rpmStart,
    progressionStartRpmOffset: rpmStartOffset,
    progressionEndRpm: rpmEnd,
    progressionEndRpmOffset: rpmEndOffset,
    progressionStepRpm: rpmStep,
    progressionStepRpmTime: rpmStepTime,
  };
};
const transformToStepTestJoule = (stepArray: Array<string>): ?Object => {
  if (stepArray.length < 22) {
    return null;
  }
  const stepBase = transformToStepBase(stepArray);

  const startWatt = trans.isNumeric(stepArray[21]) ? Number(stepArray[21]) : 0;
  const startWattPercent = trans.isNumeric(stepArray[22])
    ? Number(stepArray[22])
    : undefined;
  const stepWattThreshold = trans.isNumeric(stepArray[15])
    ? Number(stepArray[15])
    : startWatt;
  const stepJouleThreshold = trans.isNumeric(stepArray[18])
    ? Number(stepArray[18])
    : 0;
  let stepWatt = trans.isNumeric(stepArray[16]) ? Number(stepArray[16]) : 1;
  const stepWattTime = trans.isNumeric(stepArray[17])
    ? Number(stepArray[17])
    : 0;

  let subSteps = buildSubstepsForTestJoule(
    {startWatt, stepWattTime, stepWattThreshold, stepJouleThreshold, stepWatt},
    600,
  );

  const duration = subSteps
    .map(step => step.duration)
    .reduce((prev, curr) => prev + curr);

  return {
    ...stepBase,
    type: appConst.step.types.TEST_JOULE,
    activityType: appConst.step.activityTypes.TEST_JOULE,
    duration,
    subSteps,
    progressionStepJouleThreshold: stepJouleThreshold,
    progressionStepWattThreshold: stepWattThreshold,
    progressionStartWatt: startWatt,
    progressionStartWattPercent: startWattPercent,
    progressionStepWatt: stepWatt,
    progressionStepWattTime: stepWattTime,
  };
};
const transformToStepSprint = (stepArray: Array<string>): WorkoutStepSprint => {
  const stepBase = transformToStepBase(stepArray);
  const wattReference = parseInt(stepArray[16], 10) || 185;
  const rpmReference = parseInt(stepArray[17], 10) || 130;
  const wattReferenceIncrement = parseInt(stepArray[18], 10) || 15;
  const wattThresholdIncrement = parseInt(stepArray[19], 10) || 50;
  const wattThreshold = parseInt(stepArray[20], 10) || 750;
  const brakePositionOffset = parseInt(stepArray[21], 10) || 0;
  const wattUserThreshold = parseInt(stepArray[23], 10) || 200;
  const wattRequired =
    parseInt(stepArray[24], 10) ||
    Math.round(
      wattUserThreshold <= wattReference
        ? wattThreshold
        : ((wattUserThreshold - wattReference) / wattReferenceIncrement) *
            wattThresholdIncrement +
            wattThreshold,
    );

  return {
    ...stepBase,
    type: appConst.step.types.SPRINT,
    activityType: appConst.step.activityTypes.SPRINT,
    wattReference,
    rpmReference,
    wattReferenceIncrement,
    wattThresholdIncrement,
    wattThreshold,
    brakePositionOffset,
    wattUserThreshold,
    wattRequired,
    calculated: false,
  };
};

const transformToStepHIITSprint = (
  stepArray: Array<string>,
): WorkoutStepHIITSprint => {
  const stepBase = transformToStepBase(stepArray);
  const sprintDuration = parseInt(stepArray[15], 10) || 10;
  const brakePositionOffset = parseInt(stepArray[16], 10) || 0;
  const repetitions = parseInt(stepArray[17], 10) || 3;
  const failureControl = String(stepArray[18]).toLowerCase() === 'true';
  const failureMaxNumber = parseInt(stepArray[19], 10) || 3;
  const failurePercent = parseInt(stepArray[20], 10) || 95;
  const failureControlTypeTmp = String(stepArray[30]).toUpperCase();
  const failureControlType = ['AVG', 'MAX'].includes(failureControlTypeTmp)
    ? failureControlTypeTmp
    : 'AVG';

  const wattReferenceIncrement = parseInt(stepArray[22], 10) || 15;
  const wattThresholdIncrement = parseInt(stepArray[21], 10) || 50;
  const rpmReference = parseInt(stepArray[23], 10) || 130;
  const wattReference = parseInt(stepArray[24], 10) || 185;
  const wattThreshold = parseInt(stepArray[25], 10) || 700; // TODO: check if default is 750 or 700

  const wattUserThreshold = parseInt(stepArray[27], 10) || 200;
  const wattRequired =
    parseInt(stepArray[28], 10) ||
    Math.round(
      wattUserThreshold <= wattReference
        ? wattThreshold
        : ((wattUserThreshold - wattReference) / wattReferenceIncrement) *
            wattThresholdIncrement +
            wattThreshold,
    );
  const recoveryArray = (stepArray[29] || '').split('#');
  const sprintBaseSubStep = {
    type: 'SPRINT',
    duration: sprintDuration,
    brakePositionOffset: brakePositionOffset,
  };
  const recoveryBaseSubStep = transformToRecoverySubstep(recoveryArray);
  const recoveryDuration = recoveryBaseSubStep.duration;

  let subSteps = [];
  for (let i = 0, len = repetitions; i < len; i++) {
    subSteps.push({
      ...sprintBaseSubStep,
      sprintIndex: i,
    });
    subSteps.push({
      ...recoveryBaseSubStep,
      sprintIndex: i,
    });
  }
  if (subSteps.length) {
    subSteps.unshift({
      type: 'RECOVERY',
      subtype: 'FORCE_STOP',
      duration: 10,
      sprintIndex: -1,
    });
  }
  const duration = subSteps
    .map(step => step.duration)
    .reduce((prev, curr) => prev + curr, 0);

  const overrideArray = (stepArray[31] || '').split('#');
  const wattRequiredOverride = parseInt(overrideArray[0], 10) || undefined;
  const rpmRequiredOverride = parseInt(overrideArray[1], 10) || undefined;

  return {
    ...stepBase,
    type: appConst.step.types.HIIT_SPRINT,
    duration,
    subSteps,
    sprintDuration,
    brakePositionOffset,
    repetitions,
    failureControl,
    failureMaxNumber,
    failurePercent,
    failureControlType,
    wattReferenceIncrement,
    wattThresholdIncrement,
    rpmReference,
    wattReference,
    wattThreshold,
    wattUserThreshold,
    wattRequired,
    wattRequiredOverride,
    rpmRequiredOverride,
    recoveryDuration,
    calculated: false,
  };
};

const transformToStepPowerPeakTest = (
  stepArray: Array<string>,
): WorkoutStepPowerPeakTest => {
  const stepBase = transformToStepBase(stepArray);
  const durationSprint = parseInt(stepArray[15], 10) || 10;
  const wattReferenceIncrement = parseInt(stepArray[21], 10) || 15;
  const wattThresholdIncrement = parseInt(stepArray[22], 10) || 50;
  const rpmReference = parseInt(stepArray[23], 10) || 130;
  const wattReference = parseInt(stepArray[24], 10) || 185;
  const wattThreshold = parseInt(stepArray[25], 10) || 700; // TODO: check if default is 750 or 700
  const wattUserThreshold = parseInt(stepArray[27], 10) || 200;
  const wattRequired =
    parseInt(stepArray[28], 10) ||
    Math.round(
      wattUserThreshold <= wattReference
        ? wattThreshold
        : ((wattUserThreshold - wattReference) / wattReferenceIncrement) *
            wattThresholdIncrement +
            wattThreshold,
    );

  // 29: "S#60###" --> tipo di recupero S = STOP, B = BRAKE, W = WATT
  // [tipo#durata recupero#watt#percentuale watt#freno]
  const recoveryArray = (stepArray[29] || '').split('#');
  const recoveryBaseSubStep = transformToRecoverySubstep(recoveryArray);
  const durationRecovery = recoveryBaseSubStep.duration;
  /*
  // const durationRecovery = parseInt(recoveryArray[1], 10) || 60;
  // const recoveryType = recoveryArray[0] || 'S';
  // let recoveryBaseSubStep: {
  //   type: 'RECOVERY',
  //   subtype: string,
  //   duration: number,
  //   watt?: number,
  //   wattPercent?: number,
  //   brakePosition?: number,
  // } = {
  //   type: 'RECOVERY',
  //   duration: durationRecovery,
  //   subtype: 'STOP',
  // };

  // switch (recoveryType) {
  //   case 'B':
  //     recoveryBaseSubStep.subtype = 'BRAKE';
  //     recoveryBaseSubStep.brakePosition = parseInt(recoveryArray[4], 10) || 4; // TODO: check default
  //     break;

  //   case 'W':
  //     recoveryBaseSubStep.subtype = 'AUTO_WATT';
  //     recoveryBaseSubStep.watt = parseInt(recoveryArray[2], 10) || 100; // TODO: check default
  //     recoveryBaseSubStep.wattPercent = trans.isNumeric(recoveryArray[3])
  //       ? Number(recoveryArray[3])
  //       : undefined;
  //     break;

  //   case 'S':
  //   default:
  //     recoveryBaseSubStep.subtype = 'STOP';
  //     break;
  // }
  */

  // 16: "-1#2#0#2#-3#" --> vettore offset freno, uno per ogni ripetizione
  const sprintOffsetArray = (stepArray[16] || '')
    .split('#')
    .filter(e => trans.isNumeric(e));
  const sprintsCount = sprintOffsetArray.length;

  let subSteps = [];
  for (let i = 0, len = sprintsCount; i < len; i++) {
    const brakePositionOffset = parseInt(sprintOffsetArray[i], 10);
    subSteps.push({
      type: 'SPRINT',
      duration: durationSprint,
      brakePositionOffset: brakePositionOffset,
      sprintIndex: i,
    });
    subSteps.push({
      ...recoveryBaseSubStep,
      sprintIndex: i,
    });
  }
  if (subSteps.length) {
    subSteps.unshift({
      type: 'RECOVERY',
      subtype: 'FORCE_STOP',
      duration: 10,
      sprintIndex: -1,
    });
  }
  const duration = subSteps
    .map(step => step.duration)
    .reduce((prev, curr) => prev + curr, 0);
  const brakePositionOffset = 0;
  const wattRequiredOverride = undefined;
  const rpmRequiredOverride = undefined;

  return {
    ...stepBase,
    type: appConst.step.types.POWER_PEAK_TEST,
    duration,
    brakePositionOffset,
    sprintsCount,
    wattRequiredOverride,
    rpmRequiredOverride,
    subSteps,
    durationSprint,
    durationRecovery,
    wattReference,
    rpmReference,
    wattReferenceIncrement,
    wattThresholdIncrement,
    wattThreshold,
    wattUserThreshold,
    wattRequired,
    calculated: false,
  };
};

const transformToStepBPM = (
  stepArray: Array<string>,
  heart: Heart,
): ?WorkoutStepBPM => {
  const bpmTmp = stepArray[appConst.step.csvIndex.BPM];
  const bpmReference = Number(bpmTmp) || 0;
  return {
    ...transformToStepBase(stepArray),
    type: appConst.step.types.BPM,
    activityType: appConst.step.activityTypes.BPM,
    bpmReference: bpmReference,
    wattThreshold: heart.wattThreshold,
    bpmThreshold: heart.bpmThreshold,
    wattPerBpm: heart.wattPerBpm,
    firstStepDuration: heart.firstStepDuration,
    nextStepsDuration: heart.nextStepsDuration,
    coefficient: heart.coefficient,
    halve: heart.halve,
  };
};
const transformToStepTestPI = (
  stepArray: Array<string>,
  testPiObject: ?TestPiDataType,
): ?WorkoutStepTestPI => {
  const newTestType = stepArray[14] === 'TI2';
  let baseStep = transformToStepBase(stepArray);
  if (baseStep.isMaster) {
    baseStep.masterPercent =
      Number(
        stepArray[
          newTestType
            ? appConst.step.csvIndex.TEST_PI_TI2_MASTER_PERCENT
            : appConst.step.csvIndex.TEST_PI_MASTER_PERCENT
        ],
      ) || 0; // REVIEW default percent on bad configured test?
  }
  let newTestObject = {};
  if (newTestType) {
    const testDataArr = stepArray[15].split('#');
    if (testDataArr.length >= 7) {
      newTestObject.progressionStartWatt = Number(testDataArr[0]) || 0;
      newTestObject.progressionStartWattPercent = Number(testDataArr[1]) || 0;
      newTestObject.progressionStepWatt = Number(testDataArr[5]) || 0;
      newTestObject.progressionStepWattTime = Number(testDataArr[4]) || 0;
      newTestObject.progressionStepRepeat = Number(testDataArr[6]) || 9999;
      newTestObject.progressionStepRpm = testDataArr[2] || '';
      newTestObject.recoveryEnabled =
        stepArray[24].toLowerCase() === 'true' ? true : false;
      newTestObject.recoveryType = parseInt(stepArray[26]) || 0;
      newTestObject.recoveryTime = parseInt(stepArray[25]) || 0;
      newTestObject.recoveryValue = parseInt(stepArray[27]) || 0; // percent or brake position
      newTestObject.recoveryBpmPercentPoint = parseInt(stepArray[28]) || 0;
    }
  }
  const oldObject = testPiObject ? testPiObject : {};
  let step = {
    ...baseStep,
    ...oldObject,
    ...newTestObject,
    type: appConst.step.types.TEST_PI,
    activityType: appConst.step.activityTypes.TEST_PI,
  };
  let duration = step.progressionStepWattTime * step.progressionStepRepeat;
  if (duration < 600) {
    step.duration = duration;
  }
  return step;
};
const transformToStepTestPS = (
  stepArray: Array<string>,
  testPsObject: ?TestPsDataType,
): ?WorkoutStepTestPS => {
  if (!testPsObject) {
    return null;
  }
  return {
    ...transformToStepBase(stepArray),
    ...testPsObject,
    type: appConst.step.types.TEST_PS,
    activityType: appConst.step.activityTypes.TEST_PS,
  };
};
const transformToStepCronoNM = (
  stepArray: Array<string>,
): ?WorkoutStepCronoNM => {
  return {
    ...transformToStepTestNM(stepArray),
    type: appConst.step.types.CRONO_NM,
    activityType: appConst.step.activityTypes.CRONO_NM,
  };
};
const transformToStepTestNM = (
  stepArray: Array<string>,
): ?WorkoutStepTestNM => {
  const testDataArr = stepArray[15].split('#');
  let subSteps = [];
  let tmpDurationOffset = 0;
  for (let i = 0; i < testDataArr.length; i++) {
    const subStepStr = testDataArr[i];
    const subStepArr = subStepStr.split('&');
    if (subStepArr.length < 2) {
      continue;
    }
    let subStep: WorkoutSubStepTestNM = {
      index: subSteps.length,
      duration: Number(subStepArr[0]) || 0,
      durationOffset: tmpDurationOffset,
      newton: Number(subStepArr[1]) || 0,
      rpm: subStepArr[3] || '',
    };
    if (subStep.duration && subStep.newton) {
      subSteps.push(subStep);
      tmpDurationOffset += subStep.duration;
    }
  }
  let baseStep = transformToStepBase(stepArray);
  baseStep.duration = subSteps
    .map(step => step.duration)
    .reduce((prev, curr) => prev + curr);
  return {
    ...baseStep,
    type: appConst.step.types.TEST_NM,
    activityType: appConst.step.activityTypes.TEST_NM,
    subSteps,
    offsetAllowed: true,
  };
};
export const transformToStepSustainableWatt = (
  stepArray: Array<string>,
): ?WorkoutStepSustainableWatt => {
  const watt = parseInt(stepArray[appConst.step.csvIndex.WATT], 10) || 0;
  const offsetStepWatt = parseInt(stepArray[15], 10) || 5;
  return {
    ...transformToStepBase(stepArray),
    type: appConst.step.types.SUSTAINABLE_WATT,
    activityType: appConst.step.activityTypes.SUSTAINABLE_WATT,
    watt: watt,
    offsetStepWatt,
    offsetAllowed: true,
  };
};
export const transformToStepIdealRhythms = (
  stepArray: Array<string>,
): ?WorkoutStepIdealRhythms => {
  if (stepArray.length < 21) {
    return null;
  }
  const testDataArr = stepArray[20].split('@');
  if (!testDataArr[0]) {
    return null;
  }

  const rpmReference = parseInt(stepArray[15], 10) || 0; // const RI_rpm_100 =
  const rpmReferenceOffset = parseInt(stepArray[31], 10) || null;
  const wattPercentReference = parseInt(stepArray[16], 10) || 1; // RI_perce_watt
  const rpmStepReference = parseInt(stepArray[17], 10) || 1; // RI_step_rpm
  const wattReference = parseInt(stepArray[18], 10) || 200; // const RI_WATT_RIF =
  let subSteps: Array<WorkoutSubStepIdealRhythms> = [];
  for (let i = 0; i < testDataArr.length; i++) {
    const subStepStr = testDataArr[i];
    const subStepArr = subStepStr.split('#');
    if (subStepArr.length < 2) {
      continue;
    }
    let rpmOffset = parseInt(subStepArr[2], 10);
    if (!Number.isInteger(rpmOffset)) {
      rpmOffset = null;
    }
    let subStep: WorkoutSubStepIdealRhythms = {
      index: subSteps.length,
      duration: parseInt(subStepArr[0], 10) || 0,
      rpm: subStepArr[1] || '',
      rpmOffset: rpmOffset,
    };
    if (
      subStep.duration &&
      (subStep.rpm || Number.isInteger(subStep.rpmOffset))
    ) {
      subSteps.push(subStep);
    }
  }
  let baseStep = transformToStepBase(stepArray);
  baseStep.duration = subSteps
    .map(step => step.duration)
    .reduce((prev, curr) => prev + curr, 0);
  return {
    ...baseStep,
    type: appConst.step.types.IDEAL_RHYTHMS,
    activityType: appConst.step.activityTypes.IDEAL_RHYTHMS,
    rpmReference,
    rpmReferenceOffset: rpmReferenceOffset,
    rpmOffset: subSteps[0] ? subSteps[0].rpmOffset : null,
    wattPercentReference,
    rpmStepReference,
    wattReference,
    subSteps,
  };
};

export const transformToStepRace = (
  stepArray: Array<string>,
): ?WorkoutStepRace => {
  // const gara_tastini_Nm = stepArray[17] === '1'// gara_tastini_Nm
  // const gara_allenamento_km = stepArray[20] === '1'// gara_allenamento_km
  const wattRace = stepArray[18] === 'W';
  const newtonOffsetAllowed = stepArray[17] === '1';
  const offsetAllowed = wattRace || newtonOffsetAllowed;
  const wattBase = Number(stepArray[19]) || 0; // Nm_tastini_watt_FRENO

  const raceDataArr = stepArray[15].split('@');
  let subSteps = [];
  let distanceOffset = 0;
  let altOffset = 0;
  for (let i = 0; i < raceDataArr.length; i++) {
    const subStepStr = raceDataArr[i];
    const subStepArr = subStepStr.split('#');
    if (subStepArr.length < 5) {
      continue;
    }
    const distance = Number(subStepArr[0]) || 0;
    const newton = Number(subStepArr[1]) || 0;
    const newtonOffset = Number(subStepArr[2]) || 0;
    const slope = offsetAllowed
      ? 0
      : Math.round(Number(newtonOffset / 0.5) * 10) / 10;
    let subStep: WorkoutSubStepRace = {
      index: subSteps.length,
      // type: appConst.substep.types.DISTANCE,
      distance,
      distanceOffset,
      distanceDone: 0,
      newton,
      newtonOffset,
      slope,
      alt: Math.sin(Math.atan(slope / 100)) * distance * 1000,
      altOffset,
      rpm: subStepArr[3],
      rpmOffset: subStepArr[4],
    };
    if (subStep.distance) {
      subSteps.push(subStep);
      distanceOffset += subStep.distance;
      altOffset += subStep.alt;
    }
  }
  const curvesDataArr = (stepArray[23] || '').split('@');

  // let curves = Array(subSteps.length).fill(null);
  let positionOffset = 0;
  for (let i = 0; !offsetAllowed && i < curvesDataArr.length; i++) {
    const curveStr = curvesDataArr[i];
    const curveArr = curveStr.split('#');
    if (curveArr.length < 2) {
      continue;
    }
    if (!trans.isNumeric(curveArr[0])) {
      continue;
    }

    // arr.splice(index, 0, item);

    const position = (parseInt(curveArr[0]) || 0) - 1 + positionOffset;
    if (!subSteps[position] || !subSteps[position + 1]) {
      continue; // steps before and after exists
    }
    if (subSteps[position].curve) {
      continue;
    } // we already have curve after that substep, first wins
    // if (curves[position]) { continue; } // we already have curve after that substep, first wins

    let type;
    switch (curveArr[1]) {
      case appConst.curve.types.BRAKE_POSITION:
        type = appConst.curve.types.BRAKE_POSITION;
        break;
      case appConst.curve.types.NEWTON_FAST:
      case appConst.curve.types.NEWTON_SLOW:
      case appConst.curve.types.NEWTON_CUSTOM:
      case appConst.curve.types.NEWTON:
        type = curveArr[1];
        // type = appConst.curve.types.NEWTON
        break;
    }
    if (!type) {
      continue;
    }
    let curveSteps = [];

    if (type === appConst.curve.types.BRAKE_POSITION) {
      curveSteps = [
        {
          duration: 5,
          brakePosition: 4,
          direction: appConst.curve.directions.DOWN,
        },
        {
          durationMax: 10,
          newtonToArrive: subSteps[position + 1].newton,
          brakePosition: 4, // will be overwritten in execution time
          direction: appConst.curve.directions.UP,
        },
      ];
      subSteps[position].curve = {
        type,
        steps: curveSteps,
        duration: curveSteps
          .map(step => step.duration || step.durationMax)
          .reduce((prev, curr) => prev + curr),
      };
      positionOffset--;
      continue;
    }
    // type === appConst.curve.types.NEWTON
    if (curveArr.length < 11) {
      continue;
    }
    const newtonStart = subSteps[position].newton;
    const newtonEnd = subSteps[position + 1].newton;
    const newtonDiff = Number(curveArr[10]) || 0;
    if (!newtonDiff) {
      continue;
    }
    let newtonPeak = newtonStart + newtonDiff;

    let newtonStep1Value = Math.abs(Number(curveArr[2])) || 1;
    let newtonStep1Time = Math.abs(Number(curveArr[3])) || 1;
    let newtonStep2Value = Math.abs(Number(curveArr[4])) || 1;
    let newtonStep2Time = Math.abs(Number(curveArr[5])) || 1;
    // if (newtonStart > newtonPeak) { newtonStep1Value *= -1; }
    // if (newtonPeak > newtonEnd) { newtonStep2Value *= -1; }
    let newtonTmp = newtonStart;

    for (
      let i = 1,
        len = Math.ceil(
          Math.abs((newtonStart - newtonPeak) / newtonStep1Value),
        );
      i <= len;
      i++
    ) {
      //with last
      newtonTmp =
        newtonStart > newtonPeak
          ? Math.max(newtonPeak, newtonStart - i * newtonStep1Value)
          : Math.min(newtonPeak, newtonStart + i * newtonStep1Value);
      curveSteps.push({
        duration: newtonStep1Time,
        newton: newtonTmp,
        direction:
          newtonStart > newtonPeak
            ? appConst.curve.directions.DOWN
            : appConst.curve.directions.UP,
      });
    }
    for (
      let i = 1,
        len = Math.ceil(Math.abs((newtonEnd - newtonPeak) / newtonStep2Value));
      i < len;
      i++
    ) {
      // without last
      newtonTmp =
        newtonPeak > newtonEnd
          ? Math.max(newtonEnd, newtonPeak - i * newtonStep2Value)
          : Math.min(newtonEnd, newtonPeak + i * newtonStep2Value);
      curveSteps.push({
        duration: newtonStep2Time,
        newton: newtonTmp,
        direction:
          newtonPeak > newtonEnd
            ? appConst.curve.directions.DOWN
            : appConst.curve.directions.UP,
      });
    }
    subSteps[position].curve = {
      type,
      steps: curveSteps,
      duration: curveSteps
        .map(step => step.duration || step.durationMax)
        .reduce((prev, curr) => prev + curr),
    };
    positionOffset--;
  }

  let race: WorkoutStepRace = {
    ...transformToStepBase(stepArray),
    distance: subSteps
      .map(step => step.distance || 0)
      .reduce((prev, curr) => prev + curr, 0),
    type: appConst.step.types.RACE,
    activityType: appConst.step.activityTypes.RACE,
    subSteps,
    offsetAllowed,
    wattRace,
  };
  if (wattRace) {
    race.watt = wattBase;
  }

  return race;
};

const transformToStepRouteNewton = (
  stepArray: Array<string>,
): ?WorkoutStepRouteNewton => {
  const offsetAllowed = false;
  const routeNewtonDataArr = stepArray[15].split('@');
  let subSteps = [];
  let distanceOffset = 0;
  let altOffset = 0;
  for (let i = 0; i < routeNewtonDataArr.length; i++) {
    const subStepStr = routeNewtonDataArr[i];
    const subStepArr = subStepStr.split('#');
    if (subStepArr.length < 5) {
      continue;
    }
    const distance = Number(subStepArr[0]) || 0;
    if (!distance) {
      continue;
    }
    const newton = Number(subStepArr[1]) || 0;
    const newtonOffset = Number(subStepArr[2]) || 0;
    const slope = Math.round(Number(newtonOffset / 0.5) * 10) / 10;
    let subStep: WorkoutSubStepRouteNewton = {
      index: subSteps.length,
      distance,
      distanceOffset,
      distanceDone: 0,
      newton,
      newtonOffset,
      slope,
      alt: Math.sin(Math.atan(slope / 100)) * distance * 1000,
      altOffset,
      rpm: subStepArr[3],
      rpmOffset: subStepArr[4],
    };
    subSteps.push(subStep);
    distanceOffset += subStep.distance;
    altOffset += subStep.alt;
  }
  let route: WorkoutStepRouteNewton = {
    ...transformToStepBase(stepArray),
    distance: subSteps
      .map(step => step.distance)
      .reduce((prev, curr) => prev + curr, 0),
    type: appConst.step.types.ROUTE_NEWTON,
    activityType: appConst.step.activityTypes.ROUTE_NEWTON,
    subSteps,
    offsetAllowed,
  };

  return route;
};

const transformToStepRoute = (stepArray: Array<string>): ?WorkoutStepRoute => {
  const routeDataArr = stepArray[15].split('@');
  let subSteps = [];
  let distanceOffset = 0;
  let altOffset = 0;
  for (let i = 0; i < routeDataArr.length; i++) {
    const subStepStr = routeDataArr[i];
    const subStepArr = subStepStr.split('#');
    if (subStepArr.length < 3) {
      continue;
    }
    const distance = Number(subStepArr[0]) || 0;
    if (!distance) {
      continue;
    }
    const newtonOffset = Number(subStepArr[2]) || 0;
    const slope = Math.round(Number(newtonOffset / 0.5) * 10) / 10;
    let subStep: WorkoutSubStepRoute = {
      index: subSteps.length,
      distance,
      distanceOffset,
      distanceDone: 0,
      newtonOffset,
      slope,
      alt: Math.sin(Math.atan(slope / 100)) * distance * 1000,
      altOffset,
    };
    subSteps.push(subStep);
    distanceOffset += subStep.distance;
    altOffset += subStep.alt;
  }
  let route: WorkoutStepRoute = {
    ...transformToStepBase(stepArray),
    distance: subSteps
      .map(step => step.distance)
      .reduce((prev, curr) => prev + curr, 0),
    type: appConst.step.types.ROUTE,
    activityType: appConst.step.activityTypes.ROUTE,
    subSteps,
  };

  return route;
};

const transformToStepSlope = (stepArray: Array<string>): ?WorkoutStepSlope => {
  const raceDataArr = stepArray[15].split('@');
  let subSteps = [];
  let distanceOffset = 0;
  let altOffset = 0;
  for (let i = 0; i < raceDataArr.length; i++) {
    const subStepStr = raceDataArr[i];
    const subStepArr = subStepStr.split('#');
    if (subStepArr.length < 2) {
      continue;
    }
    const distance = Math.max(0, Number(subStepArr[0]) || 0);
    const slope = Math.round((Number(subStepArr[1]) || 0) * 10) / 10;
    if (!distance) {
      continue;
    }
    let subStep: WorkoutSubStepSlope = {
      index: subSteps.length,
      distance,
      distanceOffset,
      distanceDone: 0,
      slope,
      alt: Math.sin(Math.atan(slope / 100)) * distance * 1000,
      altOffset,
    };
    subSteps.push(subStep);
    distanceOffset += subStep.distance;
    altOffset += subStep.alt;
  }
  const route: WorkoutStepSlope = {
    ...transformToStepBase(stepArray),
    distance: subSteps
      .map(step => step.distance)
      .reduce((prev, curr) => prev + curr, 0),
    type: appConst.step.types.SLOPE,
    activityType: appConst.step.activityTypes.SLOPE,
    subSteps,
  };

  return route;
};

// eslint-disable-next-line no-bitwise
const bit_test = (num, bit) => (num >> bit) % 2 != 0;

const transformToStepPureStrength = (
  stepArray: Array<string>,
): ?WorkoutStepPureStrength => {
  if (stepArray.length < 17) {
    return null;
  }
  const baseStep = transformToStepBase(stepArray);
  let crankData = trans.isNumeric(stepArray[16])
    ? parseInt(stepArray[16], 10)
    : 3;
  if (crankData < 0 || crankData > 3) {
    crankData = 3;
  }
  const crankLeftUnblocked = !bit_test(crankData, 1);
  const crankRightUnblocked = !bit_test(crankData, 0);
  return {
    ...baseStep,
    type: appConst.step.types.PURE_STRENGTH,
    activityType: appConst.step.activityTypes.PURE_STRENGTH,
    crankLeftUnblocked: crankLeftUnblocked,
    crankRightUnblocked: crankRightUnblocked,
  };
};

const transformToStepWingate = (stepArray) => {
  if (stepArray.length < 17) { return null;}
  const baseStep = transformToStepBase(stepArray);

  //{numRip: 1,tempo: 10,nmKg: 1, desc: '',uuid: v4()}

  const subSteps = stepArray[15].split('@').map((ss) => {

    const ss_arr = ss.split('#')
    //return ss.numRip + "#" + ss.tempo + "#" + ss.nmKg + "#" + ss.desc
    if(ss_arr.length < 4) return {numRip: 1,tempo: 10,nmKg: 1, desc: '',uuid: v4()}

    return {
      numRip: Number(ss_arr[0]),
      tempo: Number(ss_arr[1]),
      nmKg: Number(ss_arr[2]), 
      desc: ss_arr[3],
      uuid: v4()}
  })
  const recoveryTime = stepArray[16]
  const peso = stepArray[17]

  return {
    ...baseStep,
    type: appConst.step.types.WINGATE,
    recoveryTime,
    recoveryType: "stop",
    recoveryBrake: 1,
    recoveryWatt: 0,
    recoveryWattPercent: 0,
    peso,
    subSteps,
    
  }


}

export const transformCsvToWorkoutStep = (
  csv: string,
  heart: Heart,
  testPiObject: ?TestPiDataType,
  testPsObject: ?TestPsDataType,
): ?WorkoutStep => {
  const stepArray = csv.split(';');
  // TODO: try/catch parsing errors/etc
  //console.log({steparr: stepArray});
  if (stepArray.length < 3) {
    return null;
  }
  if (parseInt(stepArray[appConst.step.csvIndex.BRAKE_POSITION], 10)) {
    return transformToStepBrakePosition(stepArray);
  }
  switch (stepArray[2]) {
    case appConst.step.types.AUTO_WATT:
      return transformToStepAutoWatt(stepArray);
    case appConst.step.types.PROGRESSION_WATT:
      return transformToStepProgressionWatt(stepArray);
    case appConst.step.types.PROGRESSION_RPM:
      return transformToStepProgressionRPM(stepArray);
    case appConst.step.types.AUTO_NEWTON:
      return transformToStepAutoNM(stepArray);
    case appConst.step.types.BPM:
      return transformToStepBPM(stepArray, heart);
    case appConst.step.types.PROGRESSION_NEWTON:
      return transformToStepProgressionNewton(stepArray);
    case appConst.step.types.ZONE:
      return transformToStepZone(stepArray);
    case appConst.step.types.TEST_PI:
      return transformToStepTestPI(stepArray, testPiObject);
    case appConst.step.types.TEST_PS:
      return transformToStepTestPS(stepArray, testPsObject);
    case appConst.step.types.TEST_NM:
      return transformToStepTestNM(stepArray);
    case appConst.step.types.CRONO_NM:
      return transformToStepCronoNM(stepArray);
    case appConst.step.types.SUSTAINABLE_WATT:
      return transformToStepSustainableWatt(stepArray);
    case appConst.step.types.IDEAL_RHYTHMS:
      return transformToStepIdealRhythms(stepArray);
    case appConst.step.types.RACE:
      return transformToStepRace(stepArray);
    case appConst.step.types.ROUTE:
      return transformToStepRoute(stepArray);
    case appConst.step.types.ROUTE_NEWTON:
      return transformToStepRouteNewton(stepArray);
    case appConst.step.types.PROGRESSION_JOULE:
      return transformToStepProgressionJoule(stepArray);
    case appConst.step.types.TEST_JOULE:
      return transformToStepTestJoule(stepArray);
    case appConst.step.types.SPRINT:
      return transformToStepSprint(stepArray);
    case appConst.step.types.STOP:
      return transformToStepStop(stepArray);
    case appConst.step.types.POWER_PEAK_TEST:
      return transformToStepPowerPeakTest(stepArray);
    case appConst.step.types.HIIT_SPRINT:
      return transformToStepHIITSprint(stepArray);
    case appConst.step.types.SLOPE:
      return transformToStepSlope(stepArray);
    case appConst.step.types.PURE_STRENGTH:
      return transformToStepPureStrength(stepArray);
    case appConst.step.types.WINGATE:
      return transformToStepWingate(stepArray);
    default:
      return transformToUnknownStep(csv);
  }
};

export const transformToRecoverySubstep = (
  recoveryArray: Array<any>,
): WorkoutStepHIITSubRecovery => {
  const recoveryType: string = recoveryArray[0] || 'S';
  const durationRecovery: number = parseInt(recoveryArray[1], 10) || 60;
  let recoveryBaseSubStep: {
    type: 'RECOVERY',
    subtype: string,
    duration: number,
    watt?: number,
    wattPercent?: ?number,
    brakePosition?: number,
  } = {
    type: 'RECOVERY',
    duration: durationRecovery,
    subtype: 'STOP',
  };

  switch (recoveryType) {
    case 'B':
      recoveryBaseSubStep.subtype = 'BRAKE';
      recoveryBaseSubStep.brakePosition = parseInt(recoveryArray[4], 10) || 4; // TODO: check default
      break;

    case 'W':
      recoveryBaseSubStep.subtype = 'AUTO_WATT';
      recoveryBaseSubStep.watt = parseInt(recoveryArray[2], 10) || 100; // TODO: check default
      recoveryBaseSubStep.wattPercent = trans.isNumeric(recoveryArray[3])
        ? Number(recoveryArray[3])
        : undefined;
      break;

    case 'S':
    default:
      recoveryBaseSubStep.subtype = 'STOP';
      break;
  }
  return recoveryBaseSubStep;
};

export const transformCsvArrToWorkoutSteps = (
  csvArr: Array<string>,
  heart: Heart,
  testPiObject: ?TestPiDataType,
  testPsObject: ?TestPsDataType,
): Array<WorkoutStep> => {
  
  if (csvArr.length < appConst.step.count) {
    return [];
  }
  
  let steps = [];
  for (let i = 0; i < appConst.step.count; i++) {
    let step = transformCsvToWorkoutStep(
      csvArr[i],
      heart,
      testPiObject,
      testPsObject,
    );
    if (step) {
      steps.push(step);
    }
  }
  return steps;
};

export const transformCsvArrToWorkout = (
  csvArr: Array<string>,
  heartString: ?string,
): Workout => {
  const license = csvArr[200] || 'no_lic';
  // REVIEW if head heart data is different from body
  const heartStr = heartString
    ? heartString
    : csvArr[201]
    ? csvArr[201]
    : appConst.heart.DEFAULT_HEART_STRING;
  const heart: Heart = transformHeartStringToHeartDataObject(heartStr);
  const testIndexString = csvArr[202] ? csvArr[202] : null;
  const testPiOldString = csvArr[203] ? csvArr[203] : null;
  const testPiObject: ?TestPiDataType = testPiOldString
    ? transformTestPiOldStringToTestPiDataObject(testPiOldString)
    : null;
  const testPsHeaderString = csvArr[204] ? csvArr[204] : null;
  const testPsString = csvArr[205] ? csvArr[205] : null;
  const testPsObject: ?TestPsDataType = testPsString
    ? transformTestPsStringToTestPsObject(testPsString)
    : null;
  const steps = transformCsvArrToWorkoutSteps(
    csvArr,
    heart,
    testPiObject,
    testPsObject,
  );

  let workout: Workout = {
    license,
    heartString: heartStr,
    heart,
    steps,
  };
  testIndexString && (workout.testIndexString = testIndexString);
  if (testPiOldString) {
    workout.testPiOldString = testPiOldString;
    workout.testPiObject = testPiObject;
  }
  if (testPsString) {
    workout.testPsHeaderString = testPsHeaderString;
    workout.testPsString = testPsString;
    workout.testPsObject = testPsObject;
  }

  
  return workout;
};

export const transformTestPiOldStringToTestPiDataObject = (
  s: string,
): ?TestPiDataType => {
  let sA = s.split(';');
  if (sA.length < 4) {
    return null;
  }
  let progressionStartWatt = sA[0];
  let tmpArr = progressionStartWatt.split(':');
  if (tmpArr.length > 1) {
    progressionStartWatt = tmpArr[1];
  }

  let data: TestPiDataType = {
    progressionStartWatt: Number(progressionStartWatt) || 0,
    progressionStepWatt: Number(sA[2]) || 0,
    progressionStepWattTime: Number(sA[1]) || 0,
    progressionStepRepeat: Number(sA[3]) || 9999,
    progressionStartWattPercent: Number(sA[4]) || 0,
    progressionStepRpm: sA[5] === undefined ? '' : sA[4],
  };
  if (sA.length >= 12) {
    data.recoveryEnabled = sA[7].toLowerCase() === 'true' ? true : false;
    data.recoveryType = parseInt(sA[8]) || 0;
    data.recoveryTime = parseInt(sA[10]) || 0;
    data.recoveryValue = parseInt(sA[11]) || 0;
    data.recoveryBpmPercentPoint = parseInt(sA[9]) || 0;
  }
  return data;
};
export const transformTestPsStringToTestPsObject = (
  s: string,
): ?TestPsDataType => {
  let sA = s.split(';');
  let data: TestPsDataType = {
    testType: Number(sA[1]) || 0,
  };
  trans.isNumeric(sA[2]) && (data.distance = Number(sA[2]));
  trans.isNumeric(sA[3]) && (data.duration = Number(sA[3]));
  trans.isNumeric(sA[4]) && (data.brakePosition = Number(sA[4]));
  trans.isNumeric(sA[5]) && (data.watt = Number(sA[11]));
  return data;
};

export const transformHeartStringToHeartDataObject = (s: string): Heart => {
  let sA = s.split(';');
  let def = appConst.heart.DEFAULT_HEART_STRING.split(';');
  return {
    bpmReference: Number(sA[0] !== '' && sA[0] !== undefined ? sA[0] : def[0]),
    wattThreshold: Number(sA[1] !== '' && sA[1] !== undefined ? sA[1] : def[1]),
    bpmThreshold: Number(sA[2] !== '' && sA[2] !== undefined ? sA[2] : def[2]),
    wattPerBpm: Number(sA[3] !== '' && sA[3] !== undefined ? sA[3] : def[3]),
    firstStepDuration: Number(
      sA[5] !== '' && sA[5] !== undefined ? sA[5] : def[5],
    ),
    nextStepsDuration: Number(
      sA[4] !== '' && sA[4] !== undefined ? sA[4] : def[4],
    ),
    coefficient: Number(sA[6] !== '' && sA[6] !== undefined ? sA[6] : def[6]),
    halve: sA[7] && sA[7].toLowerCase() === 'true' ? true : false,
  };
};

export const buildSubstepsForProgressionJoule = (data: {
  startWatt: number,
  endWatt: number,
  stepJouleThreshold: number,
  stepWatt: number,
}): Array<Object> => {
  const {startWatt, endWatt, stepJouleThreshold, stepWatt} = data;
  let subSteps = [];
  let tmpJouleSum = 0;
  let tmpWatt = startWatt;
  let tmpDurationOffset = 0;
  const ticksInSec = trans.secToTicks(1);

  //console.log({startWatt: startWatt, endWatt:endWatt,stepJouleThreshold:stepJouleThreshold,stepWatt:stepWatt})

  while (stepWatt > 0 ? tmpWatt <= endWatt : tmpWatt >= endWatt) {
    let ticks = Math.floor(
      (ticksInSec * (stepJouleThreshold + tmpJouleSum)) / tmpWatt,
    );
    if (
      stepJouleThreshold + tmpJouleSum - tmpWatt * trans.ticksToSec(ticks) >
      Math.floor(tmpWatt / ticksInSec / 2)
    ) {
      ticks += 1;
    }
    let subStep: Object = {
      duration: trans.ticksToSec(ticks),
      durationOffset: tmpDurationOffset,
      watt: tmpWatt,
    };
    subSteps.push(subStep);

    tmpJouleSum =
      stepJouleThreshold + tmpJouleSum - tmpWatt * trans.ticksToSec(ticks);
    tmpWatt += stepWatt;
    tmpDurationOffset += trans.ticksToSec(ticks);
  }

  return subSteps;
};

export const buildSubstepsForEndlessProgressionJoule = (
  data: {startWatt: number, stepJouleThreshold: number, stepWatt: number},
  seconds: number,
): Array<Object> => {
  const {startWatt, stepJouleThreshold, stepWatt} = data;
  let subSteps = [];
  let tmpJouleSum = 0;
  let tmpWatt = startWatt;
  let tmpDurationOffset = 0;
  const ticksInSec = trans.secToTicks(1);
  let tmpSubStepSeconds = (stepJouleThreshold + tmpJouleSum) / tmpWatt;
  while (tmpDurationOffset < seconds) {
    let ticks = Math.floor(ticksInSec * tmpSubStepSeconds);
    if (
      stepJouleThreshold + tmpJouleSum - tmpWatt * trans.ticksToSec(ticks) >
      Math.floor(tmpWatt / ticksInSec / 2)
    ) {
      ticks += 1;
    }
    let subStep: Object = {
      duration: trans.ticksToSec(ticks),
      durationOffset: tmpDurationOffset,
      watt: tmpWatt,
    };
    subSteps.push(subStep);

    tmpJouleSum =
      stepJouleThreshold + tmpJouleSum - tmpWatt * trans.ticksToSec(ticks);
    tmpWatt += stepWatt;
    tmpDurationOffset += trans.ticksToSec(ticks);
    tmpSubStepSeconds = (stepJouleThreshold + tmpJouleSum) / tmpWatt;
  }
  return subSteps;
};

export const buildSubstepsForTestJoule = (
  data: {|
    startWatt: number,
    stepWattTime: number,
    stepWattThreshold: number,
    stepJouleThreshold: number,
    stepWatt: number,
  |},
  seconds: number,
): Array<Object> => {
  const {
    startWatt,
    stepWattTime,
    stepWattThreshold,
    stepJouleThreshold,
    stepWatt,
  } = data;
  console.log(data);
  let subSteps = [];
  if(!startWatt) return subSteps;
  let tmpDurationOffset = 0;
  for (let i = startWatt; i <= stepWattThreshold; i += stepWatt) {
    let subStep: Object = {
      duration: stepWattTime,
      durationOffset: tmpDurationOffset,
      watt: i,
    };
    subSteps.push(subStep);
    tmpDurationOffset += stepWattTime;
  }

  let tmpWatt = stepWattThreshold + stepWatt;
  let tmpJouleSum = 0;
  const ticksInSec = trans.secToTicks(1);

  let tmpSubStepSeconds = (stepJouleThreshold + tmpJouleSum) / tmpWatt;
  while (tmpDurationOffset < seconds) {
    let ticks = Math.floor(ticksInSec * tmpSubStepSeconds);
    if (
      stepJouleThreshold + tmpJouleSum - tmpWatt * trans.ticksToSec(ticks) >
      Math.floor(tmpWatt / ticksInSec / 2)
    ) {
      ticks += 1;
    }
    let subStep: Object = {
      duration: trans.ticksToSec(ticks),
      durationOffset: tmpDurationOffset,
      watt: tmpWatt,
    };
    subSteps.push(subStep);

    tmpJouleSum =
      stepJouleThreshold + tmpJouleSum - tmpWatt * trans.ticksToSec(ticks);
    tmpWatt += stepWatt;
    tmpDurationOffset += trans.ticksToSec(ticks);
    tmpSubStepSeconds = (stepJouleThreshold + tmpJouleSum) / tmpWatt;
  }
  return subSteps;
};

type transformObjectType = {
  transformWorkoutStepToCsv: (workoutStep: WorkoutStep) => string,
  transformCsvToWorkoutStep: (csv: string, heart: Heart) => ?WorkoutStep,
  transformCsvArrToWorkout: (
    csvArr: Array<string>,
    heartString: ?string,
  ) => Workout,
  buildSubstepsForTestJoule: (
    data: {|
      startWatt: number,
      stepWattTime: number,
      stepWattThreshold: number,
      stepJouleThreshold: number,
      stepWatt: number,
    |},
    seconds: number,
  ) => Array<Object>,
  buildSubstepsForProgressionJoule: (data: {|
    startWatt: number,
    endWatt: number,
    stepJouleThreshold: number,
    stepWatt: number,
  |}) => Array<Object>,
  buildSubstepsForEndlessProgressionJoule: (
    data: {|
      startWatt: number,
      stepJouleThreshold: number,
      stepWatt: number,
    |},
    seconds: number,
  ) => Array<Object>,
};
const transformObject: transformObjectType = {
  transformWorkoutStepToCsv: transformWorkoutStepToCsv,
  transformCsvToWorkoutStep: transformCsvToWorkoutStep,
  transformCsvArrToWorkout: transformCsvArrToWorkout,
  buildSubstepsForTestJoule,
  buildSubstepsForProgressionJoule,
  buildSubstepsForEndlessProgressionJoule,
};
export default transformObject;
