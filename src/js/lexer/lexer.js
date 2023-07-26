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
}

export default Lexer;
