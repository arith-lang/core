import { fail, isNil, isTruthy } from "./utils.js";

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
    let i = 0;
    for (let val of this) {
      fn(val, i++, this);
    }
  }

  /**
   * Creates a new list with all items of the current list that pass a predicate
   * @param {Function}
   * @returns {Cons|null}
   */
  filter(fn) {
    let list = null;

    this.each((el, i, lst) => {
      if (isTruthy(fn(el, i, lst))) {
        if (listLength(list) === 0) {
          list = cons(el, null);
        } else {
          list.append(el);
        }
      }
    });

    return list;
  }

  /**
   * Reduces the current list to a single value
   * @param {Function} fn
   * @param {any} init
   * @returns {any}
   */
  fold(fn, init) {
    return this.reduce(fn, init);
  }

  /**
   * Reduces the list, but starting from the end
   * @param {Function} fn
   * @param {any} init
   * @returns {any}
   */
  "fold-r"(fn, init) {
    return this.reduceRight(fn, init);
  }

  /**
   * Fetches the value at index n of the current list, fail if out of list bounds
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

  /**
   * Maps each element of the current list to a new list of items
   * @param {Function} fn
   * @returns {Cons}
   */
  map(fn) {
    let list = cons(fn(this.head, 0, this), null);

    this.each((el, i, lst) => {
      if (i === 0) {
        // do nothing
      } else {
        list.append(fn(el, i, lst));
      }
    });

    return list;
  }

  /**
   * Reduces the list to a single value (which can be another list)
   * @param {Function} fn
   * @param {any} init
   * @returns {any}
   */
  reduce(fn, init) {
    let acc = init;

    this.each((el, i, lst) => {
      acc = fn(acc, el, i, lst);
    });

    return acc;
  }

  /**
   * Reduces the current list, but iterating from end to start
   * @param {Function} fn
   * @param {any} init
   * @returns {any}
   */
  reduceRight(fn, init) {
    return Cons.from(this.toArray().reduceRight(fn, init));
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
  if (!isNil(obj) && !(obj instanceof Cons)) {
    return false;
  } else if (isNil(obj)) {
    return true;
  }

  // only option left is it's a cons
  return isList(obj.tail);
};

export const listLength = (list) => {
  if (list == null) {
    return 0;
  }

  let i = 0;

  for (let _ of list) {
    i++;
  }

  return i;
};
