/* 
    Test to validate resource generation
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
    username: () => faker.name.firstName() + faker.name.lastName(),
    number: (min: number, max: number, step: number) =>
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
];

describe(`Resource base type`, () => {
    // Setting randomness seed
    beforeAll(() => faker.seed(123));

    // Account for randomness
    for (let i = 0; i < RANDOMNESS_ITERATIONS; i++)
        ValidResourceBases.forEach((resource, index) =>
            test(`resource base: ${index}, iteration: ${i}`, () =>
                expect(
                    generateResourceBase(resource, Helpers)
                ).toMatchSnapshot())
        );
});

describe(`Resource type`, () => {
    // Setting randomness seed
    beforeAll(() => faker.seed(123));
    // Account for randomness
    for (let i = 0; i < RANDOMNESS_ITERATIONS; i++)
        ValidResourceBases.forEach((resource, index) =>
            test(`resource base ${index}, iteration: ${i}`, () => {
                const o: Resource = Object.create(resource);
                o.identifier = "faker:random.word";
                expect(generateResource(o, Helpers)).toMatchSnapshot();
            })
        );
});