/**
 * @format
 * @flow
 */
import type {
  Workout,
  WorkoutStep,
  Activity,
  ActivityRecord,
} from '../types/AppTypeDefinition';
import appConst from '../const';
import brakeConst from '../const/brake';
import trans from './trans';
import physics from './physics';
import type {WorkoutType, WorkoutCategoryType} from '../const/training';
export function getWorkoutRequirements(wk: Workout): Set<string> {
  let rq = new Set(['speed']);
  for (const wks: WorkoutStep of wk.steps) {
    const reqArr = getWorkoutStepRequirements(wks);
    for (const str of reqArr) {
      rq.add(str);
    }
  }
  return rq;
}

export function getWorkoutStepRequirements(step: WorkoutStep): Set<string> {
  switch (step.type) {
    case appConst.step.types.AUTO_NEWTON:
    case appConst.step.types.PROGRESSION_NEWTON:
    case appConst.step.types.PROGRESSION_RPM:
      return new Set(['rpm']);
    case appConst.step.types.BPM:
      return new Set(['bpm']);

    case appConst.step.types.BRAKE_POSITION:
    case appConst.step.types.AUTO_WATT:
    case appConst.step.types.PROGRESSION_WATT:
    default:
      return new Set();
  }
}

export function getTestPIRecordsGroups(
  records: Array<ActivityRecord>,
): Array<Array<ActivityRecord>> {
  let inTestPI = false;
  let testPIIndex = -1;
  let testPiGroups = [];
  for (let i = 0, len = records.length; i < len; i++) {
    let record = records[i];
    if (
      record &&
      record.stepType &&
      record.stepType.startsWith(appConst.step.activityTypes.TEST_PI)
    ) {
      if (inTestPI === false) {
        testPIIndex++;
        inTestPI = true;
        testPiGroups[testPIIndex] = [record];
      } else {
        testPiGroups[testPIIndex].push(record);
      }
    } else {
      inTestPI = false;
    }
  }
  return testPiGroups;
}

export const getWorkoutType = (wk: Workout): string =>
  String(wk.type || '').toLowerCase();
export const getWorkoutCategoryText = (wk: Workout): string =>
  String(wk.tipoWorkout || '').toLowerCase();
export const isWorkoutType = (wk: Workout, type: WorkoutType) =>
  getWorkoutType(wk) === type;
export const isWorkoutCategory = (wk: Workout, type: WorkoutCategoryType) =>
  getWorkoutCategoryText(wk) === type;

export const getActivityType = (act: Activity): string =>
  String(act.type || '').toLowerCase();
export const isActivityType = (act: Activity, type: string) =>
  getActivityType(act) === type;

export function buildAutotestReportDataFromTestPI(
  records: Array<ActivityRecord>,
) {
  let wattMax = 0;
  let rpmMax = 0;
  let newtonMax = 0;
  let bpmMax = 0;
  for (let i = 0, len = records.length; i < len; i++) {
    let r = records[i];
    wattMax = Math.max(r.watt, wattMax);
    rpmMax = Math.max(r.rpm, rpmMax);
    newtonMax = Math.max(r.newton, newtonMax);
    bpmMax = Math.max(r.bpm, bpmMax);
  }
  newtonMax = Number(newtonMax.toFixed(2));
  const wattThreshold = Math.round(wattMax * 0.8);
  const wattFilterMin = Math.round(wattMax * 0.65);
  const wattFilterMax = Math.round(wattMax * 0.8);
  const rpmRecordsFiltered = records.filter(
    r => r.watt >= wattFilterMin && r.watt <= wattFilterMax,
  );
  const rpmThreshold = !rpmRecordsFiltered.length
    ? 0
    : Math.round(
        rpmRecordsFiltered.reduce((total, record) => total + record.rpm, 0) /
          rpmRecordsFiltered.length,
      );
  const wattFilterBpm = Math.round(wattMax * 0.85);
  const bpmRecordsFiltered = records.filter(r => r.watt === wattFilterBpm);
  const bpmThreshold = !bpmRecordsFiltered.length
    ? 0
    : Math.round(
        bpmRecordsFiltered.reduce((total, record) => total + record.bpm, 0) /
          bpmRecordsFiltered.length,
      );
  const newtonThreshold = Number(
    physics.calcNewton(wattThreshold, rpmThreshold).toFixed(2),
  );

  return {
    max: {
      watt: wattMax,
      rpm: rpmMax,
      newton: newtonMax,
      bpm: bpmMax,
    },
    threshold: {
      watt: wattThreshold,
      rpm: rpmThreshold,
      newton: newtonThreshold,
      bpm: bpmThreshold,
    },
  };
}

// REVIEW
// adData - additional data = { rpm, offset, progressionValue, weight }
/*
export function getTickData(step: WorkoutStep, tick: number, record: ?ActivityRecord = undefined, offset: number = 0):
  { brakeMode: number, brakeValue: number, watt?: number, rpm?: number|string, newton?: number } {

  let brakeMode = brakeConst.modes.WATT
  let brakeValue = 0
  let watt = rpm = newton = null
  let offsetTableName
  let diffTicks = tick

  if (step.rpm && Number(step.rpm)) { rpm = Number(rpm) }

  switch (step.type) {
    case appConst.step.types.BRAKE_POSITION:
      brakeMode = brakeConst.modes.POSITION
      brakeValue = step.brakePosition
      break

    case appConst.step.types.AUTO_WATT:
    case appConst.step.types.ZONE:
      watt = brakeValue = step.watt
      if (step.offsetTableUse) {
        switch (step.offsetTableType) {
          case 0:
          case 4:
            offsetTableName = tConst.offset.tableNames.STANDARD
            break
          case 1:
          case 5:
            offsetTableName = tConst.offset.tableNames.PLUS_MINUS;
            break
        }
        if (offsetTableName) {
          watt = brakeValue = calcOffsetTableValue(offsetTableName, step.watt, Number(step.rpm) || 0, record.rpm)
        }
      }
      break

    case appConst.step.types.IDEAL_RHYTHMS:
      rpm = step.rpmReference
      watt = brakeValue = record && record.rpm ?
        step.wattReference*
          (100 + (record.rpm - step.rpmReference)/step.rpmStepReference*step.wattPercentReference)/100
          : step.wattReference
      break

    case appConst.step.types.SUSTAINABLE_WATT:
      watt = brakeValue = Math.max(0, step.watt + offset)
      break

    case appConst.step.types.PROGRESSION_WATT:
      watt = brakeValue = step.progressionStartWatt +
        Math.floor(tick/trans.secToTicks(step.progressionStepWattTime))*step.progressionStepWatt
      break

    case appConst.step.types.PROGRESSION_RPM:
      brakeMode = brakeConst.modes.POSITION
      brakeValue = step.brakePosition
      rpm = !(step.progressionStepRpm && step.progressionStepRpmTime) ?
        step.progressionStartRpm
        : Number(step.progressionStartRpm) +
          Math.floor(tick/trans.secToTicks(step.progressionStepRpmTime))*step.progressionStepRpm
      break

    case appConst.step.types.TEST_NM:
    case appConst.step.types.CRONO_NM: {
      newton = 0
      for (let i=0; i<step.subSteps.length; i++) {
        diffTicks -= trans.secToTicks(step.subSteps[i].duration)
        if (diffTicks > 0) { continue }
        newton = currStep.subSteps[i].newton
        break
      }
      newton = Math.max(0, newton + offset)
      brakeValue = record.rpm ? physics.calcWattByRpmAndNewton(record.rpm, newton) : 200
      if (record.rpm) { watt = brakeValue }
      break

    case appConst.step.types.AUTO_NEWTON:
      newton = step.newton
      if (step.offsetTableUse) {
        switch (currStep.offsetTableType) {
          case 10:
            offsetTableName = tConst.offset.tableNames.NEWTON
            break
        }
        if (offsetTableName) {
          newton = calcOffsetTableValue(offsetTableName, newton, Number(step.rpm) || 0, record.rpm)
        }
      }
      brakeValue = record.rpm ? physics.calcWattByRpmAndNewton(record.rpm, newton) : 200
      if (record.rpm) { watt = brakeValue }
      break

    case appConst.step.types.PROGRESSION_NEWTON:
      newton = step.progressionStartNewton +
        ((step.progressionStepNewton && step.progressionStepNewtonTime) ?
        Math.floor(tick/trans.secToTicks(step.progressionStepNewtonTime))*step.progressionStepNewton
        : 0)
      brakeValue = record.rpm ? physics.calcWattByRpmAndNewton(record.rpm, newton) : parseInt(step.watt) || 200
      rpm = !(step.progressionStepRpm && step.progressionStepRpmTime) ?
        step.progressionStartRpm
        : Number(step.progressionStartRpm) +
          Math.floor(tick/trans.secToTicks(step.progressionStepRpmTime))*step.progressionStepRpm
      break

    // TODO
    case appConst.step.types.BPM: {
      const secondsPassed = trans.ticksToSec(tick)
      const subStepNumber = secondsPassed < step.firstStepDuration ? 0
        : Math.max(1, Math.ceil( (secondsPassed - step.firstStepDuration) / step.nextStepsDuration))
      const baseValue = Math.max(0, step.wattThreshold - (step.bpmThreshold - step.bpmReference)*step.wattPerBpm) || 0
      let coefficient = step.coefficient * (!step.halve ? 1 : Math.pow(2, subStepNumber - 1))
      if (coefficient > 16 ) { coefficient = 2 }
      let progressionValue = (subStepNumber === 0 || record.bpm <= 0) ? baseValue
        : ((secondsPassed - step.firstStepDuration) % step.nextStepsDuration !== 0 ) ? state.progressionValue
        : Math.max(0, state.progressionValue + (step.bpmReference - record.bpm)*step.wattPerBpm/coefficient)
      brakeValue = parseInt(progressionValue)

      return calcPlusMinusAndReturnState({...tmpState,
        stepTickCounter,
        brakeModeRequired: brakeConst.modes.WATT,
        brakeValueRequired: progressionValue,
        previousTrainingValue: progressionValue,
        progressionValue,
      }, mdStatus.keyPlusPressed, mdStatus.keyMinusPressed, timestamp)

      break
    }


  }

  let tickData = {
    brakeMode,
    brakeValue,
  }
  watt && tickData.watt = watt
  rpm && tickData.rpm = rpm
  newton && tickData.newton = newton
  return tickData;
}*/
export default {
  getWorkoutRequirements,
  getWorkoutStepRequirements,
  getTestPIRecordsGroups,
  buildAutotestReportDataFromTestPI,
  getWorkoutType,
  getWorkoutCategoryText,
  isWorkoutType,
  isWorkoutCategory,
  getActivityType,
  isActivityType,
};
