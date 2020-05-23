import { CustomFunctionType, normalizeCustomFunction } from "../types/custom";
import _ from "lodash";
import { Literal } from "../types/literals";
import { SchemaHelpers } from "../types/helpers";

// Function to extract the custom function from helper and generate value
export async function generateCustom(
    input: CustomFunctionType,
    helpers: SchemaHelpers
): Promise<Literal> {
    const object = normalizeCustomFunction(input);
    try {
        return _.get(helpers, object.function.slice(7))(...object.args);
    } catch (e) {
        throw new Error(
            `function: ${object.function}, args: ${object.args.join(",")}`
        );
    }
}
