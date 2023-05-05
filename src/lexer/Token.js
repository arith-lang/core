import { SrcLoc } from "./SrcLoc.js";
import { TokenTypes } from "./TokenTypes.js";

/**
 * @class Token
 * @property {TokenTypes} type
 * @property {string} value
 * @property {SrcLoc} srcloc
 * @property {string} trivia
 */
export class Token {
  /**
   * Constructs a Token instance
   * @param {TokenTypes} type
   * @param {string} value
   * @param {SrcLoc} srcloc
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
   * @param {string} type
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   */
  static new(type, value, srcloc, trivia) {
    return new Token(type, value, srcloc, trivia);
  }

  /**
   * Checks to see if Token is a certain type
   * @param {TokenTypes} type
   */
  is(type) {
    return this.type === type;
  }
}
