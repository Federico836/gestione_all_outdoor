/**
 * @format
 * @flow
 */

import {i18n} from '../utils';
const wifiModes: $ReadOnly<{
  STATION_MODE: 1,
  ACCESS_POINT: 2,
}> = {
  STATION_MODE: 1,
  ACCESS_POINT: 2,
};
type Channel = $ReadOnly<{value: number, text: string}>;
type ChannelsArray = $ReadOnlyArray<Channel>;
const channelsArray: ChannelsArray = Array.from({length: 12}, (x, i) => i)
  .splice(1)
  .map((c: number) => {
    return {value: c, text: String(c)};
  });

const settings = {
  modes: wifiModes,
  modesArray: [
    {value: wifiModes.ACCESS_POINT, text: i18n.t('WifiSettings:Access Point')},
    {value: wifiModes.STATION_MODE, text: i18n.t('WifiSettings:Station Mode')},
  ],
  channelsArray,
  defaults: {
    mode: wifiModes.ACCESS_POINT,
    // addr: '192.168.0.1',
    // mask: '255.255.255.0',
    // gateway: '192.168.0.1',
    addr: '0.0.0.0',
    mask: '0.0.0.0',
    gateway: '0.0.0.0',
    port: 1000,
    password: '',
  },
};

export default settings;
