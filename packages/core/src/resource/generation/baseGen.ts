import { Literal } from "../../common/types/literals";
import { isFakerType } from "../../common/types/fakerTypes";
import { isCustomFunction } from "../../common/types/custom";
import { generateCustom } from "../../common/generation/customGen";
import { Primitives, BaseType } from "../types/helper";
import { generateFaker } from "../../common/generation/fakerGen";
import { SchemaHelpers } from "../../common/types/helpers";

// Generating base type entry
export async function generateBaseType(
    input: BaseType,
    Helpers: SchemaHelpers
): Promise<Primitives> {
    if (Array.isArray(input)) {
        const arr: Primitives = [];
        for (const entry of input as (Literal | BaseType)[])
            arr.push(await generateBaseType(entry, Helpers));

        return arr;
    }

    if (isFakerType(input)) return generateFaker(input);
    if (isCustomFunction(input)) return generateCustom(input, Helpers);

    return input;
}
