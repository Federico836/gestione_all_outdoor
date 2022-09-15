/**
 * @format
 * @flow
 */
import MDTcpSocket from './MDTcpSocket';

// if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer
import EventEmitter from 'events';
import type {
  firmwareVersionObject,
  AntSettingsType,
  WifiSettingsType,
  rpmSensorType,
  bpmSensorType,
} from '../types/AppTypeDefinition';
import type {memDatType, memRunType} from '../types/TcpTypesDefinition';
import ant from '../const/ant';
import rpmS from '../const/rpmSensor';
import logger from '../utils/logger';
import appConst from '../const';
import hardKeys from '../const/hardKeys';

// our "constructor"
const create = () => {
  let socket = new MDTcpSocket(appConst.tcpSyncConn);
  // socket.setKeepAlive(true, 1000) // REVIEW
  logger.debug('tcp socket init');
  logger.debug(socket);
  let connected = false;
  let firmwareVersion: ?string;
  let firmware: firmwareVersionObject = {
    major: 0,
    minor: 0,
    minorLetter: 'A',
    equipment: 0,
  };
  let maxBrakePosition: ?number;
  let options = {
    host: '192.168.0.1',
    port: 1000,
    timeout: 3000,
  };
  let emitter = new EventEmitter();

  const getFirmwareObject = (): firmwareVersionObject => firmware;

  // signing buffer for now is adding byte with value of all other bytes XOR'ed
  const signBuffer = (buffer: Buffer) => {
    const bLength = buffer.length;
    let signedBuffer = Buffer.allocUnsafe(bLength + 1);
    buffer.copy(signedBuffer);
    // copy first byte to last one
    signedBuffer[bLength] = signedBuffer[0];
    // xor it by every byte from second till penultimate
    for (let i = 1; i < bLength; i++) {
      // eslint-disable-next-line no-bitwise
      signedBuffer[bLength] ^= signedBuffer[i];
    }
    return signedBuffer;
  };

  const WIFI_GET_FIRMWARE_VERSION = 0x20;
  const WIFI_GET_STATUS = 0x30;
  const WIFI_GET_MEMDAT = 0x80;
  const WIFI_GET_MEMRUN = 0x81;
  const WIFI_GET_MEMSTP = 0x82;
  const WIFI_GET_USER_BU1 = 0x83;
  const WIFI_GET_USER_BU2 = 0x84;

  const WIFI_SET_BRAKE_VALUE = 0x40;
  const WIFI_SET_BRAKE_MODE = 0x50;
  const WIFI_SET_BRAKE_VALUE_MODE = 0x55; // REVIEW
  const WIFI_SET_RESET_TIME_DISTANCE = 0x60;
  const WIFI_SET_MEMDAT = 0x70;
  const WIFI_SET_MEMRUN = 0x71;
  const WIFI_SET_MEMSTP = 0x72;
  const WIFI_SET_USER_BU1 = 0x73;
  const WIFI_SET_USER_BU2 = 0x74;
  const WIFI_SET_WORK_MODE = 0x90;
  const WIFI_SET_RESET_KEYS = 0x91;

  const commandBuffers: {[string]: Buffer} = {
    resetKeysPressedSigned: signBuffer(
      Buffer.from([0xd0, 0xf1, 0, 6, WIFI_SET_RESET_KEYS]),
    ),
    setWorkMode: Buffer.alloc(6).fill(
      Buffer.from([0xd0, 0xf1, 0, 7, WIFI_SET_WORK_MODE]),
    ),

    getFirmwareVersionSigned: signBuffer(
      Buffer.from([0xd0, 0xf1, 0, 6, WIFI_GET_FIRMWARE_VERSION]),
    ),
    getStatusSigned: signBuffer(
      Buffer.from([0xd0, 0xf1, 0, 6, WIFI_GET_STATUS]),
    ),
    setBrakeValue: Buffer.alloc(7).fill(
      Buffer.from([0xd0, 0xf1, 0, 8, WIFI_SET_BRAKE_VALUE]),
    ),
    setBrakeMode: Buffer.alloc(6).fill(
      Buffer.from([0xd0, 0xf1, 0, 7, WIFI_SET_BRAKE_MODE]),
    ),
    setBrakeValueMode: Buffer.alloc(8).fill(
      Buffer.from([0xd0, 0xf1, 0, 9, WIFI_SET_BRAKE_VALUE_MODE]),
    ),
    resetTimeDistanceSigned: signBuffer(
      Buffer.from([0xd0, 0xf1, 0, 6, WIFI_SET_RESET_TIME_DISTANCE]),
    ),
    setMemDat: Buffer.alloc(199).fill(
      Buffer.from([0xd0, 0xf1, 0, 0xc8, WIFI_SET_MEMDAT]),
    ), // TODO review alloc number
    setMemRun: Buffer.alloc(199).fill(
      Buffer.from([0xd0, 0xf1, 0, 0xc8, WIFI_SET_MEMRUN]),
    ), // TODO review alloc number
    setUserBU1: Buffer.alloc(199).fill(
      Buffer.from([0xd0, 0xf1, 0, 0xc8, WIFI_SET_USER_BU1]),
    ), // TODO review alloc number
    setUserBU2: Buffer.alloc(199).fill(
      Buffer.from([0xd0, 0xf1, 0, 0xc8, WIFI_SET_USER_BU2]),
    ), // TODO: review alloc number
    // setMemStp: Buffer.alloc(199).fill(Buffer.from([0xD0, 0xF1, 0, 0xC8, WIFI_SET_MEMSTP])), // should not be useed
    getMemDatSigned: signBuffer(
      Buffer.from([0xd0, 0xf1, 0, 6, WIFI_GET_MEMDAT]),
    ),
    getMemRunSigned: signBuffer(
      Buffer.from([0xd0, 0xf1, 0, 6, WIFI_GET_MEMRUN]),
    ),
    getMemStpSigned: signBuffer(
      Buffer.from([0xd0, 0xf1, 0, 6, WIFI_GET_MEMSTP]),
    ),
    getUserBUSigned: signBuffer(
      Buffer.from([0xd0, 0xf1, 0, 6, WIFI_GET_USER_BU1]),
    ),
    // getUserBU2Signed: signBuffer(Buffer.from([0xD0, 0xF1, 0, 6, WIFI_GET_USER_BU2])) // unused, all info sent on getUserBU1Signed request
  };

  const getSocket = () => socket;
  const getEmitter = () => emitter;
  const disconnect = () => {
    if (socket) {
      !socket.connecting && socket.end && socket.end();
      socket.connecting && socket.destroy && socket.destroy();
      socket._unregisterEvents && socket._subs && socket._unregisterEvents();
      socket.removeAllListeners && socket.removeAllListeners();
    }
    connected = false;
    socket = new MDTcpSocket(appConst.tcpSyncConn);
    socket.on('close', onCloseReceived);
    socket.on('data', onDataReceived);
    socket.on('error', onErrorReceived);
  };
  const connect = opt => {
    logger.debug('in connect');
    logger.debug(socket);
    logger.debug(socket.connected);
    if (connected) {
      disconnect();
    } // TODO already connected
    if (opt) {
      options = {
        host: opt.host || options.host,
        port: opt.port || options.port,
        // timeout: opt.timeout || options.timeout
      };
    }
    return new Promise<void>((resolve, reject) => {
      socket.once('connect', () => {
        connected = true;
        resolve();
      });
      socket.once('error', error => {
        connected = false;
        reject(error);
      });
      socket.once('close', (hadError: boolean) => {
        connected = false;
        reject(hadError);
      });
      socket.connect(options);
    });
  };

  const onCloseReceived = () => {
    connected = false;
    const error = 'tcp connection closed by MD';
    emitter.emit('connectionError', {error});
  };
  const onErrorReceived = error => {
    emitter.emit('connectionError', {error});
  };
  const onDataReceived = (data: Buffer) => {
    const buffer = Buffer.from(data);
    const bufferLength = buffer.length;
    if (bufferLength < 5 || buffer[0] !== 0) {
      return emitter.emit('unknownStructureDataReceived', {data: buffer});
    }
    // HEAD 5 bytes [start = 0x00, type, typeVersion, dataLengthLow, dataLengthHight]
    // body dataLength bytes
    const dataLength = buffer.readUInt16BE(3);
    // checksum 1 byte
    if (bufferLength !== 5 + dataLength + 1) {
      return emitter.emit('unknownStructureDataReceived', {data: buffer}); // TODO: REVIEW damaged package
    }
    const dataBuf = data.slice(5, -1);
    switch (data[1]) {
      case WIFI_GET_FIRMWARE_VERSION:
        firmwareVersion = dataBuf.toString('utf8').replace(/\0/g, '');
        let tmpArr = firmwareVersion.split('.');
        if (tmpArr.length > 2) {
          firmware = {
            major: Number(tmpArr[0]) || 0,
            equipment: Number(tmpArr[1]) || 0,
            minor: Number(tmpArr[2].substr(1)) || 0,
            minorLetter: tmpArr[2].substr(0, 1),
            text: firmwareVersion,
          };
          if (firmware.major >= 4) {
            maxBrakePosition = 30;
          } else if (firmware.major === 3) {
            maxBrakePosition = firmware.minorLetter === 'A' ? 25 : 30;
          } else if (firmware.major === 2) {
            maxBrakePosition = 25;
          } else if (firmware.major === 1) {
            maxBrakePosition = 6;
          }
        }
        return emitter.emit('firmwareVersionReceived', {
          version: firmwareVersion,
          maxBrakePosition,
          firmware,
        });

      case WIFI_GET_STATUS:
        return emitter.emit('statusReceived', {
          status:
            firmware && firmware.major >= 4
              ? convertBufferToStatusObject(dataBuf)
              : convertOldBufferToStatusObject(dataBuf),
        });
      case WIFI_GET_MEMDAT:
        return emitter.emit('memDatReceived', {
          memDat: convertBufferToMemDatObject(dataBuf),
        });
      case WIFI_GET_MEMRUN:
        return emitter.emit('memRunReceived', {
          memRun: convertBufferToMemRunObject(dataBuf),
        });
      case WIFI_GET_MEMSTP:
        return emitter.emit('memStpReceived', {
          memStp: convertBufferToMemStpObject(dataBuf),
        });
      case WIFI_GET_USER_BU1:
        return emitter.emit('userBU1Received', {
          userBU1: convertBufferToUserBU1Object(dataBuf),
        });
      case WIFI_GET_USER_BU2:
        return emitter.emit('userBU2Received', {
          userBU2: convertBufferToUserBU2Object(dataBuf),
        });

      case WIFI_SET_BRAKE_VALUE:
        return emitter.emit('setBrakeValueConfirm', {
          value: dataBuf.readInt16LE(0),
        });
      case WIFI_SET_BRAKE_MODE:
        return emitter.emit('setBrakeModeConfirm', {
          mode: dataBuf.readUInt8(0),
        });
      case WIFI_SET_BRAKE_VALUE_MODE:
        return emitter.emit('setBrakeValueModeConfirm', {
          value: dataBuf.readUInt16BE(0),
          mode: dataBuf.readUInt8(2),
        });
      case WIFI_SET_RESET_TIME_DISTANCE:
        return emitter.emit('sendResetTimeDistanceConfirm');
      case WIFI_SET_MEMDAT:
        return emitter.emit('setMemDatConfirm');
      case WIFI_SET_MEMRUN:
        return emitter.emit('setMemRunConfirm');
      case WIFI_SET_USER_BU1:
        return emitter.emit('setUserBU1Confirm');
      case WIFI_SET_USER_BU2:
        return emitter.emit('setUserBU2Confirm');
      // case WIFI_SET_MEMSTP: return emitter.emit('setMemStpConfirm') // REVIEW for not it should not be used
      // case WIFI_SET_USER_BU1 = 0x73 TODO
      // case WIFI_SET_USER_BU2 = 0x74 TODO
      case WIFI_SET_RESET_KEYS:
        return emitter.emit('resetKeysPressedConfirm');
      case WIFI_SET_WORK_MODE:
        return emitter.emit('setWorkModeConfirm', {mode: dataBuf.readUInt8(0)});
      default:
        return emitter.emit('unknownStructureDataReceived', {data: buffer});
    }
    // REVIEW
    // if (2 === bufferLength) {
    //   if (confirmByte < 2) {
    //     return emitter.emit('setBrakeModeConfirm', {mode: buffer.readUInt8(1)})
    //   }
    //   return emitter.emit('unknownStructureDataReceived', {data: buffer})
    //   // REVIEW SET_WORK_MODE CONFIRM??
    //   // if (confirmByte === 0x70) {
    //   //   return emitter.emit('setMemDatConfirm')
    //   // }
    // }
  };

  socket.on('close', onCloseReceived);
  socket.on('data', onDataReceived);
  socket.on('error', onErrorReceived);

  const getFirmwareVersion = () =>
    connected && socket.write(commandBuffers.getFirmwareVersionSigned);
  // const setFirmwareVersion = (version: string) => {
  //   firmwareVersion = version
  // }
  const getStatus = () => {
    // logger.debug('getStatus start')
    // logger.debug(connected)
    // logger.debug(commandBuffers.getStatusSigned)
    // logger.debug(socket)
    // if (!connected) return false;
    // let result = socket.write(commandBuffers.getStatusSigned)
    // logger.debug("getStatus result %s", result)
    // return result
    return connected && socket.write(commandBuffers.getStatusSigned);
  };

  const resetKeysPressed = () =>
    connected && socket.write(commandBuffers.resetKeysPressedSigned);
  const setWorkMode = (mode: number) => {
    if (!connected) {
      return false;
    }
    let buffer = Buffer.from(commandBuffers.setWorkMode);
    buffer.writeUInt8(Math.max(0, mode), 5); // writes value into 5 byte
    return socket.write(signBuffer(buffer));
  };
  const setBrakeMode = (mode: number) => {
    if (!connected) {
      return false;
    }
    let buffer = Buffer.from(commandBuffers.setBrakeMode);
    buffer.writeUInt8(Math.max(0, mode), 5); // writes value into 5 byte
    return socket.write(signBuffer(buffer));
  };
  const setBrakeValue = (value: number) => {
    if (!connected) {
      return false;
    }
    let buffer = Buffer.from(commandBuffers.setBrakeValue);
    buffer.writeInt16BE(value, 5); // writes value into 5 and 6 bytes
    return socket.write(signBuffer(buffer));
  };
  const setBrakeValueMode = (value: number, mode: number) => {
    if (!connected) {
      return false;
    }
    let buffer = Buffer.from(commandBuffers.setBrakeValueMode);
    buffer.writeUInt16BE(Math.max(0, value), 5); // writes value into 5 and 6 bytes
    buffer.writeUInt8(Math.max(0, mode), 7); // writes value into 7 byte
    return socket.write(signBuffer(buffer));
  };
  const resetTimeDistance = () =>
    connected && socket.write(commandBuffers.resetTimeDistanceSigned);
  const setMemDat = (buffer: Buffer) => {
    if (!connected) {
      return false;
    }
    let buff = Buffer.from(commandBuffers.setMemDat);
    return socket.write(signBuffer(buff.fill(buffer, 5, 199)));
  };
  const setMemRun = (buffer: Buffer) => {
    if (!connected) {
      return false;
    }
    let buff = Buffer.from(commandBuffers.setMemRun);
    return socket.write(signBuffer(buff.fill(buffer, 5, 199)));
  };
  const setUserBU1 = (buffer: Buffer) => {
    if (!connected) {
      return false;
    }
    let buff = Buffer.from(commandBuffers.setUserBU1);
    return socket.write(signBuffer(buff.fill(buffer, 5, 199)));
  };
  const setUserBU2 = (buffer: Buffer) => {
    if (!connected) {
      return false;
    }
    let buff = Buffer.from(commandBuffers.setUserBU2);
    return socket.write(signBuffer(buff.fill(buffer, 5, 199)));
  };
  // const setMemStp = () => {}
  const getMemDat = () =>
    connected && socket.write(commandBuffers.getMemDatSigned);
  const getMemRun = () =>
    connected && socket.write(commandBuffers.getMemRunSigned);
  const getMemStp = () =>
    connected && socket.write(commandBuffers.getMemStpSigned);
  const getUserBU = () =>
    connected && socket.write(commandBuffers.getUserBUSigned);
  // const getUserBU2 = () => connected && socket.write(commandBuffers.getUserBU2Signed)

  // convertion functions start
  // eslint-disable-next-line no-bitwise
  const bit_test = (num, bit) => (num >> bit) % 2 != 0;
  // eslint-disable-next-line no-bitwise
  const bit_set = (num, bit) => num | (1 << bit);
  // eslint-disable-next-line no-bitwise
  const bit_clear = (num, bit) => num & ~(1 << bit);

  const convertOldBufferToStatusObject = (buffer: Buffer) => {
    const timestamp = Date.now();
    const keysPressed = buffer.readUInt8(107);
    // const keysByte = buffer.readUInt8(107)
    // const keyPlusPressed = bit_test(keysByte, 0)
    // const keyMinusPressed = bit_test(keysByte, 1)
    let status = {
      timestamp,
      speed: buffer.readUInt32LE(0) / 10, // Velocita,
      watt: buffer.readUInt32LE(4), // Potenza
      Spazio: buffer.readUInt32LE(8),
      Tempo: buffer.readUInt32LE(12),
      SpazioTOT: buffer.readUInt32LE(16),
      TempoTOT: buffer.readUInt32LE(20),
      brakeValueRequired: buffer.readInt16LE(24), // StatoFreno
      SviluppoRuota: buffer.readInt16LE(26),
      bpm: buffer.readUInt32LE(28), //hr
      rpm: buffer.readUInt32LE(32), // Cadenza
      timer: buffer.readUInt32LE(36),
      timerP: buffer.readUInt32LE(40),
      motore: buffer.readUInt32LE(44),
      temperatura: buffer.readInt16LE(48) / 10,
      brakeMode: buffer.readInt16LE(50), // statoauto
      DeviceNumPC_SRM: buffer.readInt16LE(52),
      DeviceNumBP: buffer.readInt16LE(54),
      DeviceNumHRM: buffer.readInt16LE(56),
      DeviceNumBSC: buffer.readInt16LE(58),
      DeviceNumBC: buffer.readInt16LE(60),
      DeviceNumBS: buffer.readInt16LE(62),
      DeviceNumCTRL: buffer.readInt16LE(64),
      FreqZeroBP: buffer.readInt16LE(76),
      SlopeBP: buffer.readInt16LE(78),
      workmodeUSB: buffer.readInt16LE(80),
      wRif: buffer.readInt16LE(82),
      tipoGestione: buffer.readInt16LE(84),
      faseGestione: buffer.readInt16LE(86),
      rangeMOT: buffer.readInt16LE(88),
      diff: buffer.readInt16LE(90),
      meta: buffer.readUInt16LE(92),
      metaf: buffer.readUInt32LE(94) / 100,
      csfo: buffer.readInt16LE(98),
      PotenzaDebug: buffer.readUInt32LE(100),
      NumeroFreno: buffer.readInt16LE(104),
      WorkMode: buffer.readUInt8(106),
      // keyPlusPressed,
      // keyMinusPressed,
      keysPressed,
      originalBuffer: buffer,
    };
    if (!firmware) {
      return status;
    }

    if (firmware.minor < 36) {
      return status;
    }
    status.wFirmware = Array.prototype.join.call(
      [
        buffer.readUInt16LE(108),
        buffer.readUInt16LE(110),
        buffer.readUInt16LE(112),
        buffer.readUInt16LE(114),
      ],
      '.',
    );
    status.wBootloader = buffer.readUInt16LE(116);
    status.wTcpIp = buffer.readUInt16LE(118);
    status.wHw = buffer.readUInt16LE(120);

    if (firmware.minor < 42) {
      return status;
    }
    status.SerialExt_SRM = buffer.readUInt32LE(122);
    status.SerialExt_BP = buffer.readUInt32LE(126);
    status.SerialExt_HRM = buffer.readUInt32LE(130);
    status.SerialExt_BSC = buffer.readUInt32LE(134);
    status.SerialExt_BC = buffer.readUInt32LE(138);
    status.SerialExt_BS = buffer.readUInt32LE(142);
    status.SerialExt_CTRL = buffer.readUInt32LE(146);
    status.SerialExt_FEC = buffer.readUInt32LE(150);
    // dummy_SerialExt[4]; [154 - 170)
    status.FEC = buffer.readInt16LE(170);
    status.TrackResistance = buffer.readInt16LE(172); // REVIEW UInt16 ?? <= ask Luca

    return status;
  };

  const convertBufferToStatusObject = (buffer: Buffer) => {
    const timestamp = Date.now();
    const batteryPercentsData = buffer.readInt16LE(100);
    const batteryIsCharging = batteryPercentsData >= 1000;
    const batteryPercent = batteryIsCharging
      ? batteryPercentsData - 1000
      : batteryPercentsData;
    const keysPressed = buffer.readUInt8(111);
    // const keysByte = buffer.readUInt8(111)
    // const keyPlusPressed = bit_test(keysByte, 0)
    // const keyMinusPressed = bit_test(keysByte, 1)
    /*
    readInt16LE   Wvar       InvW
    readInt32LE   sDWvar     sInvDW
    readUInt16LE
    readUInt32LE  DWvar      InvDW
    */
    let status = {
      timestamp,
      brakeMode: buffer.readInt16LE(0),
      brakeValueRequired: buffer.readInt16LE(2), // StatoFreno
      numF: buffer.readInt16LE(4),
      bpm: buffer.readUInt32LE(6), // HeartRate
      rpm: buffer.readUInt32LE(10), // Cadenza
      speed: buffer.readUInt32LE(14) / 10, // Velocita
      watt: buffer.readUInt32LE(18), // Potenza REVIEW int
      wattDebug: buffer.readInt32LE(22), // PotenzaDebug REVIEW uint
      temperatura: buffer.readInt16LE(26) / 10,
      GiriRuota: buffer.readUInt32LE(28),
      TimeAllenamento: buffer.readUInt32LE(32),
      Motore: buffer.readInt16LE(36),
      MotPos: buffer.readInt16LE(38),
      MotTemp: buffer.readInt16LE(40),
      MotVolt: buffer.readInt16LE(42),
      timerR: buffer.readUInt32LE(44),
      timerP: buffer.readUInt32LE(48),
      DeviceNumBP: buffer.readInt16LE(52),
      DeviceNumHRM: buffer.readInt16LE(54),
      DeviceNumBSC: buffer.readInt16LE(56),
      DeviceNumBC: buffer.readInt16LE(58),
      DeviceNumBS: buffer.readInt16LE(60),
      DeviceNumFEC: buffer.readInt16LE(62),
      DeviceNumCTRL: buffer.readInt16LE(64),
      // buff += 13 * sizeof(UInt16); => 66 + 13*2 = 66 + 26 = 92
      FreqZeroBP: buffer.readInt16LE(92),
      SlopeBP: buffer.readInt16LE(94),
      wattRif: buffer.readInt16LE(96),
      voltBatteria: buffer.readInt16LE(98),
      // percBatteria: buffer.readInt16LE(100), // +1000 if connected via cable
      batteryIsCharging,
      batteryPercent,
      adcBatteria: buffer.readInt16LE(102),
      TimerT: buffer.readUInt32LE(104),
      TrackResistance: buffer.readInt16LE(108), // REVIEW UInt16 ?? <= ask Luca
      WorkMode: buffer.readUInt8(110),
      // KeyPressed: buffer.readUInt8(111),
      // keyPlusPressed,
      // keyMinusPressed,
      keysPressed,
      originalBuffer: buffer,
    };
    if (!firmware) {
      return status;
    }

    if (firmware.minor < 19) {
      return status;
    }
    status.GiriPedale = buffer.readUInt32LE(112);
    status.TimerRCum = buffer.readUInt32LE(116);
    status.TimerPCum = buffer.readUInt32LE(120);
    status.worktime = buffer.readUInt32LE(124);
    status.wFirmware = Array.prototype.join.call(
      [
        buffer.readUInt16LE(128),
        buffer.readUInt16LE(130),
        buffer.readUInt16LE(132),
        buffer.readUInt16LE(134),
      ],
      '.',
    );
    status.wBootloader = buffer.readUInt16LE(136);
    status.wTcpIp = buffer.readUInt16LE(138);
    status.wHw = buffer.readUInt16LE(140);

    if (firmware.minor < 22) {
      return status;
    }
    status.FEC = buffer.readInt16LE(142);
    if (firmware.minor < 29) {
      return status;
    }
    status.MotModel = buffer.readInt16LE(144);
    status.fTEST = buffer.readUInt8(146);
    status.blocked = buffer.readUInt8(147) !== 0;
    status.worktimeService1 = buffer.readUInt32LE(148);
    status.worktimeService2 = buffer.readUInt32LE(152);

    return status;
  };
  const convertBufferToUserBU1Object = (buffer: Buffer): userBU1 => {
    // 0 - 194
    // 17 - 117
    const MAX_FRENO_LIMITE = 50;
    let Freno_Pos = [];
    let pos = 17;
    let i = 0;
    while (i < MAX_FRENO_LIMITE) {
      Freno_Pos.push(buffer.readInt16LE(pos));
      pos += 2;
      i++;
    }
    // 117 - 177
    const MAX_DRV_STEPS = 10;
    let Tab_WattDiff = [];
    let Tab_Inc = [];
    let Tab_Dec = [];
    // pos = 117
    i = 0;
    while (i < MAX_DRV_STEPS) {
      Tab_WattDiff.push(buffer.readUInt16LE(pos));
      pos += 2;
      Tab_Inc.push(buffer.readInt16LE(pos));
      pos += 2;
      Tab_Dec.push(buffer.readInt16LE(pos));
      pos += 2;
      i++;
    }

    return {
      btName: buffer.toString('utf8', 0, 17).replace(/\0/g, ''),
      Freno_Pos,
      Tab_WattDiff,
      Tab_Inc,
      Tab_Dec,
      SRM_Serial: buffer.readUInt16LE(177),
      BP_Serial: buffer.readUInt16LE(179),
      bpmSensor: {
        serial: buffer.readUInt16LE(181), // HRM_Serial: buffer.readUInt16LE(2),
      },
      rpmSensor: {
        serials: {
          SPEED_CADENCE: buffer.readUInt16LE(183), // BSC_Serial: buffer.readUInt16LE(4),
          CADENCE: buffer.readUInt16LE(185), // BC_Serial: buffer.readUInt16LE(6),
        },
      },
      BS_Serial: buffer.readUInt16LE(187),
      userBU1OriginalBuffer: buffer,
      // dummy_Serial1 189-190
      // dummy_Serial2 191-192
      // dummy_Serial3 193-
    };
  };
  const buildUserBU1 = (
    buff: Buffer,
    settings: {rpmSensor: ?rpmSensorType, bpmSensor: ?bpmSensorType},
  ): ?Buffer => {
    if (buff.length !== 194) {
      return null;
    }
    let buffer = Buffer.from(buff);
    if (settings.bpmSensor) {
      buffer.writeUInt16LE(Math.max(0, settings.bpmSensor.serial), 181);
    }
    if (settings.rpmSensor && settings.rpmSensor.serials) {
      const serials = settings.rpmSensor.serials;
      buffer.writeUInt16LE(Math.max(0, serials.SPEED_CADENCE), 183);
      buffer.writeUInt16LE(Math.max(0, serials.CADENCE), 185);
    }
    return buffer;
  };
  const convertBufferToUserBU2Object = (buffer: Buffer): userBU2 => {
    // dummy_Serial3 -0
    // dummy_Serial4 1-2
    // dummy_Serial5 3-4
    // dummy_Serial6 5-6
    const antTXenabled = buffer.readUInt8(139);
    let userBU2 = {
      BPOffset: buffer.readUInt16LE(7),
      BPOffsetAuto: buffer.readUInt16LE(9),
      BPSlope: buffer.readUInt16LE(11),
      BPSlopeAuto: buffer.readUInt16LE(13),
      BPSmooth: buffer.readUInt16LE(15),
      RapportoRuota: buffer.readUInt16LE(17),
      SviluppoRuota: buffer.readUInt16LE(19),
      KEY_PowerStep: buffer.readUInt16LE(21),
      RifTemperature: buffer.readUInt16LE(23),
      CoffCorrTemp: buffer.readUInt16LE(25),
      wifi: {
        mode: buffer.readUInt8(27), // //1=STA 2=AP
        addr: Array.prototype.join.call(buffer.slice(28, 32), '.'),
        mask: Array.prototype.join.call(buffer.slice(32, 36), '.'),
        gateway: Array.prototype.join.call(buffer.slice(36, 40), '.'),
        port: buffer.readUInt16LE(40),
        name: buffer.toString('utf8', 42, 74).replace(/\0/g, ''),
        password: buffer.toString('utf8', 74, 137).replace(/\0/g, ''),
      },
      rpmSensor: {
        type: buffer.readUInt8(137),
      },
      ant: {
        tx: bit_test(antTXenabled, 0)
          ? ant.modes.tx.FEC
          : bit_test(antTXenabled, 1)
          ? ant.modes.tx.POWER
          : ant.modes.tx.NO,
      },
      antRXenabled: buffer.readUInt8(138),
      userBU2OriginalBuffer: buffer,
    };

    if (!firmware || firmware.minor < 39) {
      return userBU2;
    }
    userBU2.dummyFEC = buffer.readInt8(140);

    userBU2.SerialExt_SRM = buffer.readUInt32LE(141);
    userBU2.SerialExt_BP = buffer.readUInt32LE(145);
    userBU2.SerialExt_HRM = buffer.readUInt32LE(149);
    userBU2.SerialExt_BSC = buffer.readUInt32LE(153);
    userBU2.SerialExt_BC = buffer.readUInt32LE(157);
    userBU2.SerialExt_BS = buffer.readUInt32LE(161);
    userBU2.SerialExt_CTRL = buffer.readUInt32LE(165);
    userBU2.SerialExt_FEC = buffer.readUInt32LE(169);
    // dummy_SerialExt[4]; [173 - 189)
    const channel = buffer.readUInt8(189);
    userBU2.wifi.channel = channel < 1 || channel > 11 ? 1 : channel;
    userBU2.ANT_ProxSearch = buffer.readUInt8(190);
    userBU2.offsetFEC = buffer.readInt16LE(191);

    return userBU2;
  };
  const buildUserBU2 = (
    buff: Buffer,
    settings: {
      wifi: ?WifiSettingsType,
      ant: ?AntSettingsType,
      rpmSensor: ?rpmSensorType,
    },
  ): ?Buffer => {
    if (buff.length !== 194) {
      return null;
    }
    let buffer = Buffer.from(buff);
    if (settings.wifi) {
      const wifi = settings.wifi;
      buffer.writeUInt8(Math.max(0, wifi.mode), 27);
      buffer.fill(ipStringToBuffer(wifi.addr), 28, 32);
      buffer.fill(ipStringToBuffer(wifi.mask), 32, 36);
      buffer.fill(ipStringToBuffer(wifi.gateway), 36, 40);
      buffer.writeUInt16LE(Math.max(0, wifi.port), 40);
      stringToBufferSize(wifi.name, 32).copy(buffer, 42);
      stringToBufferSize(wifi.password, 63).copy(buffer, 74);
      if (firmware && firmware.minor >= 39) {
        // REVIEW C22
        buffer.writeUInt8(Math.max(0, wifi.channel), 189);
      }
    }
    if (settings.ant) {
      let antTXenabled = buffer.readUInt8(139);
      antTXenabled = bit_clear(antTXenabled, 0);
      antTXenabled = bit_clear(antTXenabled, 1);
      switch (settings.ant.tx) {
        case ant.modes.tx.FEC:
          antTXenabled = bit_set(antTXenabled, 0);
          break;
        case ant.modes.tx.POWER:
          antTXenabled = bit_set(antTXenabled, 1);
          break;
      }
      buffer.writeUInt8(Math.max(0, antTXenabled), 139);
    }
    if (settings.rpmSensor && Number.isInteger(settings.rpmSensor.type)) {
      buffer.writeUInt8(Math.max(0, settings.rpmSensor.type), 137);
      let antRXenabled = buffer.readUInt8(138);
      antRXenabled = bit_set(antRXenabled, 0);
      antRXenabled = bit_set(antRXenabled, 1);
      switch (settings.rpmSensor.type) {
        case rpmS.types.MD_CABLE:
          antRXenabled = bit_clear(antRXenabled, 2);
          antRXenabled = bit_clear(antRXenabled, 3);
          antRXenabled = bit_clear(antRXenabled, 4);
          break;
        case rpmS.types.CADENCE:
          antRXenabled = bit_set(antRXenabled, 2);
          antRXenabled = bit_clear(antRXenabled, 3);
          antRXenabled = bit_clear(antRXenabled, 4);
          break;
        case rpmS.types.SPEED_CADENCE:
          antRXenabled = bit_clear(antRXenabled, 2);
          antRXenabled = bit_set(antRXenabled, 3);
          antRXenabled = bit_clear(antRXenabled, 4);
          break;
      }
      buffer.writeUInt8(Math.max(0, antRXenabled), 138);
    }
    return buffer;
  };
  const convertBufferToMemDatObject = (buffer: Buffer): memDatType => {
    /*readInt16LE   Wvar       InvW
    readInt32LE   sDWvar     sInvDW
    readUInt16LE
    readUInt32LE  DWvar      InvDW
    public byte mode;
    public byte[] addr;
    public byte[] mask;
    public byte[] gateway;
    public UInt16 port;
    public char[] name;
    public char[] password;
    public byte[] AntEnabled;
    public byte[] dummySetting;
    public UInt16 KEY_PowerStep;
    public byte[] dummyMEMDAT;
    public UInt16 crc;
    */
    const antBuf = buffer.slice(110, 117);
    let memDat = {
      wifi: {
        mode: buffer.readUInt8(0), // //1=STA 2=AP
        addr: Array.prototype.join.call(buffer.slice(1, 5), '.'),
        mask: Array.prototype.join.call(buffer.slice(5, 9), '.'),
        gateway: Array.prototype.join.call(buffer.slice(9, 13), '.'),
        port: buffer.readUInt16LE(13),
        name: buffer.toString('utf8', 15, 47).replace(/\0/g, ''),
        password: buffer.toString('utf8', 47, 110).replace(/\0/g, ''),
      },
      rpmSensor: {
        type:
          antBuf[2] === 1
            ? rpmS.types.SPEED_CADENCE
            : antBuf[3] === 1
            ? rpmS.types.CADENCE
            : rpmS.types.MD_CABLE,
      },
      ant: {
        tx:
          antBuf[5] === 1
            ? ant.modes.tx.FEC
            : antBuf[6] === 1
            ? ant.modes.tx.POWER
            : ant.modes.tx.NO,
        // rpm: antBuf[2] === 1 ? appConst.ant.rpm.SPEED_CADENCE : (antBuf[3] === 1 ? appConst.ant.rpm.CADENCE : appConst.ant.rpm.MD_CABLE),
      },
      // antEnabled: buffer.slice(49, 57),
      memDatDummySetting: buffer.slice(117, 130),
      KEY_PowerStep: buffer.readUInt16LE(130),
      fBPCadence: buffer.readUInt8(132),
      memDatOriginalBuffer: buffer,
    };

    if (!firmware || firmware.minor < 22) {
      return memDat;
    }
    const channel = buffer.readUInt8(133);
    memDat.wifi.channel = channel < 1 || channel > 11 ? 1 : channel;
    memDat.ANT_ProxSearch = buffer.readUInt8(134);

    return memDat;
  };
  const convertBufferToMemRunObject = (buffer: Buffer): memRunType => {
    /*readInt16LE   Wvar       InvW
    readInt32LE   sDWvar     sInvDW
    readUInt16LE
    readUInt32LE  DWvar      InvDW
    public Int16 BP_Serial;
    public Int16 HRM_Serial;
    public Int16 BSC_Serial;
    public Int16 BC_Serial;
    public Int16 BS_Serial;
    public Int16 FEC_Serial;
    public Int16 CTRL_Serial;
    public Int16[] dummy_Serial;
    public UInt16 BPOffset;
    public UInt16 BPOffsetAuto;
    public UInt16 BPSlope;
    public UInt16 BPSlopeAuto;
    public UInt16 BPSmooth;
    public UInt16 MediaCadenza;
    public UInt16 MediaVelocita;
    public Int16  OffsetFEC;
    public byte[] dummyMEMRUN;
    public UInt16 crc;*/
    let memRun = {
      BP_Serial: buffer.readUInt16LE(0),
      bpmSensor: {
        serial: buffer.readUInt16LE(2), // HRM_Serial: buffer.readUInt16LE(2),
      },
      rpmSensor: {
        serials: {
          SPEED_CADENCE: buffer.readUInt16LE(4), // BSC_Serial: buffer.readUInt16LE(4),
          CADENCE: buffer.readUInt16LE(6), // BC_Serial: buffer.readUInt16LE(6),
        },
      },
      BS_Serial: buffer.readUInt16LE(8),
      FEC_Serial: buffer.readUInt16LE(10),
      CTRL_Serial: buffer.readUInt16LE(12),
      // dummy_Serial: buffer.slice(14, 40),
      BPOffset: buffer.readUInt16LE(40),
      BPOffsetAuto: buffer.readUInt16LE(42),
      BPSlope: buffer.readUInt16LE(44),
      BPSlopeAuto: buffer.readUInt16LE(46),
      BPSmooth: buffer.readUInt16LE(48),
      MediaCadenza: buffer.readUInt16LE(50),
      MediaVelocita: buffer.readUInt16LE(52),
      OffsetFEC: buffer.readInt16LE(54),
      memRunOriginalBuffer: buffer,
    };
    if (!firmware || firmware.minor < 29) {
      return memRun;
    }
    memRun.fFisio = buffer.readUInt8(56);
    memRun.blocked = buffer.readUInt8(57) !== 0;
    return memRun;
  };

  const convertBufferToMemStpObject = (buffer: Buffer) => {
    // [17 - 116]
    const MAX_FRENO_LIMITE = 50;
    let Freno_Pos = [];
    let pos = 17;
    let i = 0;
    while (i < MAX_FRENO_LIMITE) {
      Freno_Pos.push(buffer.readInt16LE(pos));
      pos += 2;
      i++;
    }
    // [125 - 184]
    const MAX_DRV_STEPS = 10;
    let Tab_WattDiff = [];
    let Tab_Inc = [];
    let Tab_Dec = [];
    pos = 125;
    i = 0;
    while (i < MAX_DRV_STEPS) {
      Tab_WattDiff.push(buffer.readUInt16LE(pos));
      pos += 2;
      Tab_Inc.push(buffer.readInt16LE(pos));
      pos += 2;
      Tab_Dec.push(buffer.readInt16LE(pos));
      pos += 2;
      i++;
    }
    return {
      btName: buffer.toString('utf8', 0, 17).replace(/\0/g, ''), // [0 - 16]
      Freno_Pos, // [ 17 - 116]
      RifTemperature: buffer.readUInt16LE(117), // [117 - 118]
      CoffCorrTemp: buffer.readUInt16LE(119), // [119 - 120]
      RapportoRuota: buffer.readUInt16LE(121), // [121 - 122]
      SviluppoRuota: buffer.readUInt16LE(123), // [123 - 124]
      Tab_WattDiff,
      Tab_Inc,
      Tab_Dec,
      TempFAN: buffer.readUInt16LE(185), // [185 - 186]
      memStpOriginalBuffer: buffer,
    };
  };
  const buildMemDat = (
    buff: Buffer,
    settings: {
      wifi: ?WifiSettingsType,
      ant: ?AntSettingsType,
      rpmSensor: ?rpmSensorType,
    },
  ): ?Buffer => {
    if (buff.length !== 194) {
      return null;
    }
    let buffer = Buffer.from(buff);
    if (settings.wifi) {
      const wifi = settings.wifi;
      buffer.writeUInt8(Math.max(0, wifi.mode), 0);
      buffer.fill(ipStringToBuffer(wifi.addr), 1, 5);
      buffer.fill(ipStringToBuffer(wifi.mask), 5, 9);
      buffer.fill(ipStringToBuffer(wifi.gateway), 9, 13);
      buffer.writeUInt16LE(Math.max(0, wifi.port), 13);
      stringToBufferSize(wifi.name, 32).copy(buffer, 15);
      stringToBufferSize(wifi.password, 63).copy(buffer, 47);
      if (firmware && firmware.minor >= 22 && wifi.channel) {
        buffer.writeUInt8(Math.max(1, wifi.channel), 133);
      }
    }
    if (settings.ant) {
      buffer.fill(0, 115, 117);
      switch (settings.ant.tx) {
        case ant.modes.tx.FEC:
          buffer.writeUInt8(1, 115);
          break;
        case ant.modes.tx.POWER:
          buffer.writeUInt8(1, 116);
          break;
      }
    }
    if (settings.rpmSensor && Number.isInteger(settings.rpmSensor.type)) {
      buffer.fill(0, 112, 114);
      switch (settings.rpmSensor.type) {
        case rpmS.types.SPEED_CADENCE:
          buffer.writeUInt8(1, 112);
          break;
        case rpmS.types.CADENCE:
          buffer.writeUInt8(1, 113);
          break;
      }
    }
    // TODO ANT_ProxSearch
    return buffer; //.slice(0, buffer.length - 6) // REVIEW ...
    // return buffer.slice(0, buffer.length - 6) // REVIEW ...
  };
  const buildMemRun = (
    buff: Buffer,
    settings: {
      rpmSensor: ?rpmSensorType,
      bpmSensor: ?bpmSensorType,
      blocked?: boolean,
    },
  ): ?Buffer => {
    if (buff.length !== 194) {
      return null;
    }
    let buffer = Buffer.from(buff);
    if (settings.bpmSensor) {
      buffer.writeUInt16LE(Math.max(0, settings.bpmSensor.serial), 2);
    }
    if (settings.rpmSensor && settings.rpmSensor.serials) {
      const serials = settings.rpmSensor.serials;
      buffer.writeUInt16LE(Math.max(0, serials.SPEED_CADENCE), 4);
      buffer.writeUInt16LE(Math.max(0, serials.CADENCE), 6);
    }
    if (settings.blocked != null) {
      buffer.writeUInt8(settings.blocked === true ? 1 : 0, 57);
    }
    return buffer; // REVIEW
    // return buffer.slice(0, buffer.length - 6) // REVIEW ...
  };
  const stringToBufferSize = (str: string, size?: number): Buffer => {
    if (!size) {
      return Buffer.from(str, 'utf8');
    }
    let buf = Buffer.alloc(size);
    buf.write(str, 0, size, 'utf8');
    return buf;
  };
  const ipStringToBuffer = (str: string): Buffer => Buffer.from(str.split('.'));
  const bufferToIpString = (buf: Buffer): string =>
    Array.prototype.join.call(buf, '.');
  // convertion functions end

  return {
    connect,
    disconnect,
    getSocket,
    getEmitter,
    getFirmwareVersion,
    // setFirmwareVersion,
    getStatus,
    setBrakeMode,
    setBrakeValue,
    setBrakeValueMode,
    resetTimeDistance,
    getMemDat,
    buildMemDat,
    setMemDat,
    getMemRun,
    buildMemRun,
    setMemRun,
    // setMemStp,
    getMemStp,
    getUserBU,
    buildUserBU1,
    setUserBU1,
    buildUserBU2,
    setUserBU2,
    // getUserBU2,
    getFirmwareObject,
    resetKeysPressed,
    setWorkMode,
  };
};

export default {create};
