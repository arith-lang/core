import DiagnosticBag from "../shared/diagnostics/diagnostic-bag.js";
import Reader from "./reader.js";
import { cons } from "../shared/cons.js";
import { makeSymbolToken } from "../shared/make-symbol-token.js";

/**
 * @typedef ReaderOutput
 * @prop {Form} output
 * @prop {import("../shared/diagnostics/diagnostic-bag.js").DiagnosticBag} diagnostics
 * @prop {string} input
 */
/**
 * @typedef {Token|import("../shared/cons.js").Cons} Form
 */

/**
 * @param {Reader} reader
 * @returns {Token}
 */
const readPrimitive = (reader) => {};

/**
 * @param {Reader} reader
 * @returns {Form}
 */
const readForm = (reader) => {};

/**
 * @param {Reader} reader
 * @returns {Form}
 */
const readExpression = (reader) => {};

/**
 * Reads the token stream into a data structure for the compiler
 * @param {import("../lexer/lexer").LexerOutput} lexResult
 * @returns {ReaderOutput}
 */
export const readSyntax = (lexResult) => {
  const { tokens, diagnostics: lexerDiagnostics, input } = lexResult;
  const reader = Reader.new(
    tokens,
    DiagnosticBag.from(lexerDiagnostics),
    input,
  );
  const first = tokens[0];

  if (!first) {
    // Use default empty srcloc
    return {
      output: cons(makeSymbolToken(TokenTypes.Symbol, "begin"), null),
      diagnostics: reader.diagnostics,
      input,
    }; // change this to reader output with diagnostics
  }

  const srcloc = first.srcloc;
  const output = cons(makeSymbolToken("begin", srcloc), null);
};

export default readSyntax;
