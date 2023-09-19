/**
 * @typedef {import("../lexer/src-loc").SrcLoc} SrcLoc
 */

/**
 * @typedef Program
 * @prop {AST} body
 * @prop {SrcLoc} srcloc
 */

/**
 * @typedef Begin
 * @prop {AST[]} body
 * @prop {SrcLoc} srcloc
 */

/**
 * @typedef NumberLiteral
 * @prop {string} value
 * @prop {SrcLoc} srcloc
 */

/**
 * @typedef {Program|Begin|NumberLiteral} AST
 */
export const AST = {
  /**
   * Constructs a Program node
   * @param {Begin} body
   * @param {SrcLoc} srcloc
   * @returns {Program}
   */
  Program(body, srcloc) {
    return { body, srcloc };
  },

  /**
   * Constructs a Begin node
   * @param {AST[]} body
   * @param {SrcLoc} srcloc
   */
  Begin(body, srcloc) {
    return { body, srcloc };
  },

  /**
   * Constructs a NumberLiteral node
   * @param {string} value
   * @param {SrcLoc} srcloc
   */
  NumberLiteral(value, srcloc) {
    return { value, srcloc };
  },
};

export default AST;
