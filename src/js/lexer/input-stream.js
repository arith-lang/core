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

  get length() {
    return this.input.length;
  }

  /**
   * Checks to see if we're at the end of the input
   * @returns {boolean}
   */
  eof() {
    return this.pos >= this.length;
  }

  /**
   * Gets the character n positions in front of this.pos
   * @param {number} [n=1]
   * @returns {string}
   */
  lookahead(n = 1) {
    return this.input[this.pos + n];
  }

  /**
   * Get the character at the current position and advance the stream
   * @returns {string}
   */
  next() {
    const ch = this.input[this.pos++];

    if (isNewline(ch)) {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }

    return ch;
  }

  /**
   * Get the character at the current position in the input stream
   * @returns {string}
   */
  peek() {
    return this.input[this.pos];
  }

  /**
   * @callback Predicate
   * @param {string} ch
   * @returns {boolean}
   */
  /**
   * Reads from the input while pred is true
   * @param {Predicate} pred
   * @returns {string}
   */
  readWhile(pred) {
    let str = "";
    while (pred(this.peek()) && !this.eof()) {
      str += this.next();
    }

    return str;
  }
}

export default InputStream;
