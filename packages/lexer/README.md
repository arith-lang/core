# Arith Lexer

Tokenizes a string of Arith code into a collection of tokens.

## Installing

```sh
npm install @arith-lang/lexer
```

## Usage

Import the `tokenize` function:

```js
import { tokenize } from "@arith-lang/lexer";
```

Then pass the input and an optional file URL (defaults to "file://stdin") to the function:

```js
const tokens = tokenize(input, fileUrl);
```

The token collection is an internal type called `TokenBag` which is iterable. Use the iterator instead of trying to access the `_tokens` property on the collection. It'll work out better for everyone, I promise.
