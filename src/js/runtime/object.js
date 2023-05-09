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
    return errorIfFieldUndefined(
      typeof field === "symbol" ? field.description : field
    );
  }

  if (typeof value === "function") {
    value = value.bind(obj);
  }

  return value;
}

export function hasField(obj, field) {
  if (hasDict(obj)) {
    return typeof obj[makeKeyword("dict")][field] !== "undefined";
  }

  return typeof obj[field] !== "undefined";
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
    return errorIfFieldUndefined(kw.description);
  }

  if (typeof value === "function") {
    value = value.bind(obj);
  }

  return value;
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
  obj[metaField] = value;
}

export function errorIfFieldUndefined(field) {
  throw new RuntimeException(`Field ${field} not found on object`);
}
