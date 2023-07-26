import { Exception } from "./exceptions.js";

export const fail = (msg) => {
  throw new Exception(msg);
};

export const isTruthy = (val) => val !== false && val != null;

export const isFalsy = (val) => !isTruthy(val);
