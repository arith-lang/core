export function isNullish(obj) {
  return obj == null;
}

export function hasMethod(obj, methodName) {
  return !isNullish(obj?.[methodName]) && typeof obj[methodName] === "function";
}
