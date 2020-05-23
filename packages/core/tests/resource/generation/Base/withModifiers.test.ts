import faker from "faker";
import {
    BaseType,
    WithModifiers,
    isPrimitives,
} from "../../../../src/resource/types/helper";
import { RANDOMNESS_ITERATIONS } from "../../../../src/resource/Env";
import { generateWithModifiers } from "../../../../src/resource/generation/withModifiersGen";
import { ValidModifiers } from "../../utils";
import { SchemaHelpers } from "../../../../src/common/types/helpers";

// Helpers for the resource
const Helpers: SchemaHelpers = {
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
        const o = Object.assign({}, modifiers) as WithModifiers<BaseType>;
        o.type = entry;
        inputs.push(o);
    })
);

describe("Generating base types with modifiers", () => {
    inputs.forEach((input, index) => {
        for (let i = 0; i < RANDOMNESS_ITERATIONS; i++) {
            test(`Base type: ${index}, iteration: ${i}`, async () => {
                faker.seed(index * i + 123);
                const o = await generateWithModifiers(input, Helpers);
                expect(o).toMatchSnapshot();
                expect(isPrimitives(o)).toBe(true);
                faker.seed(index * i + 123);
                expect(o === null).toBe(
                    !!(input.nullable && faker.random.boolean())
                );
                if (input.plural && !input.nullable)
                    expect(Array.isArray(o)).toBe(true);
            });
        }
    });
});
