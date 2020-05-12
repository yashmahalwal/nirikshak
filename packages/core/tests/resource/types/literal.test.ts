import {
    LiteralObject,
    isLiteral,
    NakedLiteral,
} from "../../../src/resource/types/primitive";
import {
    generateLiteralObject,
    generateInvalidliteralObject,
    MaxEntries,
    maxNestingLevel,
    getInvalidLiterals,
    getValidLiterals,
    getValidLiteralArrays,
    getInvalidArrays,
    generateCompositeValidArr,
    generateCompositeInvalidArr,
} from "./utils";

const ValidLiteralBases = getValidLiterals();
const InvalidLiteralBases = getInvalidLiterals();

const ValidLiteralObjects: LiteralObject[] = [];

for (let i = 0; i < MaxEntries; i++) {
    ValidLiteralObjects[i] = generateLiteralObject(
        ValidLiteralBases,
        maxNestingLevel
    );
}

const InvalidLiteralObjects: LiteralObject[] = [];

for (let i = 0; i < MaxEntries; i++) {
    InvalidLiteralObjects[i] = generateInvalidliteralObject(
        ValidLiteralBases,
        InvalidLiteralBases,
        maxNestingLevel
    );
}

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

describe("Literals", () => {
    test.each(ValidLiteralObjects)("Valid Literal Object %#", (entry) => {
        expect(isLiteral(entry)).toBe(true);
    });

    test.each(InvalidLiteralBases)("Valid Literal Object %#", (entry) => {
        expect(isLiteral(entry)).toBe(false);
    });

    test.each(ValidLiterals)("Basic positive entry %#", (val) =>
        expect(isLiteral(val)).toBe(true)
    );

    test.each(ValidArr)("Positive array entry %#", (arr) =>
        expect(isLiteral(arr)).toBe(true)
    );

    test.each(InvalidBase)("Basic negative entry %#", (val) =>
        expect(isLiteral(val)).toBe(false)
    );

    InvalidArr.forEach((arr, index) =>
        test(`Negative array entry ${index}`, () => {
            expect(isLiteral(arr)).toBe(false);
        })
    );

    CompositeValidArrays.forEach((entry, index) => {
        test(`Composite positive array entry ${index}`, () => {
            expect(isLiteral(entry)).toBe(false);
        });
    });

    CompositeInvalidArrays.forEach((entry, index) =>
        test(`Composite negative array entry ${index}`, () => {
            expect(isLiteral(entry)).toBe(false);
        })
    );
});
