import {
    NakedLiteral,
    isLiteral,
    LiteralObject,
} from "../../../../src/resource/types/primitive";

const ValidNakedLiterals: NakedLiteral[] = [
    241324,
    null,
    "",
    "egjsdkhjwf",
    [],
    [2423, 12311, "fwfwe", false, false, true],
    [null],
    ["fwefwqfq"],
];

const InvalidNakedLiterals: any[] = [
    undefined,
    [undefined],
    [12, "efedf", undefined],
    [[2423, 12311, "fwfwe"], false, [false, true]],
    [[[2423, 12311, "fwfwe"], false, [false, true]]],
];

const ValidLiteralObjects: LiteralObject[] = [
    { literals: true },
    { literals: [true, false, 12, "awkjfashkj"] },
    { literals: [true, { literals: false }, 12, "awkjfashkj"] },
    {
        literals: [
            true,
            {
                literals: [
                    false,
                    12,
                    {
                        literals: [
                            {
                                literals: [
                                    true,
                                    "ghuewffuiw",
                                    { literals: [] },
                                ],
                            },
                        ],
                    },
                ],
            },
            12,
            "awkjfashkj",
        ],
    },
];

const InvalidLiteralObjects: any[] = [
    undefined,
    { literel: true },
    { literals: { literals: true } },
];

describe("Literals", () => {
    ValidNakedLiterals.forEach((entry, index) =>
        test(`Valid naked literal ${index}`, () =>
            expect(isLiteral(entry)).toBe(true))
    );

    InvalidNakedLiterals.forEach((entry, index) =>
        test(`Invalid naked literal ${index}`, () =>
            expect(isLiteral(entry)).toBe(false))
    );

    ValidLiteralObjects.forEach((entry, index) =>
        test(`Valid literal object ${index}`, () =>
            expect(isLiteral(entry)).toBe(true))
    );

    InvalidLiteralObjects.forEach((entry, index) =>
        test(`Invalid literal object ${index}`, () =>
            expect(isLiteral(entry)).toBe(false))
    );
});
