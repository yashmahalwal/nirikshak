import { BaseType, isBaseType, isBase } from "../../../../src/resource/types";

const ValidBaseTypes: BaseType[] = [
    "faker:random.number",
    { function: "faker:lorem.lines", args: [1] },
    "custom:MyFucntion",
    { function: "custom:MyFucntion", args: [[[true]]] },
    true,
    [12, null],
    { literals: 12 },
    { literals: [true] },
    {
        literals: [
            "String",
            {
                literals: "Yash",
            },
        ],
    },
];

const InvalidBaseTypes: any[] = [
    { fc: "faker:random.number" },
    { function: "faker:random.number", args: true },
    { fc: "custom:random.number" },
    { custom: "custom:random.number", args: false },
    undefined,
    [[12], null],
    [undefined],
    { literals: undefined },
    { literals: [12, 13, [14]] },
    { literals: [true, false, { literals: undefined }] },
];

describe("Base Type", () => {
    ValidBaseTypes.forEach((entry, index) =>
        test(`Valid base type: ${index}`, () => {
            expect(isBaseType(entry)).toBe(true);
            expect(isBase(entry)).toBe(true);
        })
    );

    InvalidBaseTypes.forEach((entry, index) =>
        test(`Invalid base type: ${index}`, () => {
            expect(isBaseType(entry)).toBe(false);
            expect(isBase(entry)).toBe(false);
        })
    );
});
