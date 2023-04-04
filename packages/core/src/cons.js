/**
 * @class Cons
 * @desc Pair/list data structure underlying AST
 * @property {any} head
 * @property {any} tail
 */
export class Cons extends Array {
  /**
   * Constructs a Cons instance
   * @param {any} head
   * @param {any} tail
   */
  constructor(head, tail = null) {
    super(head, tail);
  }

  /**
   * @typedef Iterable
   * @property {Function} [Symbol.iterator]
   */
  /**
   * Constructs a list from another iterable for parity with Array.from
   * @param {Iterable} iter
   * @returns {Cons}
   */
  static from(iter) {
    const args = [...iter];
    let lst = cons(args[0], null);

    for (let arg of args.slice(1)) {
      lst.append(arg);
    }

    return lst;
  }

  /**
   * Create a list from an arbitrary list of items
   * @param {any} first
   * @param  {...any} args
   * @returns {Cons}
   */
  static of(first, ...args) {
    let lst = cons(first, null);

    for (let arg of args) {
      lst.append(arg);
    }

    return lst;
  }

  get head() {
    return this[0];
  }

  get tail() {
    return this[1];
  }

  /**
   * Set the value of this.tail
   * @param {any} value
   */
  set tail(value) {
    this[1] = value;
  }

  /**
   * Appends value to current list
   * @param {any} value
   * @returns {Cons}
   */
  append(value) {
    let list = this;
    let tail = this.tail;

    while (tail !== undefined) {
      if (tail instanceof Cons) {
        if (tail.tail === null) {
          tail.tail = cons(value, null);
          return list;
        }
        tail = tail.tail;
      } else if (this.tail === null) {
        this.tail = cons(value, null);
        return list;
      } else {
        // is an improper list
        throw new Error(
          "Cannot append item to improper list or pair whose tail is not nil"
        );
      }
    }
  }

  *[Symbol.iterator]() {
    let value = this.head;
    let tail = this.tail;

    // if tail == null, we've reached the end of a list
    while (tail !== undefined) {
      if (tail instanceof Cons) {
        yield value;
        value = tail.head;
        tail = tail.tail;
      } else if (tail === null) {
        yield value;
        tail = undefined;
      } else {
        // is pair/improper list
        yield value;
        yield tail;
        tail = undefined;
      }
    }
  }
}

/**
 * Functional constructor for cons cell
 * @param {any} head
 * @param {any} tail
 * @returns {Cons}
 */
export function cons(head, tail) {
  if (head === undefined || tail === undefined) {
    throw new Error("cons function needs exactly 2 arguments");
  }
  return new Cons(head, tail);
}

/**
 * Add head and tail properties to Array for parity with Cons
 */
Object.defineProperties(Array.prototype, {
  head: {
    enumerable: false,
    get: function () {
      return this[0];
    },
  },

  tail: {
    enumerable: false,
    get: function () {
      return this.slice(1);
    },
  },
});

/**
 * Tests if a value is a Cons cell
 * @param {any} obj
 * @returns {boolean}
 */
export function isCons(obj) {
  return obj instanceof Cons;
}
