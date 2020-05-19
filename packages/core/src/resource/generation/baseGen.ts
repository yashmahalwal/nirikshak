import { BaseType } from "../types";
import { Literal } from "../types/literals";
import { isFakerType } from "../types/fakerTypes";
import { generateFaker } from "./fakerGen";
import { isCustomFunction } from "../types/custom";
import { generateCustom } from "./customGen";
import { ResourceHelpers, Primitives } from "../types/helper";

// Generating base type entry
export function generateBaseType(
    input: BaseType,
    Helpers: ResourceHelpers
): Primitives {
    if (Array.isArray(input))
        return (input as (Literal | BaseType)[]).map((entry) =>
            generateBaseType(entry, Helpers)
        );

    if (isFakerType(input)) return generateFaker(input);
    if (isCustomFunction(input)) return generateCustom(input, Helpers);

    return input;
}
