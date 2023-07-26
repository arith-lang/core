import { Exception } from "./exceptions.js";

export const fail = (msg) => {
  throw new Exception(msg);
};

export const isTruthy = (val) => val !== false && val != null;

export const isFalsy = (val) => !isTruthy(val);

export const isNil = (val) => val == null;

export const isIntWithinBounds = (int) =>
  int > Number.MIN_SAFE_INTEGER && int < Number.MAX_SAFE_INTEGER;
