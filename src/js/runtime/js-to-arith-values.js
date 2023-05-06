// Currently these all just return JS values, but that will change

export function makeNumber(jsNum) {
  return jsNum;
}

export function makeString(jsString) {
  return jsString;
}

export function makeBoolean(jsBool) {
  return jsBool;
}

export function makeSymbol(jsSym) {
  return jsSym;
}

export function makeNil(nullOrUndefined) {
  return nullOrUndefined === null ? nullOrUndefined : null;
}

export function makeVector(jsArr) {
  return jsArr;
}

export function makeObject(jsObj) {
  return jsObj;
}

export function makeMap(jsMap) {
  return jsMap;
}

export function makeSet(jsSet) {
  return jsSet;
}

export function makeDate(jsDate) {
  return jsDate;
}

export function makeRegExp(jsRegExp) {
  return jsRegExp;
}
