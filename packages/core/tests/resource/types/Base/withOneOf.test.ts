import {
    BaseType,
    WithOneof,
    isWithOneof,
} from "../../../../src/resource/types";

const ValidBaseArrays: BaseType[][] = [
    [12],
    ["string", null, true, false, { literals: [{ literals: 12 }] }],
    [
        {
            literals: [
                "string",
                231241,
                {
                    literals: [
                        {
                            literals: [
                                {
                                    literals: [0],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        true,
        null,
        true,
    ],
    [
        { function: "faker:random.number", args: [] },
        { function: "custom:myFunc", args: [true, true] },
    ],
];

const InvalidBaseArrays: any[] = [
    12,
    undefined,
    { function: "faker:random.number" },
    {
        laterals: [12, "true"],
    },
    {
        literals: [12, [13]],
    },
    {
        literals: {
            literals: {
                literals: undefined,
            },
        },
    },
    [undefined],
    ["string", undefined, null],
    [{ literals: [{ literals: 13 }] }, { literals: undefined }],
    [
        {
            laterals: [12, "true"],
        },
    ],
];

const ValidMods: Omit<WithOneof<BaseType>, "types">[] = [{ oneof: true }];
const InvalidMods: { [key: string]: any }[] = [
    { oneof: false },
    {},
    { ofOne: true },
    { oneof: 1 },
];

const ValidOneOfs: WithOneof<BaseType>[] = [];
const InvalidOneOfs: any[] = [];

ValidMods.forEach((mods) => {
    const o = Object.create(mods);
    ValidBaseArrays.forEach((baseArr) => {
        const p: WithOneof<BaseType> = Object.create(o);
        p.types = baseArr;
        ValidOneOfs.push(p);
    });

    InvalidBaseArrays.forEach((baseArr) => {
        const p: WithOneof<BaseType> = Object.create(o);
        p.types = baseArr;
        InvalidOneOfs.push(p);
    });
});

InvalidMods.forEach((mods) => {
    const o = Object.create(mods);
    ValidBaseArrays.forEach((baseArr) => {
        const p: WithOneof<BaseType> = Object.create(o);
        p.types = baseArr;
        InvalidOneOfs.push(p);
    });

    InvalidBaseArrays.forEach((baseArr) => {
        const p: WithOneof<BaseType> = Object.create(o);
        p.types = baseArr;
        InvalidOneOfs.push(p);
    });
});

describe("With one of : Base", () => {
    ValidOneOfs.forEach((oneof, index) =>
        test(`Valid oneof ${index}`, () => {
            expect(isWithOneof(oneof)).toBe(true);
        })
    );

    InvalidOneOfs.forEach((oneof, index) =>
        test(`Invalid oneof ${index}`, () => {
            expect(isWithOneof(oneof)).toBe(false);
        })
    );
});
