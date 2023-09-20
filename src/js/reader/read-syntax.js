import DiagnosticBag from "../shared/diagnostics/diagnostic-bag.js";
import Reader from "./reader.js";
import { cons } from "../shared/cons.js";
import { makeSymbolToken } from "../shared/make-symbol-token.js";
import TokenTypes from "../lexer/token-types.js";

/**
 * @typedef ReaderOutput
 * @prop {Form} ast
 * @prop {import("../shared/diagnostics/diagnostic-bag.js").DiagnosticBag} diagnostics
 * @prop {string} input
 */
/**
 * @typedef {import("../lexer/token.js").Token|import("../shared/cons.js").Cons} Form
 */

/**
 * @param {Reader} reader
 * @returns {import("../lexer/token.js").Token}
 */
const readPrimitive = (reader) => {
  const tok = reader.peek();

  switch (tok.type) {
    case TokenTypes.Number:
    case TokenTypes.EOF:
    case TokenTypes.Bad:
      reader.skip();
      return tok;
  }
};

/**
 * @param {Reader} reader
 * @returns {Form}
 */
const readForm = (reader) => {
  return readPrimitive(reader);
};

/**
 * @param {Reader} reader
 * @returns {Form}
 */
const readExpression = (reader) => {
  return readForm(reader);
};

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

  // This should never happen
  if (!first) {
    // Use default empty srcloc
    return {
      ast: null,
      diagnostics: reader.diagnostics,
      input,
    }; // change this to reader output with diagnostics
  }

  const srcloc = first.srcloc;
  const ast = cons(makeSymbolToken("begin", srcloc), null);

  while (!reader.eof()) {
    output.append(readExpression(reader));
  }

  return { ast, diagnostics: reader.diagnostics, input };
};

export default readSyntax;
