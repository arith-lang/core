/**
 * Represents a syntactic form in the macro expander
 */
export class Syntax {
  /**
   * Constructor
   * @param {string} name
   * @param {Function} evaluator
   */
  constructor(name, evaluator) {
    this.name = name;
    this.evaluator = evaluator;
  }

  /**
   * Static constructor
   * @param {string} name
   * @param {Function} evaluator
   * @returns {Syntax}
   */
  static new(name, evaluator) {
    return new Syntax(name, evaluator);
  }

  evaluate(form, env) {
    return this.evaluator(form, env);
  }
}

export default Syntax;
