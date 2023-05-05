/**
 * @class Exception
 * @desc Base Arith error class
 */
export class Exception extends Error {}

// defining this here to avoid circular dependency with lexer package
/**
 * @typedef SrcLoc
 * @property {number} line
 * @property {number} col
 * @property {number} pos
 * @property {string} file
 */
/**
 * @class SyntaxException
 * @desc Arith syntax error
 */
export class SyntaxException extends Exception {
  /**
   * Constructs a SyntaxException
   * @param {string} message
   * @param {SrcLoc} srcloc
   */
  constructor(message, srcloc) {
    const { line, col, file } = srcloc;
    super(`${message} in ${file} at ${line}:${col}`);
  }
}

/**
 * @class AssertException
 * @desc Arith assertion error, used in testing
 */
export class AssertException extends Exception {
  constructor(msg) {
    super(msg);
  }
}
