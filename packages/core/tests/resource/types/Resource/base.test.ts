import {
    ResourceBase,
    Base,
    isResourceBase,
} from "../../../../src/resource/types";
import faker from "faker";
const ValidBases: Base[] = [
    "Stringify",
    null,
    12,
    ["Stringigy", 12, null],
    "faker:random.number",
    {
        function: "custom:loremIpsum",
        args: [12, true, false, null],
    },
    {
        literals: [
            false,
            null,
            "String Name",
            {
                literals: [
                    {
                        literals: "My My Literals",
                    },
                ],
            },
        ],
    },
    {
        type: true,
        nullable: true,
    },
    {
        type: { literals: [2, null, { literals: true }] },
        nullable: true,
        plural: true,
        optional: true,
    },
];

const InvalidBases: any[] = [undefined, [undefined], [12, [14, "true", null]]];

const ValidResourceBases: ResourceBase[] = [
    { [faker.random.word()]: ValidBases[0] },
    {
        [faker.random.word()]: ValidBases[0],
        [faker.random.word()]: ValidBases[1],
        [faker.random.word()]: ValidBases[2],
        [faker.random.word()]: ValidBases[3],
        [faker.random.word()]: ValidBases[4],
        [faker.random.word()]: ValidBases[5],
        [faker.random.word()]: ValidBases[6],
    },
    {
        [faker.random.word()]: ValidBases[4],
        [faker.random.word()]: ValidBases[6],
        [faker.random.word()]: ValidBases[1],
    },
    { [faker.random.word()]: ValidBases[2] },
    { [faker.random.word()]: ValidBases[5] },
    { [faker.random.word()]: ValidBases[4] },
    { [faker.random.word()]: ValidBases[1] },
    {
        [faker.random.word()]: ValidBases[7],
        [faker.random.word()]: ValidBases[8],
    },
    {
        [faker.random.word()]: {
            types: [
                ValidBases[0],
                ValidBases[3],
                ValidBases[2],
                ValidBases[7],
                ValidBases[8],
            ],
            oneof: true,
        },
        [faker.random.word()]: ValidBases[6],
        [faker.random.word()]: ValidBases[1],
    },
];

const InvalidResourceBases: { [key: string]: any } = [
    { [faker.random.word()]: InvalidBases[0] },
    {
        [faker.random.word()]: InvalidBases[0],
        [faker.random.word()]: InvalidBases[1],
        [faker.random.word()]: InvalidBases[2],
        [faker.random.word()]: InvalidBases[3],
        [faker.random.word()]: InvalidBases[4],
        [faker.random.word()]: InvalidBases[5],
        [faker.random.word()]: InvalidBases[6],
    },
    {
        [faker.random.word()]: InvalidBases[4],
        [faker.random.word()]: InvalidBases[6],
        [faker.random.word()]: InvalidBases[1],
    },
    { [faker.random.word()]: InvalidBases[2] },
    { [faker.random.word()]: InvalidBases[5] },
    { [faker.random.word()]: InvalidBases[4] },
    { [faker.random.word()]: InvalidBases[1] },
];

describe("Resource base with only base types", () => {
    ValidResourceBases.forEach((validBase, index) =>
        test(`Valid base ${index}`, () =>
            expect(isResourceBase(validBase)).toBe(true))
    );

    InvalidResourceBases.forEach((invalidBase, index) =>
        test(`Invalid base ${index}`, () =>
            expect(isResourceBase(invalidBase)).toBe(false))
    );
});
