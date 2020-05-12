import {
    isNakedLiteral,
    NakedLiteral,
} from "../../../src/resource/types/primitive";
import {
    getValidLiteralArrays,
    getValidLiterals,
    getInvalidLiterals,
    getInvalidArrays,
    generateCompositeValidArr,
    generateCompositeInvalidArr,
} from "./utils";

/* Valid Literals */
const ValidLiterals = getValidLiterals();

/* Array of valid literals */
const ValidArr = getValidLiteralArrays(ValidLiterals);

/* Invalid literals */
const InvalidBase = getInvalidLiterals();

/* Array of valid + invalid literals */
const InvalidArr: any[][] = getInvalidArrays(InvalidBase, ValidLiterals);

/* Array of simple and arrays of valid literals */
const CompositeValidArrays: NakedLiteral[] = generateCompositeValidArr(
    ValidArr,
    ValidLiterals
);

/* Array of simple and arrays of Valid and Invalid literals */
const CompositeInvalidArrays: any[][] = generateCompositeInvalidArr(
    ValidArr,
    InvalidArr,
    InvalidBase,
    ValidLiterals
);

describe("Naked Literals", () => {
    test.each(ValidLiterals)("Basic positive entry %#", (val) =>
        expect(isNakedLiteral(val)).toBe(true)
    );

    test.each(ValidArr)("Positive array entry %#", (arr) =>
        expect(isNakedLiteral(arr)).toBe(true)
    );

    test.each(InvalidBase)("Basic negative entry %#", (val) =>
        expect(isNakedLiteral(val)).toBe(false)
    );

    InvalidArr.forEach((arr, index) =>
        test(`Negative array entry ${index}`, () => {
            expect(isNakedLiteral(arr)).toBe(false);
        })
    );

    CompositeValidArrays.forEach((entry, index) => {
        test(`Composite positive array entry ${index}`, () => {
            expect(isNakedLiteral(entry)).toBe(false);
        });
    });

    CompositeInvalidArrays.forEach((entry, index) =>
        test(`Composite negative array entry ${index}`, () =>
            expect(isNakedLiteral(entry)).toBe(false))
    );
});