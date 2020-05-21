import { CustomFunctionType, normalizeCustomFunction } from "../../common/types/custom";
import { ResourceHelpers, Primitives } from "../types/helper";
import _ from "lodash";

// Function to extract the custom function from helper and generate value
export async function generateCustom(
    input: CustomFunctionType,
    helpers: ResourceHelpers
): Promise<Primitives> {
    const object = normalizeCustomFunction(input);
    try {
        return await _.get(helpers, object.function.slice(7))(...object.args);
    } catch (e) {
        throw new Error(
            `function: ${object.function}, args: ${object.args.join(",")}`
        );
    }
}
