export class Diagnostic {
  /**
   * Diagnostic constructor
   * @param {string} msg
   * @param {string} textSpan
   * @param {import("../../lexer/src-loc").SrcLoc} srcloc
   */
  constructor(msg, textSpan, srcloc) {
    this.msg = msg;
    this.textSpan = textSpan;
    this.srcloc = srcloc;
  }

  /**
   * Diagnostic static constructor
   * @param {string} msg
   * @param {string} textSpan
   * @param {import("../../lexer/src-loc").SrcLoc} srcloc
   * @returns {Diagnostic}
   */
  static new(msg, textSpan, srcloc) {
    return new Diagnostic(msg, textSpan, srcloc);
  }
}

export default Diagnostic;
