import { SrcLoc } from "../lexer/SrcLoc.js";
import { TokenTypes } from "../lexer/TokenTypes.js";

/**
 * @class MacroToken
 * @desc Altered token type for AST generated from reader macros
 * @property {TokenTypes} type
 * @property {string} value
 * @property {SrcLoc} srcloc
 * @property {string} trivia
 * @property {string} macro
 */
export class MacroToken {
  /**
   * Constructs a MacroToken
   * @param {TokenTypes} type
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   * @param {string} macro
   */
  constructor(type, value, srcloc, trivia, macro) {
    this.type = type;
    this.value = value;
    this.srcloc = srcloc;
    this.trivia = trivia;
    this.macro = macro;
  }

  /**
   * Static constructor for MacroToken
   * @param {TokenTypes} type
   * @param {string} value
   * @param {SrcLoc} srcloc
   * @param {string} trivia
   * @param {string} macro
   */
  static new(type, value, srcloc, trivia, macro) {
    return new MacroToken(type, value, srcloc, trivia, macro);
  }
}
