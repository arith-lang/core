import TokenTypes from "./token-types.js";

export default class Token {
  /**
   * Constructor for Token
   * @param {TokenTypes} type
   * @param {string} value
   * @param {import("./src-loc.js").SrcLoc} srcloc
   */
  constructor(type, value, srcloc) {
    this.type = type;
    this.value = value;
    this.srcloc = srcloc;
  }

  /**
   * Static constructor for Token
   * @param {TokenTypes} type
   * @param {string} value
   * @param {import("./src-loc.js").SrcLoc} srcloc
   * @returns {Token}
   */
  static new(type, value, srcloc) {
    return new Token(type, value, srcloc);
  }
}
