import { fail } from "./utils.js";

export class Cons extends Array {
  constructor(head, tail) {
    super(head, tail);
  }

  static of(first, ...args) {
    if (first === undefined) {
      return null;
    }

    let list = cons(first, null);

    for (let arg of args) {
      list.append(arg);
    }

    return list;
  }

  static from(iter) {
    return Cons.of(...iter);
  }

  get head() {
    return this[0];
  }

  get tail() {
    return this[1];
  }

  set tail(val) {
    this[1] = val;
  }

  append(val) {
    let list = this;
    let tail = this.tail;

    while (tail !== undefined) {
      if (tail instanceof Cons) {
        if (tail.tail === null) {
          // is the end of the list
          tail.tail = cons(val, null);
          return list;
        }

        // we're not yet at the end of the list - keep going
        tail = tail.tail;
      } else if (tail === null) {
        // it's a single-item list
        this.tail = cons(val, null);
        return list;
      } else {
        // this is an improper list and we cannot append to it
        fail(
          "Cannot append item to improper list or pair whose tail is not nil",
        );
      }
    }

    // if we're out of the loop and haven't returned or errored yet, something bad happened and I don't know what
    fail(`Error trying to append ${String(val)} to list`);
  }

  /**
   * Applies a function to each element of the current list
   * @param {Function} fn
   */
  each(fn) {
    for (let val of this) {
      fn(val);
    }
  }

  /**
   * Fetch the value at index n of the current list, fail if out of list bounds
   * @param {number} n
   * @returns {any}
   */
  get(n) {
    let i = 0;

    for (let value of this) {
      if (i === n) {
        return value;
      }

      i++;
    }

    fail(`Index ${n} out of list bounds`);
  }

  toArray() {
    return [...this];
  }

  *[Symbol.iterator]() {
    let value = this.head;
    let tail = this.tail;

    while (tail !== undefined) {
      if (tail instanceof Cons) {
        yield value;
        value = tail.head;
        tail = tail.tail;
      } else if (tail === null) {
        yield value;
        tail = undefined;
      } else {
        // is a pair/improper list
        yield value;
        yield tail;
        tail = undefined;
      }
    }
  }
}

export const cons = (head, tail) => new Cons(head, tail);

export const list = (...args) => Cons.from(args);

export const isList = (obj) => {
  if (obj != null && !(obj instanceof Cons)) {
    return false;
  } else if (obj == null) {
    return true;
  }

  // only option left is it's a cons
  return isList(obj.tail);
};

export const listLength = (list) => {
  let i = 0;

  for (let val of list) {
    i++;
  }

  return i;
};
