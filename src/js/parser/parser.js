import DiagnosticBag from "../shared/diagnostics/diagnostic-bag.js";

/**
 * @typedef ParserOutput
 * @prop {import("./ast").AST} ast
 * @prop {DiagnosticBag} diagnostics
 */

/**
 * Parses expanded reader output into a full AST
 * @param {import("../reader/read-syntax").ReaderOutput} readResult
 */
export const parse = (readResult) => {
  const { ast: forms, diagnostics: readerDiagnostics, input } = readResult;
  const diagnostics = DiagnosticBag.from(readerDiagnostics);

  const parseBegin = (form) => {};

  return { ast: parseBegin(forms), diagnostics };
};

export default parse;
