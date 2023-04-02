/**
 * @typedef SrcLoc
 * @property {number} line
 * @property {number} col
 * @property {number} pos
 * @property {string} file
 */
export class SrcLoc {
  /**
   * Constructs a SrcLoc instance
   * @param {number} line
   * @param {number} col
   * @param {number} pos
   * @param {string} file
   */
  constructor(line, col, pos, file) {
    this.line = line;
    this.col = col;
    this.pos = pos;
    this.file = file;
  }

  /**
   * Static SrcLoc constructor
   * @param {number} line
   * @param {number} col
   * @param {number} pos
   * @param {string} file
   */
  static new(line, col, pos, file) {
    return new SrcLoc(line, col, pos, file);
  }
}
