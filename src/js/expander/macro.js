/**
 * Macro code compiles to an object of this class
 */
export class Macro {
  constructor(debugName, env, transformer) {
    this.debugName = debugName;
    this.environment = env;
    this.transformer = transformer;
  }

  static new(debugName, env, transformer) {
    return new Macro(debugName, env, transformer);
  }

  transform(form, env, metaEnv, expander) {
    const args = [form, env, metaEnv, expander];
    return this.transformer(args);
  }
}

export default Macro;
