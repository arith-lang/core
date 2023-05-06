import { SrcLoc } from "../../lexer/SrcLoc.js";
import { Token } from "../../lexer/Token.js";

/**
 * @typedef {import("../CST").CST} CST
 */
/**
 * @class OptionalMemberExpression
 * @desc For object property access
 * @property {string} type
 * @property {CST} object
 * @property {Token} property
 * @property {SrcLoc} srcloc
 * @property {string} code
 */

export class OptionalMemberExpression {
  /**
   * Constructs a OptionalMemberExpression
   * @param {CST} object
   * @param {Token} property
   * @param {SrcLoc} srcloc
   * @param {string} code
   */
  constructor(object, property, srcloc, code) {
    this.type = "OptionalMemberExpression";
    this.object = object;
    this.property = property;
    this.srcloc = srcloc;
    this.code = code;
  }

  /**
   * Static constructor for OptionalMemberExpression
   * @param {CST} object
   * @param {Token} property
   * @param {SrcLoc} srcloc
   * @param {string} code
   * @returns {OptionalMemberExpression}
   */
  static new(object, property, srcloc, code) {
    return new OptionalMemberExpression(object, property, srcloc, code);
  }
}
