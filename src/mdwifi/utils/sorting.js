/**
 * @format
 * @flow
 */

import moment from 'moment';
import tConst from '../const/training';
import crypto from './crypto';
import training from './training';
import type {
  WorkoutCategoryType,
  WorkoutCategoryTypes,
} from '../const/training';
import type {Workout, Activity} from '../types/AppTypeDefinition';

const sortNumbersAsc = (a: number, b: number): number => a - b;
const sortNumbersDesc = (a: number, b: number): number => b - a;
const sortWorkouts = (left: Workout, right: Workout): number => {
  const noWkId = 99999999; // in future workout can be created on device and still not uploaded
  const lId = left.id || noWkId;
  const rId = right.id || noWkId;
  return rId - lId;
  // if (moment.isMoment(left) && moment.isMoment(right)) {
  //   let diff = right.updatedAt.diff(left.updatedAt)
  //   if (diff !== 0) return diff;
  // }
  // if (left.id && right.id) { return right.id - left.id }
  // return 0
};
const sortActivities = (left: Activity, right: Activity): number => {
  if (moment.isMoment(left.createdAt) && moment.isMoment(right.createdAt)) {
    return right.createdAt.diff(left.createdAt);
  }
  return 0;
};

const workoutCategoryTypes: WorkoutCategoryTypes = tConst.workout.categoryTypes;
const workoutCategoryTypesArr: Array<WorkoutCategoryType> = Object.values(
  workoutCategoryTypes,
);
// TODO: review, used in few files, move to ??
// const workoutTypeIs = (wk: Workout, type: string): boolean =>
//   String(wk.type || '').toLowerCase() === type.toLowerCase();

const getWorkoutCategory = (
  wk: Workout,
  userId: number,
): WorkoutCategoryType => {
  let categoryText = training.getWorkoutCategoryText(wk);

  if (categoryText) {
    if (categoryText.includes('htt')) {
      return workoutCategoryTypes.HTT;
    } else if (workoutCategoryTypesArr.includes(categoryText)) {
      // category exists in conf
      return categoryText;
    }
  } else if (
    crypto
      .decryptLicense(wk.license || '')
      .toLowerCase()
      .includes('gobat')
  ) {
    return workoutCategoryTypes.HTT;
  }
  if (training.isWorkoutType(wk, tConst.workout.types.AUTOTEST)) {
    return workoutCategoryTypes.AUTOTEST;
  }
  if (training.isWorkoutType(wk, tConst.workout.types.AUTOCAL)) {
    return workoutCategoryTypes.AUTOCAL;
  }
  if (training.isWorkoutType(wk, tConst.workout.types.AUTOGEST)) {
    return workoutCategoryTypes.AUTOGEST;
  }
  if (training.isWorkoutType(wk, tConst.workout.types.AUTOGEST_EVOLUTION)) {
    return workoutCategoryTypes.AUTOGEST_EVOLUTION;
  }
  if (training.isWorkoutType(wk, tConst.workout.types.PIT)) {
    return workoutCategoryTypes.PIT;
  }
  if (wk.trainerId != userId) {
    return workoutCategoryTypes.OTHER_TRAINERS;
  }
  if (training.isWorkoutType(wk, tConst.workout.types.FIT)) {
    return workoutCategoryTypes.FIT;
  }
  if (wk.trainerId == userId /* AND NOT FIT */) {
    return workoutCategoryTypes.WRITTEN_BY_USER;
  }
  return workoutCategoryTypes.UNKNOWN;
};

export default {
  sortNumbersAsc,
  sortNumbersDesc,
  sortWorkouts,
  sortActivities,
  getWorkoutCategory,
};
