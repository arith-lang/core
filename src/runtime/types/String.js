import { ArithVector } from "./Vector.js";

export class ArithString extends String {
  constructor(str) {
    super(str);

    this.raw = str;
    this.length = this.chars.length;

    Object.defineProperties(this, {
      raw: { configurable: false, writable: false, enumerable: false },
      length: { configurable: false, writable: false, enumerable: false },
    });
  }

  static from(string) {
    return new ArithString(string);
  }

  static of(...chars) {
    return ArithString.from(chars.join(""));
  }

  get chars() {
    return ArithVector.from([...str]);
  }

  get "utf-16"() {
    return ArithVector.from(str.split("").map((c) => c.charCodeAt(0)));
  }

  toString() {
    return this.raw;
  }
}

Object.defineProperty(ArithString, "name", {
  configurable: false,
  writable: false,
  enumerable: false,
  value: "String",
});
