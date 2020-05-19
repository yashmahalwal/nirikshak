import { OneOfEntries } from "../../../src/resource/types";
import faker from "faker";
import { RANDOMNESS_ITERATIONS } from "../../../src/resource/Env";
import { generateOneOfEntries } from "../../../src/resource/generation/oneOfEntries";

const entries: OneOfEntries[] = [
    {
        types: [
            1,
            2,
            3,
            ["stringify", 19, 30, 19.542],
            "faker:random.number",
            [[[[["custom.username"]]]]],
        ],
    },
    {
        fields: [
            { branch: "CSE" },
            {
                age: 12,
                name: 14,
                address: {
                    types: [
                        12.4353,
                        "faker:random.number",
                        { type: true, nullable: true },
                        [12, 13, 14, null, false, "myString"],
                    ],
                },
            },
        ],
    },
    {
        fields: [
            { name: "Name", surName: "Surname" },
            {
                age: {
                    type: {
                        function: "faker:random.number",
                        args: [{ min: 1, max: 100, precision: 0.1 }],
                    },
                    nullable: true,
                },
            },
        ],
        types: [12, 14, true, true, false, ["SIMP"]],
    },
];

describe("Oneof tests", () => {
    beforeAll(() => faker.seed(123));

    for (let i = 0; i < RANDOMNESS_ITERATIONS; i++)
        entries.forEach((entry, index) =>
            test(`Entry ${index}, iteration: ${i}`, () => {
                const o = generateOneOfEntries(entry);
                // Validate with snapshot
                expect(o).toMatchSnapshot();
                // Check if the entry came from the input
                expect(
                    ("types" in entry &&
                        entry.types.includes(o.selection as any)) ||
                        ("fields" in entry &&
                            entry.fields.includes(o.selection as any))
                ).toBe(true);
            })
        );
});
