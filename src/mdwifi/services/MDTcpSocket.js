/**
 * @format
 * @flow
 */
import {Socket} from 'react-native-tcp';
// import {logger} from '../utils';

export default class MDTcpSocket extends Socket {
  constructor(tcpSyncConn: boolean = false) {
    super();
    this.queue = [];
    this.waitingForResponse = false;
    this.tcpSyncConn = tcpSyncConn;
  }
  // TODO: review args type for flow
  connect = (...args) => {
    let result = super.connect.apply(this, args);
    // this.write = MDTcpSocket.prototype.write.bind(this);
    // this.setNoDelay(true)

    this.on('data', function(rData) {
      // logger.debug("Data received, ready to send next")
      // logger.debug(rData);
      if (!this.tcpSyncConn) {
        return;
      }
      this.waitingForResponse = false;
      if (this.queue.length) {
        const data = this.queue.shift();
        // logger.debug("Sending from queue")
        // logger.debug(data)
        this.write(data);
        return;
      }
      // logger.debug("No data in queue")
    });
    return result;
  };
  write = data => {
    // logger.debug("Write: sending...");
    // logger.debug(data);
    if (!this.tcpSyncConn) {
      return super.write(data);
    }
    if (this.waitingForResponse) {
      this.queue.push(data);
      return;
    }
    this.waitingForResponse = true;
    super.write(data);
  };

  // end(data) {
  //     logger.debug("Ending socket...");
  //     super.end(data);
  // }
}
