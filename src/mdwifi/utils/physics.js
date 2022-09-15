/**
 * @format
 * @flow
 */
import {roller} from '../const/index';
import tableJarvis from '../const/tableJarvis';
import tableP30 from '../const/tableP30';
import tableP25 from '../const/tableP25';
import type {RollerType} from '../types';
const standardGravity = 9.80665; // m/s^2

// REVIEW: calcTorque
export const calcNewton = (watt: number, rpm: number): number => {
  if (rpm <= 0) {
    return 0;
  }
  return (watt * 60) / (2 * Math.PI * rpm);
};
// REVIEW: calcWattByRpmAndTorque
export const calcWattByRpmAndNewton = (rpm: number, newton: number): number => {
  if (newton <= 0 || rpm <= 0) {
    return 0;
  }
  return Math.round((2 * Math.PI * rpm * newton) / 60);
};

export const calcMassByTorqueAndArmLength = (torque: number, arm: number) => {
  return Number(torque / (arm / 1000) / standardGravity) || 0;
};

// slope < -7 problems
// export const calcSpeedByWattSlopeWeight = (watt: number, slope: number, weight: number) => {
//   const wattTmp = watt / 0.8 // ask Simone about this coefficient
//   const attrito = 0.01
//   const gravity = 9.81 // Acelerazione di gravità
//
//   const slopePerc = slope / 100
//   const slopeTmp = Math.sin(Math.atan(slopePerc))
//   const a = 0.021 // Coefficiente aereodinamico (pari a 0.021)
//   const b = 0 //
//   const c = (weight * (slopeTmp + attrito))
//   const d = -1 * wattTmp / gravity
//   const p = (3 * a * c - b * b) / 3 / a / a;
//   const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / 27 / a / a / a;
//   const qG = Math.pow(p/3, 3) + Math.pow(q/2, 2);
//   const al = Math.cbrt(-1*q/2 + Math.sqrt(qG))
//   const bl = Math.cbrt(-1*q/2 - Math.sqrt(qG))
//   const speed = al + bl
//   return speed
// }

export const calcSpeedByWattSlopeWeight = (
  watt: number,
  slope: number,
  weight: number,
) => {
  const wattTmp = Math.round(watt / 0.8); // ask Simone about this coefficient
  const a = 0.01; // attrito
  const k = 0.021; // Coefficiente aereodinamico (pari a 0.021)
  const g = 9.81; // Acelerazione di gravità
  const slopePerc = slope / 100;

  let v = 0;
  let wattCalc = 0;
  while (wattCalc < wattTmp) {
    v += 0.01;
    wattCalc = Math.round((weight * (slopePerc + a) + k * v * v) * v * g);
  }
  return Math.round(v * 100) / 100;
};
export const inchesToMm = (val: number) => val * 25.4;
export const calcCircleCircumferenceByDiameter = (diameter: number) =>
  diameter * Math.PI;
export const calcCircleCircumferenceByRadius = (radius: number) =>
  2 * radius * Math.PI;

export const calcSpeedByRpmSprocketsWheelCircumference = (
  rpm: number,
  front: number,
  rear: number,
  circumference: number,
): number => {
  return (rpm / 60) * (((front / rear) * circumference) / 1000);
};

export const msToKmh = (speedMs: number): number => (speedMs * 3600) / 1000;
export const kmhToMs = (speedKmh: number): number => (speedKmh * 1000) / 3600;

export const calcGearRatioBySpeedRpmWheelCircumference = (
  speed: number, // m/s
  rpm: number,
  circumference: number, // mm
): number => {
  return speed / ((rpm / 60) * (circumference / 1000));
};

export const calcRpmBySpeedGearRatioWheelCircumference = (
  speed: number, // m/s
  gearRatio: number,
  circumference: number, // mm
): number => {
  return (speed / gearRatio / (circumference / 1000)) * 60;
};

export const calcSpeedGravityBySlopeWeight = (
  slope: number,
  weight: number,
): number => {
  const theta = Math.atan(slope / 100);
  const Kd = 0.2452;
  const m = weight;
  const g = 9.81;
  const t = 60;
  // REVIEW Chiara "-1" koef
  const b = Math.sqrt((-1 * m * g * Math.sin(theta)) / Kd);
  const d = m / Math.sqrt(-1 * Kd * m * g * Math.sin(theta));
  const speed = b * Math.tanh(t / d);
  return speed;
};

export const getWheelCircumference = (rollerType: RollerType): ?number => {
  switch (rollerType) {
    case roller.types.P30:
      return tableP30.wheelCircumference;
    case roller.types.P25:
      return tableP25.wheelCircumference;
    case roller.types.JARVIS:
      return tableJarvis.wheelCircumference;
    case roller.types.UNKNOWN:
    default:
      return null;
  }
};

export const getBrakeArray = (
  rollerType: RollerType,
): ?Array<Array<{speed: number, power: number}>> => {
  switch (rollerType) {
    case roller.types.P30:
      return tableP30.brake;
    case roller.types.P25:
      return tableP25.brake;
    case roller.types.JARVIS:
      return tableJarvis.brake;
    case roller.types.UNKNOWN:
    default:
      return null;
  }
};

export const getJarvisWheelCircumference = () => {
  return tableJarvis.wheelCircumference;
}

export const getJarvisBrakeArray = () => {
  return tableJarvis.brake;
}

export const calcMinGearRatioByRollerTypeWattRpm = (
  rollerType: RollerType,
  wattRequired: number,
  rpmRequired: number,
): ?number => {
  const brakeArr = getBrakeArray(rollerType);
  const wheelCircumference = getWheelCircumference(rollerType);
  if (!brakeArr || !wheelCircumference) return null;
  const tmpArr = brakeArr[Math.max(0, brakeArr.length - 2)];
  const speedKmh = calcSpeedByBrakeAndPower(tmpArr, wattRequired); // km/h
  const speedMs = kmhToMs(speedKmh);
  return calcGearRatioBySpeedRpmWheelCircumference(
    speedMs,
    rpmRequired,
    wheelCircumference,
  );
};

export const calcPositionByRollerTypeGearRatioWattRpm = (
  rollerType: RollerType,
  gearRatio: number,
  wattRequired: number,
  rpmRequired: number,
): ?number => {
  let brakeArr = getBrakeArray(rollerType);
  let wheelCircumference = getWheelCircumference(rollerType);
  if (!brakeArr || !wheelCircumference) return null;
  const speedMs = calcSpeedByRpmSprocketsWheelCircumference(
    rpmRequired,
    gearRatio,
    1,
    wheelCircumference,
  ); // m/s
  const speedRequired = msToKmh(speedMs); // km/h
  // all objects in brakeArr[i] array ordered by speed ascending
  // finding index of first element where speed > required
  // let startFrom = Math.max(0, brakeArr[0].findIndex(e => e.speed > speedRequired) - 1)
  for (let i = 0, len = brakeArr.length; i < len; i++) {
    let tmpArr = brakeArr[i];
    let lastEl = tmpArr[tmpArr.length - 1];
    let {speed, power} = lastEl;
    // skip too low positions
    if (speed > speedRequired && power < wattRequired) {
      continue;
    }
    let watt = calcPowerByBrakeAndSpeed(tmpArr, speedRequired);
    if (watt >= wattRequired) {
      return i;
    }
  }
  return null;
};

export const calcPositionByRollerTypeRealSprocketsWattRpm = (
  type: RollerType,
  front: number,
  rear: number,
  wattRequired: number,
  rpmRequired: number,
): number => {
  let brakeArr:
    | typeof tableJarvis.brake
    | typeof tableP30.brake
    | typeof tableP25.brake;
  let wheelCircumference;
  switch (type) {
    case roller.types.P30:
      wheelCircumference = tableP30.wheelCircumference;
      brakeArr = tableP30.brake;
      break;
    case roller.types.P25:
      wheelCircumference = tableP25.wheelCircumference;
      brakeArr = tableP25.brake;
      break;
    case roller.types.JARVIS:
    default:
      wheelCircumference = tableJarvis.wheelCircumference;
      brakeArr = tableJarvis.brake;
      break;
  }
  const speedMs = calcSpeedByRpmSprocketsWheelCircumference(
    rpmRequired,
    front,
    rear,
    wheelCircumference,
  ); // m/s
  const speedRequired = (speedMs * 3600) / 1000; // km/h

  // all objects in brakeArr[i] array ordered by speed ascending
  // finding index of first element where speed > required
  // let startFrom = Math.max(0, brakeArr[0].findIndex(e => e.speed > speedRequired) - 1)

  let prevWatt = 0;
  let watt = 0;
  for (let i = 0, len = brakeArr.length; i < len; i++) {
    let tmpArr = brakeArr[i];
    let lastEl = tmpArr[tmpArr.length - 1];
    let {speed, power} = lastEl;
    // // skip too low positions
    if (speed > speedRequired && power < wattRequired && i !== len - 1) {
      continue;
    }
    if (i === len - 1) {
      return i;
    } // last position
    watt = calcPowerByBrakeAndSpeed(tmpArr, speedRequired);
    if (watt < wattRequired) {
      prevWatt = watt;
      continue;
    }
    return wattRequired - prevWatt <= (watt - prevWatt) / 2
      ? Math.max(1, i - 1)
      : i;
  }
  return brakeArr.length - 1;
};

export const calcSpeedByBrakeAndPower = (
  arr: Array<{speed: number, power: number}>,
  power: number,
): number => {
  const elPos = arr.findIndex(e => e.power > power);
  const startFrom = elPos === -1 ? arr.length - 2 : Math.max(0, elPos - 1);
  const before = arr[startFrom];
  const after = arr[startFrom + 1];
  return (
    before.speed +
    ((after.speed - before.speed) / (after.power - before.power)) *
      (power - before.power)
  );
};

export const calcPowerByBrakeAndSpeed = (
  arr: Array<{speed: number, power: number}>,
  speed: number,
): number => {
  const elPos = arr.findIndex(e => e.speed > speed);
  const startFrom = elPos === -1 ? arr.length - 2 : Math.max(0, elPos - 1);
  const before = arr[startFrom];
  const after = arr[startFrom + 1];
  return (
    before.power +
    ((after.power - before.power) / (after.speed - before.speed)) *
      (speed - before.speed)
  );
};

export const calcPowerByBrakeNumberRpmFrontRearAndWheelCircumference = (rpm, brake, front, rear, wheelCircumference) => {
  const arr = getJarvisBrakeArray();
  const speed = calcSpeedByRpmSprocketsWheelCircumference(rpm,front,rear,wheelCircumference);

  return calcPowerByBrakeAndSpeed(arr[brake],speed);

}

export default {
  calcNewton,
  calcWattByRpmAndNewton,
  calcSpeedByWattSlopeWeight,
  inchesToMm,
  calcCircleCircumferenceByDiameter,
  calcCircleCircumferenceByRadius,
  calcSpeedByRpmSprocketsWheelCircumference,
  calcSpeedGravityBySlopeWeight,
  calcPositionByRollerTypeRealSprocketsWattRpm,
  calcPositionByRollerTypeGearRatioWattRpm,
  calcGearRatioBySpeedRpmWheelCircumference,
  calcRpmBySpeedGearRatioWheelCircumference,
  msToKmh,
  kmhToMs,
  getWheelCircumference,
  calcMinGearRatioByRollerTypeWattRpm,
  calcMassByTorqueAndArmLength,
  calcPowerByBrakeNumberRpmFrontRearAndWheelCircumference
};
