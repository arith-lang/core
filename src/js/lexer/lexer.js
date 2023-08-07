import {
  isDash,
  isDigit,
  isNewline,
  isPlus,
  isSemicolon,
  isWhitespace,
} from "./utils.js";

export class Lexer {
  /**
   * Constructor
   * @param {import("./input-stream").InputStream} input
   */
  constructor(input) {
    this.input = input;
  }

  /**
   * Static constructor
   * @param {import("./input-stream").InputStream} input
   * @returns {Lexer}
   */
  static new(input) {
    return new Lexer(input);
  }

  /**
   * Reads a number from the input
   * @param {string} trivia
   * @returns {import("./token").Token}
   */
  readNumber(trivia) {}

  /**
   * Tokenizes an input stream
   * @returns {import("./token").Token[]}
   */
  tokenize() {
    /** @type {import("./token").Token[]} */
    let tokens = [];
    let trivia = "";

    while (!this.input.eof()) {
      let ch = this.input.peek();
      if (isWhitespace(ch)) {
        trivia += this.input.readWhile(isWhitespace);
      } else if (isSemicolon(ch)) {
        trivia += this.input.readWhile((ch) => !isNewline(ch));
      } else if (isDash(ch) || isPlus(ch)) {
        if (isDigit(this.input.lookahead(1))) {
          tokens.push(this.readNumber(trivia));
          trivia = "";
        }
      }
    }
  }
}

export default Lexer;
