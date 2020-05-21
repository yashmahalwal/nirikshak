import { Inputs, inputValidationFunctions } from "./input";
import { Outputs } from "./output";
import { MethodType, isMethodType } from "./helpers";

export type Description = {
    [K in MethodType]?: { input: Inputs[K]; output: Outputs[K] };
};
