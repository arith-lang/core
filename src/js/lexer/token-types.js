/**
 * The different types of Tokens
 * @enum {string}
 */
export const TokenTypes = {
  Number: "Number",
  String: "String",
  Boolean: "Boolean",
  Keyword: "Keyword",
  Nil: "Nil",
  Symbol: "Symbol",
  LParen: "LParen",
  RParen: "RParen",
  LBrack: "LBrack",
  RBrack: "RBrack",
  LBrace: "LBrace",
  RBrace: "RBrace",
  Dot: "Dot",
  Amp: "Amp",
  Hash: "Hash",
  Quote: "Quote",
  QQuote: "QQuote",
  UQuote: "UQuote",
  SUQuote: "SUQuote",
  EOF: "EOF",
  Bad: "Bad",
};

export default TokenTypes;
