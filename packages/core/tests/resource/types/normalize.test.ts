import {
    generateLiteralObject,
    MaxEntries,
    maxNestingLevel,
    getValidLiterals,
    getValidLiteralArrays,
} from "./utils";
import {
    LiteralObject,
    normalizeLiteral,
} from "../../../src/resource/types/primitive";

const ValidLiteralObjects: LiteralObject[] = [];
const ValidLiteralBases = getValidLiterals();

for (let i = 0; i < MaxEntries; i++) {
    ValidLiteralObjects[i] = generateLiteralObject(
        ValidLiteralBases,
        maxNestingLevel
    );
}

/* Array of valid literals */
const ValidArr = getValidLiteralArrays(ValidLiteralBases);

describe("Normalize", () => {
    test.each(
        ValidLiteralObjects
    )("ValidLiteralObjects: Passing literal object %#", (entry) =>
        expect(normalizeLiteral(entry)).toBe(entry)
    );

    test.each(ValidLiteralBases)(
        "ValidLiteralBases: Passing base literals %#",
        (entry) => {
            expect(normalizeLiteral(entry)).toEqual({ literals: entry });
        }
    );

    ValidArr.forEach((entry, index) =>
        test("ValidArr: Passing valid literal array" + index, () => {
            const result = normalizeLiteral(entry);
            expect("literals" in result).toBe(true);
            expect(result.literals).toEqual(entry);
        })
    );
});
