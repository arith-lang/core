import { Record } from "immutable";

/**
 * AST nodes for the bootstrap compiler
 */

export const ASTTypes = {
  Program: "Program",
  VariableDefinition: "VariableDefinition",
  FunctionDefinition: "FunctionDefinition",
  FunctionExpression: "FunctionExpression",
  CallExpression: "CallExpression",
  IfExpression: "IfExpression",
  ForExpression: "ForExpression",
  CondExpression: "CondExpression",
  MatchExpression: "MatchExpression",
  TryCatch: "TryCatch",
  Module: "Module",
  Include: "Include",
  Provide: "Provide",
  JSImport: "JSImport",
  Quote: "Quote",
  NumberLiteral: "NumberLiteral",
  StringLiteral: "StringLiteral",
  BooleanLiteral: "BooleanLiteral",
  KeywordLiteral: "KeywordLiteral",
  NilLiteral: "NilLiteral",
  Identifier: "Identifier",
  MemberExpression: "MemberExpression",
  OptionalMemberExpression: "OptionalMemberExpression",
};

export const Program = Record({
  type: ASTTypes.Program,
  nodes: [],
  srcloc: null,
  code: "",
});

export const VariableDefinition = Record({
  type: ASTTypes.VariableDefinition,
  name: null,
  initializer: null,
  srcloc: null,
  code: "",
});

export const FunctionDefinition = Record({
  type: ASTTypes.FunctionDefinition,
  async: false,
  variadic: false,
  name: null,
  params: [],
  body: [],
  srcloc: null,
  code: "",
});

export const FunctionExpression = Record({
  type: ASTTypes.FunctionExpression,
  async: false,
  variadic: false,
  params: [],
  body: [],
  srcloc: null,
  code: "",
});

export const CallExpression = Record({
  type: ASTTypes.CallExpression,
  func: null,
  args: [],
  body: [],
  srcloc: null,
  code: "",
});

export const IfExpression = Record({
  type: ASTTypes.IfExpression,
  condition: null,
  consequent: null,
  alternate: null,
  srcloc: null,
  code: "",
});

export const ForExpression = Record({
  type: ASTTypes.ForExpression,
  operator: null,
  binds: [],
  iters: [],
  body: [],
  srcloc: null,
  code: "",
});

export const CondExpression = Record({
  type: ASTTypes.CondExpression,
  clauses: [],
  alternate: null,
  srcloc: null,
  code: "",
});

export const MatchExpression = Record({
  type: ASTTypes.SwitchExpression,
  discriminant: null,
  cases: [],
  default: null,
  srcloc: null,
});

export const TryCatch = Record({
  type: ASTTypes.TryCatch,
  try: [],
  error: "",
  catch: [],
  finally: null,
  code: "",
});

export const Module = Record({
  type: ASTTypes.Module,
  name: "",
  body: [],
  srcloc: null,
  code: "",
});

export const Include = Record({
  type: ASTTypes.Include,
  names: null, // destructured imports via record macro
  module: null,
  srcloc: null,
  code: "",
});

export const Provide = Record({
  type: ASTTypes.Provide,
  member: null,
  srcloc: null,
  code: "",
});

export const JSImport = Record({
  type: ASTTypes.JSImport,
  namespace: null, // namespace import
  names: null, // destructured imports via record macro
  module: "", // the string of the module being imported
  srcloc: null,
  code: "",
});

export const Quote = Record({
  type: ASTTypes.Quote,
  value: null,
  srcloc: null,
  code: "",
});

export const NumberLiteral = Record({
  type: ASTTypes.NumberLiteral,
  value: "",
  srcloc: null,
  code: "",
});

export const StringLiteral = Record({
  type: ASTTypes.StringLiteral,
  value: "",
  srcloc: null,
  code: "",
});

export const BooleanLiteral = Record({
  type: ASTTypes.BooleanLiteral,
  value: "",
  srcloc: null,
  code: "",
});

export const KeywordLiteral = Record({
  type: ASTTypes.KeywordLiteral,
  value: "",
  srcloc: null,
  code: "",
});

export const NilLiteral = Record({
  type: ASTTypes.NilLiteral,
  srcloc: null,
  code: "",
});

export const Identifier = Record({
  type: ASTTypes.Identifier,
  name: "",
  srcloc: null,
  code: "",
});

export const MemberExpression = Record({
  type: ASTTypes.MemberExpression,
  object: null,
  property: null,
  srcloc: null,
  code: "",
});

export const OptionalMemberExpression = Record({
  type: ASTTypes.OptionalMemberExpression,
  object: null,
  property: null,
  srcloc: null,
  code: "",
});
