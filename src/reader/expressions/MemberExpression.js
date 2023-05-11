import { SrcLoc } from "../../lexer/SrcLoc.js";
import { Token } from "../../lexer/Token.js";

/**
 * @typedef {import("../CST").CST} CST
 */
/**
 * @class MemberExpression
 * @desc For object property access
 * @property {string} type
 * @property {CST} object
 * @property {Token} property
 * @property {SrcLoc} srcloc
 * @property {string} code
 */

export class MemberExpression {
  /**
   * Constructs a MemberExpression
   * @param {CST} object
   * @param {Token} property
   * @param {SrcLoc} srcloc
   * @param {string} code
   */
  constructor(object, property, srcloc, code) {
    this.type = "MemberExpression";
    this.object = object;
    this.property = property;
    this.srcloc = srcloc;
    this.code = code;
  }

  /**
   * Static constructor for MemberExpression
   * @param {CST} object
   * @param {Token} property
   * @param {SrcLoc} srcloc
   * @param {string} code
   * @returns {MemberExpression}
   */
  static new(object, property, srcloc, code) {
    return new MemberExpression(object, property, srcloc, code);
  }
}
