import {
    CustomFunctionType,
    normalizeCustomFunction,
    CustomFunction,
} from "../types/custom";
import { ResourceHelpers } from "../types/helper";
import _ from "lodash";

// Function to extract the custom function from helper and generate value
export function generateCustom(
    input: CustomFunctionType,
    helpers: ResourceHelpers
): ReturnType<CustomFunction> {
    const object = normalizeCustomFunction(input);
    try {
        return _.get(helpers, object.function.slice(7))(...object.args);
    } catch (e) {
        throw new Error(
            `function: ${object.function}, args: ${object.args.join(",")}`
        );
    }
}
