import { fail } from "./utils.js";

export class Cons extends Array {
  constructor(head, tail) {
    super(head, tail);
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
}

export const cons = (head, tail) => new Cons(head, tail);
