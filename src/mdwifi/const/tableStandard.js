/**
 * @format
 * @flow
 */
import type {WattOffset} from '../types/AppTypeDefinition';

const offsetTableStandard: Array<WattOffset> = [
  {rpm: -40, watt: -25},
  {rpm: -35, watt: -20},
  {rpm: -30, watt: -18},
  {rpm: -25, watt: -14},
  {rpm: -20, watt: -12},
  {rpm: -15, watt: -8},
  {rpm: -10, watt: -5},
  {rpm: -6, watt: -3},
  {rpm: -4, watt: -2},
  {rpm: 0, watt: 0},
  {rpm: 4, watt: -2},
  {rpm: 6, watt: -3},
  {rpm: 10, watt: -5},
  {rpm: 15, watt: -8},
  {rpm: 20, watt: -12},
  {rpm: 25, watt: -14},
  {rpm: 30, watt: -14},
  {rpm: 35, watt: -14},
  {rpm: 40, watt: -14},
  {rpm: 300, watt: -14},
];
export default offsetTableStandard;
