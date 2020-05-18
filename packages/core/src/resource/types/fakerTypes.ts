import _ from "lodash";
import * as faker from "faker";

export type FakerString = string;

export function isValidFakerString(input: any): input is FakerString {
    if (typeof input !== "string") return false;

    const i = input.indexOf("faker:");
    if (i != 0) return false;

    return _.get(faker, input.slice(6)) instanceof Function;
}

export type FakerObject = {
    function: FakerString;
    args?: any[];
};

export function isValidFakerObject(input: any): input is FakerObject {
    if (!input || typeof input !== "object") return false;

    if ("function" in input && isValidFakerString(input["function"])) {
        if ("args" in input) {
            return Array.isArray(input["args"]);
        }
        return true;
    }

    return false;
}

export type FakerType = FakerString | FakerObject;

export function isValidFaker(input: any): input is FakerType {
    return isValidFakerString(input) || isValidFakerObject(input);
}

// export function normalizeFaker(input: FakerType): FakerObject {
//     if (isValidFakerObject(input)) return { args: [], ...input };
//     return {
//         function: input,
//         args: [],
//     };
// }
