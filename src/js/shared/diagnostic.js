export class Diagnostic {
  /**
   * Diagnostic constructor
   * @param {string} msg
   * @param {import("../lexer/src-loc").SrcLoc} srcloc
   */
  constructor(msg, srcloc) {
    this.msg = msg;
    this.srcloc = srcloc;
  }

  /**
   * Diagnostic static constructor
   * @param {string} msg
   * @param {import("../lexer/src-loc").SrcLoc} srcloc
   * @returns {Diagnostic}
   */
  static new(msg, srcloc) {
    return new Diagnostic(msg, srcloc);
  }
}

export default Diagnostic;
