/* 
    Test to check base type generation
*/
import faker from "faker";
import {
    isPrimitives,
    BaseType,
    Primitives,
} from "../../../../src/resource/types/helper";
import { generateBaseType } from "../../../../src/resource/generation/baseGen";
import { RANDOMNESS_ITERATIONS } from "../../../../src/resource/Env";
import { SchemaHelpers } from "../../../../src/common/types/helpers";

// Helpers for the resource
const Helpers: SchemaHelpers = {
    username: async () => faker.name.firstName() + faker.name.lastName(),
    number: async (min: number, max: number, step: number) =>
        // Use faker.random.number instead of Math.random
        // For universal randomness seed
        faker.random.number({ min, max, precision: step }),
};

const SimpleBases: BaseType[] = [1, false, null, [1, 2, 3, 4, ["string"]]];
const ComplexBase: { input: BaseType; output: () => Promise<Primitives> } = {
    input: [
        7,
        4,
        3,
        2,
        5,
        ["faker:random.number", [{ function: "custom:username", args: [] }]],
        "custom:username",
    ],
    output: async () => [
        7,
        4,
        3,
        2,
        5,
        [faker.random.number(), [await Helpers.username()]],
        await Helpers.username(),
    ],
};

describe("Base type generation", () => {
    beforeAll(() => faker.seed(123));

    SimpleBases.forEach((base, index) =>
        test(`Simple base: ${index}`, async () => {
            const o = await generateBaseType(base, Helpers);
            expect(o).toEqual(base);
            expect(isPrimitives(o)).toBe(true);
        })
    );

    // Account for variation due to randomness of faker
    for (let i = 0; i < RANDOMNESS_ITERATIONS; i++)
        test(`ComplexBase iteration: ${i}`, async () => {
            faker.seed(i + 123);
            const o = await generateBaseType(ComplexBase.input, Helpers);
            faker.seed(i + 123);
            const expected = await ComplexBase.output();
            expect(o).toEqual(expected);
            expect(isPrimitives(o)).toBe(true);
        });
});
