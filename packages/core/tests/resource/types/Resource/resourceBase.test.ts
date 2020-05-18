import { ResourceBase, isResourceBase } from "../../../../src/resource/types";
import faker from "faker";

const ValidResources: ResourceBase[] = [
    {
        [faker.random.word()]: {
            [faker.random.word()]: [12, 13, 15, 15, 18, "stringify"],
        },
        [faker.random.word()]: {
            type: null,
            nullable: true,
            optional: true,
        },
    },
    {
        [faker.random.word()]: {
            [faker.random.word()]: {
                [faker.random.word()]: {
                    type: { literals: [{ literals: [{ literals: 13 }] }] },
                },
            },
        },
        [faker.random.word()]: "faker:random.number",
        [faker.random.word()]: {
            function: "custom:My Function",
            args: ["str", false, null],
        },
    },
    {
        [faker.random.words()]: {
            oneof: false,
        },
    },
    {
        [faker.random.word()]: {
            field: {
                [faker.random.word()]: "faker:random.name",
            },
            nullable: false,
            plural: true,
            optional: true,
        },
    },
    {
        [faker.random.words()]: {
            oneof: true,
        },
    },
    {
        [faker.random.word()]: {
            fields: [
                { [faker.random.word()]: false },
                {
                    [faker.random.word()]: {
                        type: {
                            function: "faker:random.number",
                            args: [1, 3, "str"],
                        },
                        plural: true,
                        optional: true,
                    },
                },
                {
                    [faker.random.word()]: {
                        types: [
                            "faker:random.number",
                            "custom:myFunctor",
                            true,
                            23,
                            {
                                type: "faker:random.words",
                                nullable: true,
                                plural: true,
                            },
                            { literals: [true, 15, 17, { literals: "any" }] },
                        ],
                        oneof: true,
                    },
                },
            ],
            oneof: true,
        },
    },
];

const InvalidResources: any[] = [
    12,
    undefined,
    { [faker.random.word()]: undefined },
    {
        [faker.random.word()]: "faker:name.firstName",
        [faker.random.words()]: {
            [faker.random.words()]: {
                literals: [1, 3, true, true, false, ["StringifyMe"]],
            },
        },
    },
];

describe("Resource base with nested resource bases", () => {
    ValidResources.forEach((resource, index) =>
        test(`Valid resource base ${index}`, () =>
            expect(isResourceBase(resource)).toBe(true))
    );

    InvalidResources.forEach((resource, index) =>
        test(`Invalid resource base ${index}`, () =>
            expect(isResourceBase(resource)).toBe(false))
    );
});
