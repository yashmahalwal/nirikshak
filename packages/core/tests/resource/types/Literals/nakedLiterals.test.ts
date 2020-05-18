import {
    isNakedLiteral,
    NakedLiteral,
} from "../../../../src/resource/types/primitive";
/* isNakedLiteral:
    Function that takes a literal or an array of literals
    and checks for the validity.
    Internally uses isLiteralBase function
*/

const ValidLiterals: NakedLiteral[] = [12, false, null, "Name"];
const InvalidLiterals: any[] = [undefined];
const ValidLiteralArrays: NakedLiteral[] = [
    [],
    [12],
    [false],
    [null],
    ["name"],
    [12, false],
    [12, null],
    ["Name", 12],
    ["Name", null, false],
    ["Stringify", true, 12],
    [12, true, null, "Name"],
    [0, false, null, ""],
];

const ArrayOfValidArrays: any[][] = [
    [[], [12], [false], [null]],
    [["name"], true],
    [false, "12", null, [12, false]],
    [[12, null]],
    [[["Name", 12]]],
    [true, 42341332, ["Name", null, false]],
    [["Stringify", true, 12]],
    [12, [false], null, "Name"],
];

const ArrayOfMixedValues: any[] = [
    [undefined, "Name", null, false],
    [[["Name", 12]], undefined],
    [true, undefined, 42341332, ["Name", null, false]],
    [[], [], undefined, ["Stringify", true, 12]],
];

describe("Naked Literals", () => {
    test.each(ValidLiterals)("Valid literal %#", (entry) =>
        expect(isNakedLiteral(entry)).toBe(true)
    );

    test.each(InvalidLiterals)("Invalid literal %#", (entry) =>
        expect(isNakedLiteral(entry)).toBe(false)
    );

    ValidLiteralArrays.forEach((entry, index) =>
        test(`Array of valid literals ${index}`, () =>
            expect(isNakedLiteral(entry)).toBe(true))
    );

    ArrayOfValidArrays.forEach((entry, index) =>
        test(`Array of nested arrays of valid literals ${index}`, () =>
            expect(isNakedLiteral(entry)).toBe(false))
    );

    ArrayOfMixedValues.forEach((entry, index) =>
        test(`Array of nested arrays of valid and invalid literals ${index}`, () =>
            expect(isNakedLiteral(entry)).toBe(false))
    );
});
