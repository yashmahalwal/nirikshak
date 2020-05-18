import { BaseType } from ".";

export type CustomFunctionString = string;
export type CustomFunctionObject = {
    function: CustomFunctionString;
    args?: any[];
};

export type Custom = CustomFunctionString | CustomFunctionObject;

// User needs to guarantee the validity at runtime
export interface CustomFunction {
    (...args: any[]): Exclude<BaseType, Custom>;
}

export function isCustomFunctionString(
    input: any
): input is CustomFunctionString {
    if (typeof input !== "string") return false;

    return input.startsWith("custom:");
}

export function isCustomFunctionObject(
    input: any
): input is CustomFunctionObject {
    if (!input || typeof input !== "object") return false;

    return (
        "function" in input &&
        isCustomFunctionString(input["function"]) &&
        ("args" in input ? Array.isArray(input["args"]) : true)
    );
}

export function isCustomFunction(input: any): input is Custom {
    return isCustomFunctionString(input) || isCustomFunctionObject(input);
}
