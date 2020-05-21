import { Literal } from "../../common/types/literals";
import { isFakerType } from "../../common/types/fakerTypes";
import { generateFaker } from "./fakerGen";
import { isCustomFunction } from "../../common/types/custom";
import { generateCustom } from "./customGen";
import { ResourceHelpers, Primitives, BaseType } from "../types/helper";

// Generating base type entry
export async function generateBaseType(
    input: BaseType,
    Helpers: ResourceHelpers
): Promise<Primitives> {
    if (Array.isArray(input)) {
        const arr: Primitives = [];
        (input as (Literal | BaseType)[]).forEach(async (entry) => {
            arr.push(await generateBaseType(entry, Helpers));
        });

        return arr;
    }

    if (isFakerType(input)) return generateFaker(input);
    if (isCustomFunction(input)) return await generateCustom(input, Helpers);

    return input;
}
