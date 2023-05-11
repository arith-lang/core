import { Cons } from "../../core/cons.js";

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
    return Cons.from([...str]);
  }

  get "utf-16"() {
    return Cons.from(str.split("").map((c) => c.charCodeAt(0)));
  }

  "equal?"(other) {
    if (!other instanceof ArithString && typeof other !== "string") {
      return false;
    } else if (typeof other === "string") {
      return this.raw === other;
    }

    return this.raw === other.raw;
  }

  lte(other) {
    if (!other instanceof ArithString && typeof other !== "string") {
      return false;
    } else if (typeof other === "string") {
      return this.raw <= other;
    }

    return this.raw <= other.raw;
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
