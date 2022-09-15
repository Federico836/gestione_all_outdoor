/**
 * @format
 * @flow
 */
import type {NewtonOffset} from '../types/AppTypeDefinition';

const offsetTableNewton: Array<NewtonOffset> = [
  {rpm: -19, newton: 6},
  {rpm: -16, newton: 5},
  {rpm: -13, newton: 4},
  {rpm: -10, newton: 3},
  {rpm: -6, newton: 2},
  {rpm: -3, newton: 1},
  {rpm: 0, newton: 0},
  {rpm: 3, newton: -1},
  {rpm: 6, newton: -2},
  {rpm: 8, newton: -3},
  {rpm: 11, newton: -4},
  {rpm: 14, newton: -5},
  {rpm: 17, newton: -6},
  {rpm: 20, newton: -7},
  {rpm: 40, newton: -7},
  {rpm: 60, newton: -7},
  {rpm: 80, newton: -7},
  {rpm: 90, newton: -7},
  {rpm: 100, newton: -7},
  {rpm: 120, newton: -7},
];
export default offsetTableNewton;
