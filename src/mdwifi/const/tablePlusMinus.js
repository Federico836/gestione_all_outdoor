/**
 * @format
 * @flow
 */
import type {WattOffset} from '../types/AppTypeDefinition';

const offsetTablePlusMinus: Array<WattOffset> = [
  {rpm: -27, watt: -4},
  {rpm: -24, watt: -3},
  {rpm: -21, watt: -2},
  {rpm: -18, watt: -1},
  {rpm: -15, watt: 0},
  {rpm: -12, watt: 1},
  {rpm: -9, watt: 2},
  {rpm: -6, watt: 3},
  {rpm: -3, watt: 4},
  {rpm: 0, watt: 5},
  {rpm: 3, watt: 4},
  {rpm: 6, watt: 3},
  {rpm: 9, watt: 2},
  {rpm: 12, watt: 1},
  {rpm: 15, watt: 0},
  {rpm: 18, watt: -1},
  {rpm: 20, watt: -1},
  {rpm: 30, watt: -1},
  {rpm: 40, watt: -1},
  {rpm: 300, watt: -1},
];
export default offsetTablePlusMinus;
