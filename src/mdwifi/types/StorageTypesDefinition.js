/**
 * @format
 * @flow
 */
export type Workout = {
  id: ?number,
  uuid: string,
  userId: ?number,
  userUuid: number,
  name: string,
  type: string,
  trainerId: number,
  baseId: ?number, // REVIEW id_scheletro
  license: string, // REVIEW
  notes: string,
  createdAt: string,
  updatedAt: string,
  // heartString?: string, // REVIEW
  // heart?: Heart,
  // steps?: Array<WorkoutStep>,
  // deleted: boolean,
};
