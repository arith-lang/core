import { cons, Cons } from '@arith-lang/core';
import { Token, TokenTypes } from '@arith-lang/lexer';
import { TokenReader } from './TokenReader';
/**
 * @callback ReaderFunction
 * @param {TokenReader} reader
 * @returns {Cons}
 */
/**
 * @class MacroReader
 * @desc Reads and expands reader macros into their parsed representation
 * @property {TokenReader} reader
 * @property {ReaderFunction} read
 */
export class MacroReader {
  /**
   *
   * @param {TokenReader} reader
   * @param {ReaderFunction} read
   */
  constructor(reader, read) {
    this.reader = reader;
    this.read = read;
  }

  /**
   * Static constructor for MacroReader
   * @param {TokenReader} reader
   * @param {ReaderFunction} read
   * @returns {MacroReader}
   */
  static new(reader, read) {
    return new MacroReader(reader, read);
  }

  /**
   * Dispatcher for reading the various macros
   * @param {Token} token
   */
  readMacro(token) {}
}
