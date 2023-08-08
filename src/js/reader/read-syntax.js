import DiagnosticBag from "../shared/diagnostics/diagnostic-bag.js";

/**
 * Reads the token stream into a data structure for the compiler
 * @param {import("../lexer/lexer").LexerOutput} lexResult
 */
export const readSyntax = (lexResult) => {
  const { tokens, diagnostics: lexerDiagnostics, input } = lexResult;
  let diagnostics = DiagnosticBag.from(lexerDiagnostics);
};
