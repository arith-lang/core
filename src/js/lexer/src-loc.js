/**
 * @class
 */
export class SrcLoc {
  /**
   * Constructor for SrcLoc
   * @param {number} pos
   * @param {number} line
   * @param {number} col
   * @param {string} file
   */
  constructor(pos, line, col, file) {
    this.pos = pos;
    this.line = line;
    this.col = col;
    this.file = file;
  }

  /**
   * Static constructor for SrcLoc
   * @param {number} pos
   * @param {number} line
   * @param {number} col
   * @param {string} file
   * @returns {SrcLoc}
   */
  static new(pos, line, col, file) {
    return new SrcLoc(pos, line, col, file);
  }
}

export default SrcLoc;
