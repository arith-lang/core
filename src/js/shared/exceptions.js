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

export class AssertionException extends Exception {
  constructor(expected, actual) {
    super(`Assertion Exception: expected ${expected}, got ${actual}`);
  }
}
