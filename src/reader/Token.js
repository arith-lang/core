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
   * @param {number} line
   * @param {number} col
   * @param {number} pos
   * @param {string} file
   * @param {string} trivia
   */
  constructor(type, value, line, col, pos, file, trivia) {
    this.type = type;
    this.value = value;
    this.srcloc = SrcLoc.new(line, col, pos, file);
    this.trivia = trivia;
  }

  /**
   * Static constructor for Token
   * @param {string} type
   * @param {string} value
   * @param {number} line
   * @param {number} col
   * @param {number} pos
   * @param {string} file
   * @param {string} trivia
   */
  static new(type, value, line, col, pos, file, trivia) {
    return new Token(type, value, line, col, pos, file, trivia);
  }
}
