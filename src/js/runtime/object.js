import { RuntimeException } from "../core/exceptions.js";
import { hasProperty } from "../core/utils.js";
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
    return ifFieldUndefined(field);
  }

  if (typeof value === "function") {
    value = value.bind(obj);
  }

  return value;
}

export function getKeywordField(obj, field) {
  const kw = makeKeyword(field);
  let value;
  if (hasDict(obj) && hasProperty(obj[makeKeyword("dict")], field)) {
    value = obj[makeKeyword("dict")][kw];
  } else {
    value = obj[kw];
  }

  if (value === undefined) {
    return ifFieldUndefined(kw.description);
  }

  if (typeof value === "function") {
    value = value.bind(obj);
  }

  return value;
}

export function addMetaField(obj, prop, value) {
  const metaField = makeKeyword(prop);
  obj[metaField] = value;
}

export function ifFieldUndefined(field) {
  throw new RuntimeException(`Field ${field} not found on object`);
}
