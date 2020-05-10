import { Literal } from "./primitive";

// User need to guarantee the validity at runtime
export type Custom = string;
export interface CustomFunction {
  (): Literal;
}
