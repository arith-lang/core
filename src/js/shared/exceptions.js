export class Exception extends Error {
  constructor(msg) {
    super(msg);
  }
}

export class DivideByZeroException extends Exception {
  constructor() {
    super("Cannot divide by zero");
  }
}
