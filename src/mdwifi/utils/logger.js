/**
 * @format
 * @flow
 */

export const debug = (...args: Array<any>) => {
  console.debug.apply(console, [].slice.call(args));
};

export const info = (...args: Array<any>) => {
  console.info.apply(console, [].slice.call(args));
};

export const warn = (...args: Array<any>) => {
  console.warn.apply(console, [].slice.call(args));
};

export const error = (...args: Array<any>) => {
  console.error.apply(console, [].slice.call(args));
};

export const noop = (...args: Array<any>) => {};

const logger = __DEV__
  ? {debug, info, warn, error}
  : {debug: noop, info: noop, warn: noop, error: noop};

export default logger;
