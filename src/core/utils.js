import { Exception } from "./exceptions.js";

export function isNullish(obj) {
  return obj == null;
}

export function hasProperty(obj, propName) {
  return !isNullish(obj?.[propName]);
}

export function hasMethod(obj, methodName) {
  return hasProperty(obj, methodName) && typeof obj[methodName] === "function";
}

export function fail(msg, exn = Exception) {
  throw new exn(msg);
}

export function mapToObject(map) {
  return Object.fromEntries(map.entries());
}
