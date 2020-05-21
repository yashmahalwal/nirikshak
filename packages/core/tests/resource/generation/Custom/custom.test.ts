import { CustomFunctionType } from "../../../../src/common/types/custom";
import { ResourceHelpers } from "../../../../src/resource/types/helper";
import faker from "faker";
import { generateCustom } from "../../../../src/resource/generation/customGen";

const RandomFakerPromise = (): Promise<string> =>
    new Promise((resolve) => {
        const val = faker.random.word();
        setTimeout(
            () => resolve(val),
            // Don't need determinism here
            2000
        );
    });

// Helpers for the resource
const Helpers: ResourceHelpers = {
    username: async () => faker.name.firstName() + faker.name.lastName(),
    number: async (min: number, max: number, step: number) =>
        // Use faker.random.number instead of Math.random
        // For universal randomness seed
        faker.random.number({ min, max, precision: step }),
    color: () => RandomFakerPromise(),
};

// Valid custom function types
const ValidCustoms: CustomFunctionType[] = [
    "custom:username",
    {
        function: "custom:number",
        args: [{ min: 0, max: 1, precision: 0.1 }],
    },
    { function: "custom:color", args: [] },
];

describe("Custom literal generation", () => {
    // Settings randomness seed
    // Does not work with faker.random.uuid and faker.date.*
    beforeAll(() => faker.seed(123));

    test.each(ValidCustoms)(`Valid custom: %#`, async (entry) =>
        expect(await generateCustom(entry, Helpers)).toMatchSnapshot()
    );

    // Checking that the function throws an error if no valid helper found at runtime
    test("Invalid custom literal: No helper found", () =>
        expect(
            generateCustom("custom:lipsum", Helpers)
        ).rejects.toMatchInlineSnapshot(
            `[Error: function: custom:lipsum, args: ]`
        ));
});
