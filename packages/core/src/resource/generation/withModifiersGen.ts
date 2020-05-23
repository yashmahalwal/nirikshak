import { ResourceBase } from "../types";
import faker from "faker";
import { generateBaseType } from "./baseGen";
import {
    Primitives,
    ResourceInstance,
    WithModifiers,
    BaseType,
    isWithModifiersBaseType,
} from "../types/helper";
import { MIN_PLURAL_ENTRIES, MAX_PLURAL_ENTRIES } from "../Env";
import { generateResourceBase } from "./resourceGen";
import { SchemaHelpers } from "../../common/types/helpers";
type ValueAndArray<T> = T | Array<T>;

//  Nullable and Plural arguments override the input attributes

// To generate data for BaseType with modifiers
async function generateWithModifiersBaseType(
    input: WithModifiers<BaseType>,
    Helpers: SchemaHelpers
): Promise<Primitives> {
    // If optional attribute was considered, this function is not invoked
    // So the entry is skipped. Refer generateResourceBase to check
    if (input.nullable && faker.random.boolean()) return null;

    if (input.plural) {
        const arr: Primitives[] = [];

        // Use faker.random.number over Math.random
        // So as to have a universal randomness seed
        const length = faker.random.number({
            min: MIN_PLURAL_ENTRIES,
            max: MAX_PLURAL_ENTRIES,
            precision: 1,
        });

        for (let i = 0; i < length; i++)
            arr.push(await generateBaseType(input.type, Helpers));

        return arr;
    }
    return await generateBaseType(input.type, Helpers);
}

// To generate data for BaseType with modifiers
async function generateWithModifiersResourceBase(
    input: WithModifiers<ResourceBase>,
    Helpers: SchemaHelpers
): Promise<null | ValueAndArray<Omit<ResourceInstance, "id">>> {
    // If optional attribute was considered, this function is not invoked
    // So the entry is skipped. Refer generateResourceBase to check
    if (input.nullable && faker.random.boolean()) return null;

    if (input.plural) {
        const arr: Omit<ResourceInstance, "id">[] = [];

        const length = faker.random.number({
            min: MIN_PLURAL_ENTRIES,
            max: MAX_PLURAL_ENTRIES,
            precision: 1,
        });

        for (let i = 0; i < length; i++)
            arr.push(await generateResourceBase(input.field, Helpers));

        return arr;
    }
    return generateResourceBase(input.field, Helpers);
}

// To generate data with modifiers
export async function generateWithModifiers<T extends BaseType | ResourceBase>(
    input: WithModifiers<T>,
    Helpers: SchemaHelpers
): Promise<
    | null
    | (T extends BaseType
          ? Primitives
          : ValueAndArray<Omit<ResourceInstance, "id">>)
> {
    // If optional attribute is invoked, this function won't be called at all
    // Only account for nullable and plural options

    if (isWithModifiersBaseType(input))
        // Need to use any case because conditional inference does not include internal typeguards
        // For now,ts cannot imply that T extends BaseType in this branch
        return (await generateWithModifiersBaseType(
            input as WithModifiers<BaseType>,
            Helpers
        )) as any;

    return (await generateWithModifiersResourceBase(
        input as WithModifiers<ResourceBase>,
        Helpers
    )) as any;
}
