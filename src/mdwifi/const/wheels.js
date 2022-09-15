/**
 * @format
 * @flow
 */
import type {WheelSizesArray} from '../types';
import {i18n} from '../utils';

export const wheelSizes: WheelSizesArray = [
  {value: 0, text: i18n.t('common:Custom')},
  {value: 26, text: '26', c: 2074},
  {value: 27.5, text: '27.5', c: 2194},
  {value: 28, text: '28', c: 2234},
  {value: 29, text: '29', c: 2314},
];
