import { Inputs, inputValidationFunctions } from "./input";
import { Outputs, outputValidationFunctions } from "./output";
import { MethodType, isMethodType } from "./helpers";

export type Description = {
    [K in MethodType]?: {
        input: Inputs[K];
        output: {
            [P in keyof Outputs[K]]?: Outputs[K][P];
        };
    };
};

export function isDescription(arg: any): arg is Description {
    if (!arg || typeof arg !== "object") return false;

    return Object.keys(arg).every((key) => {
        if (!isMethodType(key)) return false;
        if (
            !("input" in arg[key]) ||
            !("output" in arg[key]) ||
            !arg[key]["output"] ||
            typeof arg[key]["output"] !== "object"
        )
            return false;

        return (
            inputValidationFunctions[key](arg[key]["input"]) &&
            Object.keys(arg[key]["output"]).every((caseValue) =>
                outputValidationFunctions[key][caseValue](
                    arg[key]["output"][caseValue]
                )
            )
        );
    });
}
