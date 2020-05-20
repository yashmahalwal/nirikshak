import {
    ResourceBase,
    Resource,
    isBaseType,
    isWithModifiersBaseType,
    isWithModifiersResource,
    isOneOfEntries,
    isWithModifiers,
} from "../types";
import { ResourceInstance, ResourceHelpers } from "../types/helper";
import { generateBaseType } from "./baseGen";
import faker from "faker";
import { generateWithModifiers } from "./withModifiersGen";
import { generateOneOfEntries } from "./oneOfEntries";

export async function generateResourceBase(
    input: ResourceBase,
    Helpers: ResourceHelpers
): Promise<Omit<ResourceInstance, "identifier">> {
    const o: Omit<ResourceInstance, "identifier"> = {};
    for (const key in input) {
        // For each key value pair of resource base description
        const entry = input[key];

        if (isBaseType(entry)) {
            // Base type
            o[key] = await generateBaseType(entry, Helpers);
        } else if (isWithModifiers(entry)) {
            // With modifiers
            // If the entry is optional, skip this key
            if (entry.optional && faker.random.boolean()) continue;
            o[key] = await generateWithModifiers(entry, Helpers);
        } else if (isOneOfEntries(entry)) {
            // Selecting from oneof
            const actualEntry = generateOneOfEntries(entry);

            // Generating data
            switch (actualEntry.type) {
                case "base type":
                    // If base type, with modifiers
                    if (isWithModifiersBaseType(actualEntry.selection)) {
                        o[key] = await generateWithModifiers(
                            actualEntry.selection,
                            Helpers
                        );
                    }
                    // Simply base type
                    else
                        o[key] = await generateBaseType(
                            actualEntry.selection,
                            Helpers
                        );
                    break;
                case "resource base":
                    // If with modifiers, resource base
                    if (isWithModifiersResource(actualEntry.selection)) {
                        o[key] = await generateWithModifiers(
                            actualEntry.selection,
                            Helpers
                        );
                    }
                    // Simply resource base
                    else
                        o[key] = await generateResourceBase(
                            actualEntry.selection,
                            Helpers
                        );
                    break;
            }
        }
        // Resource base
        else o[key] = await generateResourceBase(entry, Helpers);
    }

    return o;
}

export async function generateResource(
    input: Resource,
    Helpers: ResourceHelpers
): Promise<ResourceInstance> {
    return {
        // Generate resource base. This also includes identifier
        ...(await generateResourceBase(input, Helpers)),
        // Overriding any other identifier defs with the main one
        identifier: (await generateBaseType(input.identifier, Helpers)) as
            | string
            | number,
    };
}
