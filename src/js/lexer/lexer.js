import { DiagnosticBag } from "../shared/diagnostics/diagnostic-bag.js";
import Diagnostic from "../shared/diagnostics/diagnostic.js";
import { sliceInput } from "../shared/utils.js";
import SrcLoc from "./src-loc.js";
import Token from "./token";
import TokenTypes from "./token-types.js";
import {
  isAlphaNumeric,
  isBinChar,
  isDash,
  isDigit,
  isDot,
  isHexChar,
  isNewline,
  isOctChar,
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
    this.diagnostics = DiagnosticBag.new();
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
  readNumber(trivia) {
    const input = this.input;
    const { pos, line, col, file } = input;
    const srcloc = SrcLoc.new(pos, line, col, file);
    let num = "";
    let ch = input.peek();

    if (isDash(ch) || isPlus(ch)) {
      num += input.next();
    }

    num += input.readWhile(isDigit);

    if (num === "0" || num === "-0" || num === "+0") {
      // check for hex, octal, or binary integer literal
      ch = input.peek();
      if (ch === "x" || ch === "o" || ch === "b") {
        let numType =
          ch === "x" ? "Hexadecimal" : ch === "o" ? "Octal" : "Binary";
        num += input.next();
        num +=
          ch === "x"
            ? input.readWhile(isHexChar)
            : ch === "o"
            ? input.readWhile(isOctChar)
            : // must be "b"
              input.readWhile(isBinChar);

        ch = input.peek();
        if (isDot(ch)) {
          num += input.readWhile(isAlphaNumeric);
          this.diagnostics.add(
            Diagnostic.new(
              `${numType} notation can only be used with integer numbers`,
              sliceInput(input.input, pos),
              srcloc,
            ),
          );

          // return Bad token
          return Token.new(TokenTypes.Bad, num, srcloc, trivia);
        }

        // Is valid hex, oct, or bin integer, so return good token
        return Token.new(TokenTypes.Number, num, srcloc, trivia);
      }
    }
  }

  /**
   * Tokenizes an input stream
   * @returns {import("./token").Token[]}
   */
  tokenize() {
    /** @type {import("./token").Token[]} */
    let tokens = [];
    let trivia = "";
    const input = this.input;

    while (!this.input.eof()) {
      let ch = input.peek();
      if (isWhitespace(ch)) {
        trivia += input.readWhile(isWhitespace);
      } else if (isSemicolon(ch)) {
        trivia += input.readWhile((ch) => !isNewline(ch));
      } else if (isDash(ch) || isPlus(ch)) {
        if (isDigit(input.lookahead(1))) {
          tokens.push(readNumber(trivia));
          trivia = "";
        }
      }
    }
  }
}

export default Lexer;
