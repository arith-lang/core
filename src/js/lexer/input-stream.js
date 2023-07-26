/**
 * Manages the input position for the lexer
 * @class
 */
export class InputStream {
  /**
   * Constructor for InputStream
   * @param {string} input
   * @param {string} file
   */
  constructor(input, file) {
    this.input = input;
    this.file = file;
    this.pos = 0;
    this.line = 1;
    this.col = 1;
  }

  /**
   * Static constructor for InputStream
   * @param {string} input
   * @param {string} file
   * @returns {InputStream}
   */
  static new(input, file) {
    return new InputStream(input, file);
  }
}

export default InputStream;
