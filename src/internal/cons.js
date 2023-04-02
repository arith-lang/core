/**
 * @class Cons
 * @desc Pair/list data structure underlying AST
 * @property {any} head
 * @property {any} tail
 */
class Cons extends Array {
  /**
   * Constructs a Cons instance
   * @param {any} head
   * @param {any} tail
   */
  constructor(head, tail = null) {
    super(head, tail);
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
        throw new Error("Cannot append item to improper list or pair whose tail is not nil");
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
        break;
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
