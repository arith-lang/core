/**
 * @typedef {import("./token-types").TokenTypes} TokenTypes
 */

/**
 * Represents a single lexeme in the language
 * @class
 */
export class Token {
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

export default Token;
