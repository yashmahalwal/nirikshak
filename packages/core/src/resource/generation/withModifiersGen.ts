import {
    WithModifiers,
    BaseType,
    ResourceBase,
    isWithModifiersBaseType,
} from "../types";
import faker from "faker";
import { generateBaseType } from "./baseGen";
import { ResourceHelpers, Primitives, ResourceInstance } from "../types/helper";
import { MIN_PLURAL_ENTRIES, MAX_PLURAL_ENTRIES } from "../Env";
import { generateResourceBase } from "./resourceGen";
type ValueAndArray<T> = T | Array<T>;

//  Nullable and Plural arguments override the input attributes

// To generate data for BaseType with modifiers
function generateWithModifiersBaseType(
    input: WithModifiers<BaseType>,
    Helpers: ResourceHelpers
): null | ValueAndArray<Primitives> {
    // If optional attribute was considered, this function is not invoked
    // So the entry is skipped. Refer generateResourceBase to check
    if (input.nullable && faker.random.boolean()) return null;

    if (input.plural && faker.random.boolean()) {
        const arr: Primitives[] = [];

        // Use faker.random.number over Math.random
        // So as to have a universal randomness seed
        const length = faker.random.number({
            min: MIN_PLURAL_ENTRIES,
            max: MAX_PLURAL_ENTRIES,
            precision: 1,
        });

        for (let i = 0; i < length; i++)
            arr.push(generateBaseType(input.type, Helpers));

        return arr;
    }
    return generateBaseType(input.type, Helpers);
}

// To generate data for BaseType with modifiers
function generateWithModifiersResourceBase(
    input: WithModifiers<ResourceBase>,
    Helpers: ResourceHelpers
): null | ValueAndArray<Omit<ResourceInstance, "identifier">> {
    // If optional attribute was considered, this function is not invoked
    // So the entry is skipped. Refer generateResourceBase to check
    if (input.nullable && faker.random.boolean()) return null;

    if (input.plural && faker.random.boolean()) {
        const arr: Omit<ResourceInstance, "identifier">[] = [];

        const length = faker.random.number({
            min: MIN_PLURAL_ENTRIES,
            max: MAX_PLURAL_ENTRIES,
            precision: 1,
        });

        for (let i = 0; i < length; i++)
            arr.push(generateResourceBase(input.field, Helpers));

        return arr;
    }
    return generateResourceBase(input.field, Helpers);
}

// To generate data with modifiers
export function generateWithModifiers<T extends BaseType | ResourceBase>(
    input: WithModifiers<T>,
    Helpers: ResourceHelpers
):
    | null
    | (T extends BaseType
          ? ValueAndArray<Primitives>
          : ValueAndArray<Omit<ResourceInstance, "identifier">>) {
    // If optional attribute is invoked, this function won't be called at all
    // Only account for nullable and plural options

    if (isWithModifiersBaseType(input))
        // Need to use any case because conditional inference does not include internal typeguards
        // For now,ts cannot imply that T extends BaseType in this branch
        return generateWithModifiersBaseType(
            input as WithModifiers<BaseType>,
            Helpers
        ) as any;

    return generateWithModifiersResourceBase(
        input as WithModifiers<ResourceBase>,
        Helpers
    ) as any;
}
