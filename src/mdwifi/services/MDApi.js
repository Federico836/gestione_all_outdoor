/**
 * @format
 * @flow
 */
import MDTcpApi from './MDTcpApi';
import type {firmwareVersionObject} from '../types/AppTypeDefinition';
// our "constructor"
const create = (type?: string = 'tcp') => {
  let api;
  let connectionType;
  switch (type) {
    case 'usb':
      throw 'not supported yet';
    case 'bt': //bluetooth
      throw 'not supported yet';
    case 'tcp':
    default:
      connectionType = 'tcp';
      api = MDTcpApi.create();
      break;
  }
  const getConnectionType = () => connectionType;
  const destroy = () => {
    switch (connectionType) {
      case 'usb':
        throw 'not supported yet';
      case 'bt': //bluetooth
        throw 'not supported yet';
      case 'tcp':
      default:
        let socket = getSocket();
        // socket && socket._unregisterEvents && socket._unregisterEvents()
        socket && socket.destroy && socket.destroy();
        break;
    }
  };
  const connect = opt => api.connect(opt);
  const disconnect = () => api.disconnect();
  const getFirmwareVersion = () => api.getFirmwareVersion();
  // const setFirmwareVersion = (version) => api.setFirmwareVersion(version)
  const getStatus = () => api.getStatus();
  const getSocket = () => api.getSocket();
  const getEmitter = () => api.getEmitter();
  const setBrakeMode = mode => api.setBrakeMode(mode);
  const setBrakeValue = value => api.setBrakeValue(value);
  const setBrakeValueMode = (value, mode) => api.setBrakeValueMode(value, mode);
  const resetTimeDistance = () => api.resetTimeDistance();

  const getMemDat = () => api.getMemDat();
  const buildMemDat = (buff: Buffer, settings: Object) =>
    api.buildMemDat(buff, settings);
  const setMemDat = (buff: Buffer) => api.setMemDat(buff);
  const getMemRun = () => api.getMemRun();
  const buildMemRun = (buff: Buffer, settings: Object) =>
    api.buildMemRun(buff, settings);
  const setMemRun = (buff: Buffer) => api.setMemRun(buff);
  const getMemStp = () => api.getMemStp();
  const getFirmwareObject = (): firmwareVersionObject =>
    api.getFirmwareObject();
  const resetKeysPressed = () => api.resetKeysPressed();
  const setWorkMode = (mode: number) => api.setWorkMode(mode);
  const getUserBU = () => api.getUserBU();
  const buildUserBU1 = (buff: Buffer, settings: Object) =>
    api.buildUserBU1(buff, settings);
  const setUserBU1 = (buff: Buffer) => api.setUserBU1(buff);
  const buildUserBU2 = (buff: Buffer, settings: Object) =>
    api.buildUserBU2(buff, settings);
  const setUserBU2 = (buff: Buffer) => api.setUserBU2(buff);
  /*
    setBrakeMode,
    setBrakeValue,
    resetTimeDistance,
    setMemDat,
    setMemRun,
    setMemStp,
    getMemDat,
    getMemRun,
    getMemStp
*/
  return {
    connect,
    disconnect,
    destroy,
    getConnectionType,
    getSocket,
    getEmitter,
    getFirmwareVersion,
    // setFirmwareVersion,
    getStatus,
    // setBrake, // REVIEW
    setBrakeMode,
    setBrakeValue,
    setBrakeValueMode,
    resetTimeDistance,
    getMemDat, // REVIEW change to speaking name
    buildMemDat,
    setMemDat,
    getMemRun,
    buildMemRun,
    setMemRun,
    getMemStp,
    getFirmwareObject,
    resetKeysPressed,
    setWorkMode,
    getUserBU,
    buildUserBU1,
    setUserBU1,
    buildUserBU2,
    setUserBU2,
  };
};

export default {create};
