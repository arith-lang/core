import { Exception } from "./exceptions.js";

export function isNullish(obj) {
  return obj == null;
}

export function hasMethod(obj, methodName) {
  return !isNullish(obj?.[methodName]) && typeof obj[methodName] === "function";
}

export function fail(msg, exn = Exception) {
  throw new exn(msg);
}

export function mapToObject(map) {
  return Object.fromEntries(map.entries());
}
