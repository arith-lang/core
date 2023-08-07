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
   * @param {string} trivia
   */
  constructor(type, value, srcloc, trivia) {
    this.type = type;
    this.value = value;
    this.srcloc = srcloc;
    this.trivia = trivia;
  }

  /**
   * Static constructor for Token
   * @param {TokenTypes} type
   * @param {string} value
   * @param {import("./src-loc.js").SrcLoc} srcloc
   * @param {string} trivia
   * @returns {Token}
   */
  static new(type, value, srcloc, trivia) {
    return new Token(type, value, srcloc, trivia);
  }
}

export default Token;
