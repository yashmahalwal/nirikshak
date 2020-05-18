import {
    isLiteralObject,
    LiteralObject,
} from "../../../../src/resource/types/primitive";

const ValidObjects: LiteralObject[] = [
    { literals: null },
    { literals: "My Common String string" },
    { literals: [] },
    {
        literals: [
            "name",
            12,
            false,
            { literals: false },
            true,
            { literals: [true, false] },
        ],
    },
    {
        literals: [
            "name",
            12,
            false,
            {
                literals: [
                    null,
                    null,
                    4324,
                    "ehul",
                    {
                        literals: [
                            { literals: [] },
                            { literals: [null, false, "", 214324] },
                            false,
                            false,
                            12,
                            0,
                            { literals: [{ literals: [true] }] },
                        ],
                    },
                ],
            },
            true,
            { literals: [true, false] },
        ],
    },
];

const InvalidObjects : any[]= [
    true,
    12,
    "ege",
    null,
    undefined,
    { literals: { literals: { literals: 12 } } },
    { literals: undefined },
    { literals: [undefined, true] },
    {
        literel: [
            "name",
            12,
            false,
            { literals: false },
            true,
            { literals: [true, false] },
        ],
    },
    {
        literals: [
            12,
            true,
            true,
            242134213,
            "fefwefsdjfk",
            [12],
            [13],
            ["fdbjkgsfs", false, null],
        ],
    },
    { literals: [[[[[true]]]]] },
    {
        literals: [
            "name",
            12,
            [false, { literals: false }],
            true,
            { literals: [true, false] },
        ],
    },
    {
        literals: [
            "name",
            12,
            false,
            {
                literals: [
                    null,
                    null,
                    4324,
                    "ehul",
                    {
                        literals: [
                            { literals: [] },
                            [{ literals: [null, false, "", 214324] }],
                            false,
                            false,
                            12,
                            0,
                            { literals: [{ literals: [true] }] },
                        ],
                    },
                ],
            },
            true,
            { literals: [true, false] },
        ],
    },
    {
        literals: [
            "name",
            12,
            false,
            {
                literals: [
                    null,
                    null,
                    4324,
                    "ehul",
                    {
                        literals: [
                            { literals: [] },
                            { literals: [null, false, "", [214324]] },
                            false,
                            false,
                            12,
                            0,
                            { literals: [{ literals: [[true]] }] },
                        ],
                    },
                ],
            },
            true,
            { literals: [true, false] },
        ],
    },
];

describe("Literal objects", () => {
    ValidObjects.forEach((entry, index) =>
        test(`Valid literal object ${index}`, () =>
            expect(isLiteralObject(entry)).toBe(true))
    );

    InvalidObjects.forEach((entry, index) =>
        test(`Invalid literal object ${index}`, () =>
            expect(isLiteralObject(entry)).toBe(false))
    );
});
