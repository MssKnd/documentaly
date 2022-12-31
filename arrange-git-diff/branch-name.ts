import { isString } from "../utilities/type-guard.ts";

type BranchName = `${string}/${string}`;

const regex = /^[^\/]+\/[^\/]+$/;

const isValidBranchName = (input: unknown): input is BranchName =>
  isString(input) && regex.test(input);

export type { BranchName };
export { isValidBranchName };
