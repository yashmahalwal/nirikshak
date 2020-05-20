import { BaseType, WithModifiers } from "../../../../src/resource/types";
import faker from "faker";
import {
    ResourceHelpers,
    isPrimitives,
} from "../../../../src/resource/types/helper";
import { ValidModifiers } from "../../utils";
import { RANDOMNESS_ITERATIONS } from "../../../../src/resource/Env";
import { generateWithModifiers } from "../../../../src/resource/generation/withModifiersGen";

// Helpers for the resource
const Helpers: ResourceHelpers = {
    username: async () => faker.name.firstName() + faker.name.lastName(),
    number: async (min: number, max: number, step: number) =>
        // Use faker.random.number instead of Math.random
        // For universal randomness seed
        faker.random.number({ min, max, precision: step }),
};

const entries: BaseType[] = [
    [
        1,
        2,
        34,
        7,
        9,
        [
            "faker:random.number",
            "My String",
            { function: "custom:number", args: [0, 10, 1] },
        ],
    ],
];

const inputs: WithModifiers<BaseType>[] = [];
entries.forEach((entry) =>
    ValidModifiers.forEach((modifiers) => {
        const o: WithModifiers<BaseType> = Object.create(modifiers);
        o.type = entry;
        inputs.push(o);
    })
);

describe("Generating base types with modifiers", () => {
    beforeAll(() => faker.seed(123));

    inputs.forEach((input, index) => {
        for (let i = 0; i < RANDOMNESS_ITERATIONS; i++) {
            test(`Base type: ${index}, iteration: ${i}`, async () => {
                const o = await generateWithModifiers(input, Helpers);

                expect(o).toMatchSnapshot();
                expect(isPrimitives(o)).toBe(true);

                if (input.plural && !input.nullable && !input.optional)
                    expect(Array.isArray(o)).toBe(true);
            });
        }
    });
});
