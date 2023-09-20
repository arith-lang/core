/**
 * Represents a syntactic form in the macro expander
 */
export class Syntax {
  /**
   * Constructor
   * @param {string} name
   * @param {Function} func
   */
  constructor(name, func) {
    this.name = name;
    this.func = func;
  }

  /**
   * Static constructor
   * @param {string} name
   * @param {Function} func
   * @returns {Syntax}
   */
  static new(name, func) {
    return new Syntax(name, func);
  }

  evaluate(form, env) {
    return this.func(form, env);
  }
}

export default Syntax;
