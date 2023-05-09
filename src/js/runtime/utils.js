export function isBrowser() {
  return typeof window !== undefined;
}

export function defer(func) {
  if (isBrowser()) {
    setTimeout(func, 0);
  } else {
    setImmediate(func);
  }
}

export function makeKeyword(str) {
  return Symbol.for(`:${str}`);
}

export function isKeyword(val) {
  return typeof val === "symbol" && val.description.startsWith(":");
}

export function isFalsy(val) {
  return val == null || val === false;
}
