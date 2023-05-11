import equal from "fast-deep-equal";
import { addMetaField } from "../object.js";

export class ArithVector {
  constructor(...vals) {
    this.data = vals;
    this.length = vals.length;

    Object.defineProperties(this, {
      data: {
        configurable: false,
        writable: false,
        enumerable: false,
      },
      length: {
        configurable: false,
        writable: false,
        enumerable: false,
      },
    });
  }

  static from(iter) {
    return new ArithVector(...iter);
  }

  static of(...vals) {
    return ArithVector.from(vals);
  }

  *[Symbol.iterator]() {
    for (let val of this.data) {
      yield val;
    }
  }

  "equal?"(other) {
    return equal(this, other);
  }

  filter(fn) {
    return ArithVector.from(this.data.filter(fn));
  }

  forEach(fn) {
    this.data.forEach(fn);
  }

  map(fn) {
    return ArithVector.from(this.data.map(fn));
  }

  reduce(fn, init) {
    return this.data.reduce(fn, init);
  }

  toString() {
    return `[${this.data.map((v) => String(v))}]`;
  }
}

Object.defineProperty(ArithVector, "name", {
  configurable: false,
  writable: false,
  enumerable: false,
  value: "Vector",
});
