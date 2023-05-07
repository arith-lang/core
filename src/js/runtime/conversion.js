import { Cons } from "../core/cons.js";
import { makeFunction } from "./function.js";
import { addMetaProp, getMetaField } from "./object.js";

export function makeNumber(jsNum) {
  return jsNum;
}

export function makeBignum(jsBig) {
  return jsBig;
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

export function makeList(jsArr) {
  return Cons.from(jsArr);
}

export function makeVector(jsArr) {
  return jsArr;
}

export function makeObject(jsObj, constructor = jsObj.constructor) {
  let arithObj = {};
  arithObj[addMetaProp(arithObj, "type", "Object")];
  arithObj[addMetaProp(arithObj, "dict", jsObj)];
  arithObj[addMetaProp(arithObj, "constructor", constructor)];
  arithObj[addMetaProp(arithObj, "lang", "Arith")];
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

export function makeArithValue(jsVal) {
  switch (typeof jsVal) {
    case "number":
      return makeNumber(jsVal);
    case "bigint":
      return makeBignum(jsVal);
    case "string":
      return makeString(jsVal);
    case "boolean":
      return makeBoolean(jsVal);
    case "symbol":
      return makeSymbol(jsVal);
    case "undefined":
      return makeNil(jsVal);
    case "object":
      return jsVal === null
        ? makeNil(jsVal)
        : jsVal instanceof Map
        ? makeMap(jsVal)
        : jsVal instanceof Set
        ? makeSet(jsVal)
        : jsVal instanceof Date
        ? makeDate(jsVal)
        : jsVal instanceof RegExp
        ? makeRegExp(jsVal)
        : Array.isArray(jsVal)
        ? makeVector(jsVal)
        : makeObject(jsVal);
  }
}

export function makeJSObj(arithObj) {
  return getMetaField(arithObj, "dict");
}
