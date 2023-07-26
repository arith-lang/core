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
}

export const cons = (head, tail) => new Cons(head, tail);
