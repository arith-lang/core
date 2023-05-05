export function makeFunction(
  func,
  name,
  { arity = func.length, variadic = false } = {}
) {
  Object.defineProperty(func, "name", {
    writable: true,
    configurable: true,
    value: name,
  });

  func.arity = arity;
  func.variadic = variadic;
}
