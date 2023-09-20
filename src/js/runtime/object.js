import { Exception } from "../shared/exceptions.js";

export const hasField = (field, obj) => {
  return typeof obj[field] !== "undefined";
};

export const getField = (field, obj) => {
  const value = obj[field];

  if (typeof value === "undefined") {
    throw new Exception(`Field ${field} not found on object`);
  }

  if (typeof value === "function") {
    return value.bind(obj);
  }

  return value;
};
