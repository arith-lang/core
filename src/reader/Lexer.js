import { Input } from "./Input.js";
import { TokenBag } from "./TokenBag.js";
import { SrcLoc } from "./SrcLoc.js";
import {
  isBinDigit,
  isDigit,
  isHexDigit,
  isMinus,
  isNewline,
  isOctDigit,
  isSemicolon,
  isSymbolChar,
  isSymbolStart,
  isWhitespace,
  isZero,
} from "./utils.js";

/**
 * @class Lexer
 * @desc Handles tokenization for an input string
 * @property {Input} input
 * @property {TokenBag} tokens
 */
export class Lexer {
  /**
   * Constructs a Lexer instance
   * @param {string} input
   * @param {string} file
   */
  constructor(input, file) {
    this.input = Input.new(input, file);
    this.tokens = TokenBag.new();
  }

  /**
   * Static constructor for Lexer
   * @param {string} input
   * @param {string} file
   */
  static new(input, file) {
    return new Lexer(input, file);
  }

  /**
   * Reads a comment as trivia
   * @returns {string}
   */
  readComment() {
    return this.input.readWhile((ch) => !isNewline(ch));
  }

  /**
   * Reads a number
   * @param {string} trivia
   */
  readNumber(trivia) {
    const { line, col, pos, file } = this.input;
    const srcloc = SrcLoc.new(line, col, pos, file);
    let num = "";

    if (isMinus(this.input.peek())) {
      num += this.input.next();
    }

    if (isZero(this.input.peek())) {
      num += this.input.next();
      const nextCh = this.input.peek();
      const numType =
        nextCh === "x"
          ? "hex"
          : nextCh === "o"
          ? "oct"
          : nextCh === "b"
          ? "bin"
          : "dec";

      if (numType === "hex") {
        num += this.input.readWhile((ch) => isHexDigit(ch));
      } else if (numType === "oct") {
        num += this.input.readWhile((ch) => isOctDigit(ch));
      } else if (numType === "bin") {
        num += this.input.readWhile((ch) => isBinDigit(ch));
      }
    }
  }

  /**
   * Reads an identifier (symbol)
   * @param {string} trivia
   */
  readIdentifier(trivia) {
    const { line, col, pos, file } = this.input;
    const srcloc = SrcLoc.new(line, col, pos, file);
    const id = this.input.readWhile((ch) => isSymbolChar(ch));

    if (id === "true" || id === "false") {
      this.tokens.addBooleanToken(id, srcloc, trivia);
    } else if (id === "nil") {
      this.tokens.addNilToken(srcloc, trivia);
    } else if (id === "Infinity" || id === "-Infinity" || id === "NaN") {
      this.tokens.addDoubleToken(id, srcloc, trivia);
    } else {
      this.tokens.addIdentifierToken(id, srcloc, trivia);
    }
  }

  /**
   * Returns any trivia, e.g. text that isn't a value for a token but is part of the source code
   *
   * The trivia for a token is any such text found before the actual token value
   * @returns {string}
   */
  readTrivia() {
    let char = this.input.peek();
    let trivia = "";

    while (isWhitespace(char) || isSemicolon(char)) {
      if (isWhitespace(char)) {
        trivia += this.input.readWhile((ch) => isWhitespace(ch));
        char = this.input.peek();
      }

      if (isSemicolon(char)) {
        trivia += this.readComment();
        char = this.input.peek();
      }
    }

    return trivia;
  }

  /**
   * Turns the input string into a bag of Tokens
   * @returns {TokenBag}
   */
  tokenize() {
    while (!this.input.eof()) {
      let trivia = this.readTrivia();
      let char = this.input.peek();

      if (isMinus(char)) {
        const next = this.input.lookahead(1);
        if (isDigit(next)) {
          this.readNumber(trivia);
        } else {
          this.readIdentifier(trivia);
        }
      } else if (isSymbolStart(ch)) {
        this.readIdentifier(trivia);
      }
    }
  }
}
