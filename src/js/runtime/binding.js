import { Namespace } from "./Namespace.js";

/**
 * Sets a variable in its current namespace
 * @param {Namespace} ns
 * @param {string} name
 * @param {any} value
 * @returns {void}
 */
export function setVar(ns, name, value) {
  ns.set(name, value);
}
/**
 * Gets a variable from the current namespace
 * @param {Namespace} ns
 * @param {string} name
 * @returns {any}
 */
export function getVar(ns, name) {
  return ns.get(name);
}
