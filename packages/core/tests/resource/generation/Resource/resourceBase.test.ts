/* 
    Test to validate resource generation
    Not testing in depth as other functions are assumed to be working correctly
*/
import { ResourceBase, Resource } from "../../../../src/resource/types";
import { RANDOMNESS_ITERATIONS } from "../../../../src/resource/Env";
import {
    generateResourceBase,
    generateResource,
} from "../../../../src/resource/generation/resourceGen";
import faker from "faker";
import { ResourceHelpers } from "../../../../src/resource/types/helper";
// Helpers for the resource
const Helpers: ResourceHelpers = {
    username: async () => faker.name.firstName() + faker.name.lastName(),
    number: async (min: number, max: number, step: number) =>
        // Use faker.random.number instead of Math.random
        // For universal randomness seed
        faker.random.number({ min, max, precision: step }),
};

const ValidResourceBases: ResourceBase[] = [
    {
        name: 15,
        class: "faker:random.number",
        branch: { function: "faker:random.words", args: [1] },
        address: "faker.random.zipCode",
    },
    {
        name: 15,
        class: "faker:random.number",
        branch: { function: "faker:random.words", args: [1] },
        address: "faker.random.zipCode",
    },
    {
        root: {
            f2: {
                type: [1, 2, 3, 4, "stirng", false, "faker:random.address"],
                nullable: true,
                plural: true,
                optional: true,
            },
            field: {
                f1: {
                    fields: [
                        {
                            branch: {
                                types: ["CSE", "ECE", "Mechanical"],
                                plural: false,
                                nullable: false,
                                optional: true,
                            },
                            section: {
                                function: "custom:username",
                                args: ["CSE", "ECE", "Mechanical"],
                            },
                        },
                        {
                            addresses: {
                                field: {
                                    city: {
                                        types: [
                                            "faker:random.words",
                                            "faker:address.city",
                                        ],
                                    },
                                    street: {
                                        fields: [
                                            {
                                                streetName:
                                                    "faker:address.streetName",
                                            },
                                            {
                                                streetAddress:
                                                    "faker:address.streetAddress",
                                            },
                                        ],
                                        types: ["faker:address.zipCode"],
                                    },
                                },
                                plural: true,
                                optional: true,
                                nullable: false,
                            },
                        },
                    ],
                    types: [
                        {
                            type: {
                                function: "custom:number",
                                args: [1, 7, 0.2],
                            },
                            plural: true,
                            optional: true,
                            nullable: false,
                        },
                        null,
                        "faker:random.number",
                        {
                            function: "faker:lorem.lines",
                        },
                        17.885,
                        false,
                        true,
                    ],
                },
                optional: true,
            },
        },
    },
    {
        f1: {
            types: [
                1,
                2,
                3,
                ["stringify", 19, 30, 19.542],
                "faker:random.number",
                [[[[["custom.username"]]]]],
            ],
        },
        f2: {
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
        f3: {
            fields: [
                { branch: 3 },
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
        f4: {
            fields: [
                { field: { name: "Name", surName: "Surname" }, plural: true },
            ],
        },
    },
];

describe(`Resource base type`, () => {
    // Setting randomness seed
    beforeAll(() => faker.seed(123));

    // Account for randomness
    for (let i = 0; i < RANDOMNESS_ITERATIONS; i++)
        ValidResourceBases.forEach((resource, index) =>
            test(`resource base: ${index}, iteration: ${i}`, async () =>
                expect(
                    await generateResourceBase(resource, Helpers)
                ).toMatchSnapshot())
        );
});

describe(`Resource type`, () => {
    // Setting randomness seed
    beforeAll(() => faker.seed(123));
    // Account for randomness
    for (let i = 0; i < RANDOMNESS_ITERATIONS; i++)
        ValidResourceBases.forEach((resource, index) =>
            test(`resource base ${index}, iteration: ${i}`, async () => {
                const o = Object.assign({}, resource) as Resource;
                o.id = "faker:random.word";
                expect(await generateResource(o, Helpers)).toMatchSnapshot();
            })
        );
});
