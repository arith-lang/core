import { Cons } from "../core/cons.js";
import { addMetaField, getMetaField } from "./object.js";
import { ArithString } from "./types/String.js";
import { ArithVector } from "./types/Vector.js";

export function makeNumber(jsNum) {
  return jsNum;
}

export function makeBignum(jsBig) {
  return jsBig;
}

export function makeString(jsString) {
  let s = ArithString.from(jsString);
  addMetaField(s, "type", "String");
  addMetaField(s, "raw", s.raw);
  addMetaField(s, "length", makeNumber(s.length));
  addMetaField(s, "class", ArithString);
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
  if (jsArr instanceof Cons) {
    return jsArr;
  }

  return Cons.from(jsArr);
}

export function makeVector(jsArr) {
  let v = ArithVector.from(jsArr);
  addMetaField(v, "type", "Vector");
  addMetaField(v, "length", makeNumber(v.length));
  addMetaField(v, "data", v.data);
  addMetaField(v, "class", ArithVector);
  return v;
}

export function makeObject(jsObj, constructor = jsObj.constructor) {
  let arithObj = {};
  addMetaField(arithObj, "type", "Object");
  addMetaField(arithObj, "dict", jsObj);
  addMetaField(arithObj, "class", constructor);
  addMetaField(arithObj, "lang", "Arith");
  return arithObj;
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
        ? jsVal instanceof Cons
          ? jsVal
          : makeVector(jsVal)
        : makeObject(jsVal);
  }
}

export function makeJSObj(arithObj) {
  return getMetaField(arithObj, "dict");
}
