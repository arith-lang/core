import { RuntimeException } from "../core/exceptions.js";
import { hasProperty } from "../core/utils.js";
import { makeKeyword } from "./utils.js";

export function getField(obj, field) {
  let value;
  if (hasProperty(obj, makeKeyword("dict"))) {
    value = obj[makeKeyword("dict")][field];
  } else {
    value = obj?.[field];
  }

  if (value === undefined) {
    throw new RuntimeException(`Field ${field} not found on object`);
  }

  if (typeof value === "function") {
    value = value.bind(obj);
  }

  return value;
}

export function addMetaProp(obj, prop, value) {
  const metaField = makeKeyword(prop);
  obj[metaField] = value;
}
