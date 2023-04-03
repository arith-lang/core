import { isNewline } from "./utils.js";

/**
 * Manages the input string for the tokenizer
 * @class Input
 * @property {string} input
 * @property {string} file URL of the file being read
 * @property {number} line
 * @property {number} col
 * @property {number} pos
 */
export class Input {
  /**
   * Constructs the Input object
   * @param {string} input
   * @param {string} file
   */
  constructor(input, file) {
    this.input = input;
    this.file = file;
    this.line = 1;
    this.col = 1;
    this.pos = 0;
  }

  /**
   * Static constructor for Input
   * @param {string} input
   * @param {string} file
   */
  static new(input, file) {
    return new Input(input, file);
  }

  /**
   * Getter for length
   */
  get length() {
    return this.input.length();
  }

  /**
   * Checks to see if we're at the end of the input yet
   * @returns {boolean}
   */
  eof() {
    return this.pos >= this.length;
  }

  /**
   * Gets the character at this.pos + n position
   * @param {number} [n=1]
   * @returns {string}
   */
  lookahead(n = 1) {
    return this.input[this.pos + n];
  }

  /**
   * Gets the character at the current position and advances the input by 1
   */
  next() {
    const ch = this.input[this.pos];

    if (isNewline(ch)) {
      this.line++;
      this.col = 1;
    } else {
      this.col++;
    }

    this.pos++;
    return ch;
  }

  /**
   * Look at the current character without advancing the input
   * @returns {string}
   */
  peek() {
    return this.input[this.pos];
  }

  /**
   * @callback predicate
   * @param {string} current
   * @returns {boolean}
   */
  /**
   * Reads input while a condition is met
   * @param {predicate} test
   * @returns {string}
   */
  readWhile(test) {
    let result = "";

    while (test(this.peek()) && !this.eof()) {
      result += this.next();
    }

    return result;
  }

  /**
   * Skip the current character without returning it
   */
  skip() {
    this.pos++;
  }
}
