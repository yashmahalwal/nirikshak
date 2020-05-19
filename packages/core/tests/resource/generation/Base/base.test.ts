/* 
    Test to check base type generation
*/
import faker from "faker";
import { BaseType } from "../../../../src/resource/types";
import {
    ResourceHelpers,
    isPrimitives,
} from "../../../../src/resource/types/helper";
import { generateBaseType } from "../../../../src/resource/generation/baseGen";
import { RANDOMNESS_ITERATIONS } from "../../../../src/resource/Env";

// Helpers for the resource
const Helpers: ResourceHelpers = {
    username: () => faker.name.firstName() + faker.name.lastName(),
    number: (min: number, max: number, step: number) =>
        // Use faker.random.number instead of Math.random
        // For universal randomness seed
        faker.random.number({ min, max, precision: step }),
};

const SimpleBases: BaseType[] = [1, false, null, [1, 2, 3, 4, ["string"]]];
const ComplexBase: BaseType = [
    7,
    4,
    3,
    2,
    5,
    ["faker:random.number", [{ function: "custom:username", args: [] }]],
];

describe("Base type generation", () => {
    beforeAll(() => faker.seed(123));

    SimpleBases.forEach((base, index) =>
        test(`Simple base: ${index}`, () => {
            const o = generateBaseType(base, Helpers);
            expect(o).toEqual(base);
            expect(isPrimitives(o)).toBe(true);
        })
    );

    // Account for variation due to randomness of faker
    for (let i = 0; i < RANDOMNESS_ITERATIONS; i++)
        test(`ComplexBase iteration: ${i}`, () => {
            const o = generateBaseType(ComplexBase, Helpers);
            expect(o).toMatchSnapshot();
            expect(isPrimitives(o)).toBe(true);
        });
});
