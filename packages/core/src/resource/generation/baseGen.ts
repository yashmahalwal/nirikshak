import { BaseType } from "../types";
import { Literal } from "../types/literals";
import { isFakerType } from "../types/fakerTypes";
import { generateFaker } from "./fakerGen";
import { isCustomFunction } from "../types/custom";
import { generateCustom } from "./customGen";
import { ResourceHelpers, Primitives } from "../types/helper";

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
