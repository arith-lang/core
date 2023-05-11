import { RuntimeException } from "../core/exceptions.js";
import { hasProperty, hasMethod as hM } from "../core/utils.js";
import { makeKeyword } from "./utils.js";

export function hasDict(obj) {
  return hasProperty(obj, makeKeyword("dict"));
}

export function isArithObj(obj) {
  const kw = makeKeyword("lang");
  return typeof obj === "object" && hasProperty(obj, kw) && obj[kw] === "Arith";
}

export function getField(obj, field) {
  let value;
  if (hasDict(obj)) {
    value = obj[makeKeyword("dict")][field];
  } else {
    value = obj?.[field];
  }

  if (value === undefined) {
    return errorIfFieldUndefined(
      typeof field === "symbol" ? field.description : field
    );
  }

  if (typeof value === "function") {
    value = hasDict(obj)
      ? value.bind(obj[makeKeyword("dict")])
      : value.bind(obj);
  }

  return value;
}

export function hasField(obj, field) {
  if (hasDict(obj)) {
    return hasProperty(obj[makeKeyword("dict")][field]);
  }

  return hasProperty(obj[field]);
}

export function hasMethod(obj, method) {
  if (hasDict(obj)) {
    return hM(obj[makeKeyword("dict")], method);
  }

  return hM(obj, method);
}

export function getKeywordField(obj, field) {
  const kw = makeKeyword(field);
  let value;
  if (hasDict(obj) && hasProperty(obj[makeKeyword("dict")], kw)) {
    value = obj[makeKeyword("dict")][kw];
  } else {
    value = obj[kw];
  }

  if (value === undefined) {
    return errorIfFieldUndefined(kw.description);
  }

  if (typeof value === "function") {
    value = value.bind(hasDict(obj) ? obj[makeKeyword("dict")] : obj);
  }

  return value;
}

export function setKeywordField(obj, field, value) {
  const kw = makeKeyword(field);
  if (hasDict(obj)) {
    obj[makeKeyword("dict")][kw] = value;
    return obj;
  }

  obj[kw] = value;
  return obj;
}

export function hasMetaField(obj, field) {
  const kw = makeKeyword(field);
  return hasProperty(obj, kw);
}

export function getMetaField(obj, field) {
  const kw = makeKeyword(field);
  const value = obj[kw];

  if (value === undefined) {
    return errorIfFieldUndefined(kw.description);
  }

  return value;
}

export function addMetaField(obj, prop, value) {
  const metaField = makeKeyword(prop);
  Object.defineProperty(obj, metaField, {
    configurable: false,
    writable: false,
    enumerable: false,
    value,
  });
}

export function errorIfFieldUndefined(field) {
  throw new RuntimeException(`Field ${field} not found on object`);
}
