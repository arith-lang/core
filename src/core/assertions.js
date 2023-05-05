import equal from "fast-deep-equal/es6";
import { AssertException } from "./exceptions";

/**
 * Make an assertion for testing purposes
 * @param {any} expr an expression to test, should evaluate to true or false
 * @param {string} msg
 * @returns {Boolean}
 */
export function assert(expr, msg) {
  if (!expr) {
    throw new AssertException("Assertion failed: ", msg);
  }

  return true;
}

export function assertEqual(actual, expected, msg = "") {
  return assert(
    actual === expected,
    msg || `Expected ${actual} to equal ${expected}`
  );
}

export function assertDeepEqual(actual, expected, msg = "") {
  return assert(
    equal(actual, expected),
    msg ||
      `Expected ${JSON.stringify(actual, null, 2)} to equal ${JSON.stringify(
        expected,
        null,
        2
      )}`
  );
}
