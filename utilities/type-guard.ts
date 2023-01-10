const isObject = (x: unknown): x is Record<string, unknown> =>
  x !== null && (typeof x === "object" || typeof x === "function");

const isBoolean = (x: unknown): x is boolean => typeof x === "boolean";

const isString = (x: unknown): x is string =>
  typeof x === "string" || x instanceof String;

export { isBoolean, isObject, isString };
