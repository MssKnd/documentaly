import { isObject, isString } from "../../../utilities/type-guard.ts";

type MarkdownProps = {
  dist: string;
  pageId: string;
  title: string;
};

// TODO: hasPropOrUndefined
function hasPropOrError<T extends keyof MarkdownProps>(
  propName: T,
  target: unknown,
): MarkdownProps[T] {
  if (!isObject(target) || !(propName in target)) {
    throw new Error(`Props need ${propName}`);
  }
  // FIXME: any
  // deno-lint-ignore no-explicit-any
  return (target as any)[propName];
}

function validateMarkdownProps(input: Record<string, unknown>): MarkdownProps {
  if (isString(input.dist) && input.dist.toLowerCase() !== "notion") {
    throw new Error("invalid notion markdown props");
  }
  return {
    dist: "notion",
    pageId: hasPropOrError("pageId", input),
    title: hasPropOrError("title", input),
  };
}

export { validateMarkdownProps };
