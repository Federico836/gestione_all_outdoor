/**
 * @format
 * @flow
 */
import logger from './logger';

export default class Timer {
  name: string;
  interval: number;
  func: (ticks: number) => any;
  timeoutID: ?TimeoutID;
  lastNow: number;
  lastDelay: number;
  _isRunning: boolean;
  isRunning: () => boolean;

  constructor(name: string = 'timer_name') {
    this.name = name;
    this._isRunning = false;
  }

  start = (
    interval: number,
    func: (ticks: number) => any,
    startDelay?: number = 0,
  ) => {
    logger.debug(
      `${this.name}: start, interval: ${interval}, startDelay: ${startDelay}`,
    );
    this.interval = interval;
    this.func = func;
    let offset = Math.max(0, interval - startDelay);
    this.lastNow = Date.now() - offset;
    this.lastDelay = interval;
    this._isRunning = true;
    this.timeoutID = setTimeout(this._tick, startDelay);
  };
  stop = () => {
    logger.debug(`${this.name}: stop`);
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    this.timeoutID = null;
    this._isRunning = false;
  };
  isRunning = () => this._isRunning;

  _tick = () => {
    logger.debug(`${this.name}: tick start`);
    let now = Date.now();
    let diffTickMs = now - (this.lastNow + this.lastDelay);
    // if (diffTickMs < 0) {
    //   debugger;
    // }
    logger.debug(
      `${this.name}: before tick calc: now ` +
        now +
        '; lastNow: ' +
        this.lastNow +
        '; lastDelay: ' +
        this.lastDelay,
    );
    let ticksDone =
      diffTickMs < this.interval ? 1 : Math.ceil(diffTickMs / this.interval);
    logger.debug(
      `${this.name}: diffTickMs: ${diffTickMs}, ticksDone: ${ticksDone}, lastDelay: ` +
        (this.interval - (diffTickMs % this.interval)),
    );
    let lastDelay = this.interval - (diffTickMs % this.interval);
    this.lastDelay = lastDelay;
    this.lastNow = now;
    clearTimeout(this.timeoutID);
    logger.debug(`${this.name}: asking for next tick after ${lastDelay} ms`);
    this.timeoutID = setTimeout(this._tick, lastDelay);
    this.func(ticksDone);
    logger.debug(`${this.name}: func done, tick end`);
  };
}
