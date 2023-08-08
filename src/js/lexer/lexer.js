import DiagnosticBag from "../shared/diagnostics/diagnostic-bag.js";
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
  isForwardSlash,
  isHexChar,
  isNewline,
  isOctChar,
  isPlus,
  isSemicolon,
  isWhitespace,
} from "./utils.js";

/**
 * @typedef {{tokens: import("./token").Token[], diagnostics: DiagnosticBag, input: string}} LexerOutput
 */

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

    // handle decimal numbers, which can include floats or decimals and can use exponential notation
    ch = input.peek();

    if (isDot(ch)) {
      num += input.next();
      num += input.readWhile(isDigit);

      ch = input.peek();

      if (ch === "e") {
        num += input.next();
        ch = input.peek();

        if (!isDash(ch) && !isPlus(ch)) {
          // is invalid - must have plus or minus sign
          num += input.readWhile(isDigit);
          this.diagnostics.add(
            `Exponential notation decimal number must include plus or minus sign`,
            sliceInput(input.input, pos),
            srcloc,
          );

          return Token.new(TokenTypes.Bad, num, srcloc, trivia);
        }

        num += input.next();
        num += input.readWhile(isDigit);
        ch = input.peek();
      }

      // check to see if this is a bad rational (rationals can't have decimal numerator or denominator)
      if (isForwardSlash(ch)) {
        num += input.next();
        num += input.readWhile(
          (ch) =>
            isDigit(ch) || isDot(ch) || ch === "e" || isDash(ch) || isPlus(ch),
        );
        this.diagnostics.add(
          `Rational number cannot have decimal numerator or denominator`,
          sliceInput(input.input, pos),
          srcloc,
        );

        return Token.new(TokenTypes.Bad, num, srcloc, trivia);
      }
    }

    // handle rational numbers
    ch = input.peek();

    if (isForwardSlash(ch)) {
      num += input.next();
      num += input.readWhile(isDigit);

      // check to see if this is a bad rational (has decimal denominator)
      ch = input.peek();

      if (isDot(ch)) {
        num += input.readWhile(
          (ch) =>
            isDigit(ch) || isDot(ch) || ch === "e" || isDash(ch) || isPlus(ch),
        );
        this.diagnostics.add(
          `Rational number cannot have decimal numerator or denominator`,
          sliceInput(input.input, pos),
          srcloc,
        );

        return Token.new(TokenTypes.Bad, num, srcloc, trivia);
      }

      // Is valid rational, can return number token
      return Token.new(TokenTypes.Number, num, srcloc, trivia);
    }

    // handle complex numbers, which can have decimals in either/both the real or/and imaginary parts
    ch = input.peek();

    if (ch === "i") {
      // is imaginary number
      num += input.next();
      ch = input.peek();

      if (isAlphaNumeric(ch)) {
        // is invalid, imaginary number can't have digits after the i
        num += input.readWhile(isAlphaNumeric);
        this.diagnostics.add(
          `Imaginary number must terminate with i, additional characters found`,
          sliceInput(input.input, pos),
          srcloc,
        );

        return Token.new(TokenTypes.Bad, num, srcloc, trivia);
      }

      // The i terminates the number, so return token here
      return Token.new(TokenTypes.Number, num, srcloc, trivia);
    } else if (isPlus(ch) || isDash(ch)) {
      // is complex number of form n+mi or n-mi
      num += input.next();
      num += input.readWhile(isDigit);
      ch = input.peek();

      // can have decimal for imaginary part, including exponential notation decimal
      if (isDot(ch)) {
        num += input.next();
        num += input.readWhile(isDigit);
        ch = input.peek();

        if (ch === "e") {
          // is exponential notation
          num += input.next();
          ch = input.peek();

          if (!isDash(ch) && !isPlus(ch)) {
            // is invalid - must have plus or minus sign
            num += input.readWhile(isDigit);
            this.diagnostics.add(
              `Exponential notation decimal number must include plus or minus sign`,
              sliceInput(input.input, pos),
              srcloc,
            );

            return Token.new(TokenTypes.Bad, num, srcloc, trivia);
          }

          num += input.next();
          num += input.readWhile(isDigit);
          ch = input.peek();
        }
      }

      if (ch !== "i") {
        // invalid - complex number must end with i for imaginary part
        num += input.readWhile(isAlphaNumeric);
        this.diagnostics.add(
          `Complex number imaginary part must end with i`,
          sliceInput(input.input, pos),
          srcloc,
        );

        return Token.new(TokenTypes.Bad, num, srcloc, trivia);
      }

      // The i terminates the number, so return token here
      num += input.next();
      return Token.new(TokenTypes.Number, num, srcloc, trivia);
    }

    // If we're here, it's either a decimal integer, a Real (Decimal), or a float with an f suffix
    ch = input.peek();

    if (ch === "f") {
      num += input.next();
      ch = input.peek();
    }

    if (isAlphaNumeric(ch)) {
      // invalid number character
      num += input.readWhile(isAlphaNumeric);
      this.diagnostics.add(
        `Invalid characters in number literal`,
        sliceInput(input.input, pos),
        srcloc,
      );

      return Token.new(TokenTypes.Bad, num, srcloc, trivia);
    }

    // If we made it this far, congratulations! It's a valid integer, Real, or float
    return Token.new(TokenTypes.Number, num, srcloc, trivia);
  }

  /**
   * Tokenizes an input stream
   * @returns {LexerOutput}
   */
  tokenize() {
    /** @type {import("./token").Token[]} */
    let tokens = [];
    let trivia = "";
    const input = this.input;

    while (!this.input.eof()) {
      let ch = input.peek();
      const { pos, line, col, file } = input;
      if (isWhitespace(ch)) {
        trivia += input.readWhile(isWhitespace);
      } else if (isSemicolon(ch)) {
        trivia += input.readWhile((ch) => !isNewline(ch));
      } else if (isDash(ch) || isPlus(ch)) {
        if (isDigit(input.lookahead(1))) {
          tokens.push(this.readNumber(trivia));
          trivia = "";
        }
      } else if (isDigit(ch)) {
        tokens.push(this.readNumber(trivia));
        trivia = "";
      } else {
        const srcloc = SrcLoc.new(pos, line, col, file);

        this.diagnostics.add(
          `Unrecognized token ${ch}`,
          sliceInput(input.input, pos),
          srcloc,
        );
        tokens.push(Token.new(TokenTypes.Bad, ch), srcloc, trivia);
        trivia = "";
      }
    }

    return { tokens, diagnostics: this.diagnostics, input: input.input };
  }
}

export default Lexer;
