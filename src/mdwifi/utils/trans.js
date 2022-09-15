/**
 * @format
 * @flow
 */

import moment from 'moment';
import appConst from '../const';
export const isNumeric = (n: any): boolean => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
export const ticksToSec = (n: number): number => {
  return (n / 1000) * appConst.statusInterval;
};
export const ticksToMSec = (n: number): number => {
  return n * appConst.statusInterval;
};
export const ticksToTimeString = (
  n: number = 0,
  format: ?string = 'HH:mm:ss',
): string => {
  return moment.utc(ticksToMSec(n)).format(format);
};
export const secToTicks = (n: number): number => {
  return (n * 1000) / appConst.statusInterval;
};
export const weightStrToWeight = (w: string, def: any = 75): number | any => {
  let wVal = parseFloat(String(w).replace(',', '.'));
  if (!isNaN(wVal)) {
    return wVal || def;
  }
  return def; // default weight if we cann't parse string
};
export const toInt = (str: mixed, def: number = 0): number => {
  const res = parseInt(str, 10);
  if (isNaN(res)) {
    return def;
  }
  return res;
};
export const stringToUInteger = (str: string): number =>
  Math.abs(parseInt(str, 10));

export default {
  isNumeric,
  ticksToSec,
  ticksToMSec,
  ticksToTimeString,
  secToTicks,
  weightStrToWeight,
  stringToUInteger,
  toInt,
};
