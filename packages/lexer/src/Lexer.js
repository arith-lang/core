import { Input } from "./Input.js";
import { TokenBag } from "./TokenBag.js";
import { SrcLoc } from "./SrcLoc.js";
import {
  isAmp,
  isAt,
  isBinDigit,
  isColon,
  isDigit,
  isDot,
  isDoubleQuote,
  isHash,
  isHexDigit,
  isLBrace,
  isLBrack,
  isLParen,
  isMinus,
  isNewline,
  isOctDigit,
  isPlus,
  isQQuote,
  isQuote,
  isRBrace,
  isRBrack,
  isRParen,
  isSemicolon,
  isSymbolChar,
  isSymbolStart,
  isUQuote,
  isWhitespace,
  isZero,
} from "./utils.js";
import { TokenTypes } from "./TokenTypes.js";
import { Token } from "./Token.js";

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
   * Reads a double-quoted string for escape sequences and converts them to characters
   * @returns {string}
   */
  readEscaped() {
    let str = "";
    let escaped = false;
    let ended = false;

    while (!this.input.eof()) {
      let ch = this.input.next();

      if (escaped) {
        str += this.readEscapeSequence(ch);
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (isDoubleQuote(ch)) {
        ended = true;
        str += ch;
        break;
      } else if (ch === "\n") {
        throw new Error(
          "Unexpected newline in nonterminated single-line string literal"
        );
      } else {
        str += ch;
      }
    }

    if (!ended && this.input.eof()) {
      throw new Error("Expected double quote to close string literal; got EOF");
    }

    return str;
  }

  /**
   * Read a valid escape sequence into a character
   * @returns {string}
   */
  readEscapeSequence(c) {
    let str = "";
    let seq = "";

    if (c === "n") {
      str += "\n";
    } else if (c === "b") {
      str += "\b";
    } else if (c === "f") {
      str += "\f";
    } else if (c === "r") {
      str += "\r";
    } else if (c === "t") {
      str += "\t";
    } else if (c === "v") {
      str += "\v";
    } else if (c === "0") {
      str += "\0";
    } else if (c === "'") {
      str += "'";
    } else if (c === '"') {
      str += '"';
    } else if (c === "\\") {
      str += "\\";
    } else if (c === "u" || c === "U") {
      // is Unicode escape sequence
      seq += this.input.readWhile(isHexDigit);
      str += String.fromCodePoint(parseInt(seq, 16));
    }

    return str;
  }

  /**
   * Reads a keyword
   * @param {string} trivia
   */
  readKeyword(trivia) {
    const { line, col, pos, file } = this.input;
    const srcloc = SrcLoc.new(line, col, pos, file);
    let kw = this.input.next();

    str += this.input.readWhile(isSymbolChar);
    this.tokens.addKeywordToken(kw, srcloc, trivia);
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
      // Could be hex, octal, or binary integer
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
        num += this.input.readWhile(isHexDigit);
      } else if (numType === "oct") {
        num += this.input.readWhile(isOctDigit);
      } else if (numType === "bin") {
        num += this.input.readWhile(isBinDigit);
      } else {
        // must be a base 10 number
        num += this.input.readWhile(isDigit);
      }

      if (isDot(this.input.peek()) && numType !== "dec") {
        throw new Error(`Only base 10 numbers may include decimal point`);
      }
    } else {
      num += this.input.readWhile((ch) => isDigit(ch));
    }

    if (isDot(this.input.peek())) {
      // is either a decimal or double number
      num += this.input.next();
      num += this.input.readWhile(isDigit);

      if (this.input.peek() === "e") {
        // is exponential notation
        num += this.input.next();

        if (isMinus(this.input.peek()) || isPlus(this.input.peek())) {
          num += this.input.next();
        }

        num += this.input.readWhile(isDigit);
      }

      if (this.input.peek() === "f") {
        // is double
        num += this.input.next();
        this.tokens.addDoubleToken(num, srcloc, trivia);
      } else {
        // is decimal
        this.tokens.addDecimalToken(num, srcloc, trivia);
      }
    } else {
      // is integer
      this.tokens.addIntegerToken(num, srcloc, trivia);
    }
  }

  /**
   * Reads an identifier (symbol)
   * @param {string} trivia
   */
  readIdentifier(trivia) {
    const { line, col, pos, file } = this.input;
    const srcloc = SrcLoc.new(line, col, pos, file);
    const id = this.input.readWhile(isSymbolChar);

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
   * Reads a multiline string
   * @param {string} trivia
   */
  readMultilineString(trivia) {
    const { line, col, pos, file } = this.input;
    const srcloc = SrcLoc.new(line, col, pos, file);
    let str = this.input.readWhile(isDoubleQuote);
    let ended = false;
    let escaped = false;

    while (!this.input.eof()) {
      let ch = this.input.next();

      if (isDoubleQuote(ch)) {
        if (isDoubleQuote(this.input.peek()) && isDoubleQuote(this.input.lookahead(1))) {
          str += ch += this.input.readWhile(isDoubleQuote);
          ended = true;
          break;
        } else {
          str += ch;
        }
      } else if (escaped) {
        str += this.readEscapeSequence(ch);
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else {
        str += ch;
      }
    }

    if (!ended && this.input.eof()) {
      throw new Error('Expected """ to close multiline string; got EOF');
    }

    this.tokens.addMultilineStringToken(str, srcloc, trivia);
  }

  /**
   * Reads a punctuation token
   * @param {string} trivia
   * @param {TokenTypes} type
   */
  readPunc(trivia, type) {
    const { line, col, pos, file } = this.input;
    const srcloc = SrcLoc.new(line, col, pos, file);
    let punc = this.input.next();

    if (isAt(this.input.peek())) {
      punc += this.input.next();
    }

    const token = Token.new(type, punc, srcloc, trivia);

    this.tokens.append(token);
  }

  /**
   * Reads a double-quoted string
   * @param {string} trivia
   */
  readString(trivia) {
    const { line, col, pos, file } = this.input;
    const srcloc = SrcLoc.new(line, col, pos, file);
    const str = this.readEscaped();

    this.tokens.addStringToken(str, srcloc, trivia);
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
        trivia += this.input.readWhile(isWhitespace);
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
          // reading this as a number leaves out theoretically valid identifier names
          // like -123a, but I don't care - besides, this is how Racket does it
          this.readNumber(trivia);
        } else {
          this.readIdentifier(trivia);
        }
      } else if (isSymbolStart(ch)) {
        this.readIdentifier(trivia);
      } else if (isDoubleQuote(ch)) {
        if (isDoubleQuote(this.input.lookahead(1)) && isDoubleQuote(this.input.lookahead(2))) {
          this.readMultilineString(trivia);
        } else {
          this.readString(trivia);
        }
      } else if (isColon(ch)) {
        this.readKeyword(trivia);
      } else if (isLParen(ch)) {
        this.readPunc(trivia, TokenTypes.LParen);
      } else if (isRParen(ch)) {
        this.readPunc(trivia, TokenTypes.RParen);
      } else if (isLBrack(ch)) {
        this.readPunc(trivia, TokenTypes.LBrack);
      } else if (isRBrack(ch)) {
        this.readPunc(trivia, TokenTypes.RBrack);
      } else if (isLBrace(ch)) {
        this.readPunc(trivia, TokenTypes.LBrace);
      } else if (isRBrace(ch)) {
        this.readPunc(trivia, TokenTypes.RBrace);
      } else if (isAmp(ch)) {
        this.readPunc(trivia, TokenTypes.Amp);
      } else if (isDot(ch)) {
        this.readPunc(trivia, TokenTypes.Dot);
      } else if (isHash(ch)) {
        this.readPunc(trivia, TokenTypes.Hash);
      } else if (isQuote(ch)) {
        this.readPunc(trivia, TokenTypes.Quote);
      } else if (isQQuote(ch)) {
        this.readPunc(trivia, TokenTypes.QQuote);
      } else if (isUQuote(ch)) {
        if (isAt(this.input.lookahead(1))) {
          this.readPunc(trivia, TokenTypes.SUQuote);
        } else {
          this.readPunc(trivia, TokenTypes.UQuote);
        }
      } else {
        const { line, col, pos, file } = this.input;
        throw new Error(
          `Unknown token type ${ch} at ${file} ${pos} (${line}:${col})`
        );
      }
    }
  }
}
