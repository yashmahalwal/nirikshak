import faker from "faker";
import {
    isLiteralObject,
    LiteralObject,
    LiteralBase,
} from "../../../src/resource/types/primitive";
import {
    generateLiteralObject,
    generateInvalidliteralObject,
    MaxEntries,
    maxNestingLevel,
} from "./utils";

const ValidLiteralBases = ["12", 12, false, null];
const InvalidLiteralBases = [undefined];

const ValidLiteralObjects: LiteralObject[] = [];

for (let i = 0; i < MaxEntries; i++) {
    ValidLiteralObjects[i] = generateLiteralObject(
        ValidLiteralBases,
        maxNestingLevel
    );
}

const InvalidStructures = [
    "21",
    undefined,
    { lits: [] },
    { literels: ["2", undefined, null, true] },
    { literals: null },
    true,
    5667,
];

const InvalidLiteralObjects: LiteralObject[] = [];

for (let i = 0; i < MaxEntries; i++) {
    InvalidLiteralObjects[i] = generateInvalidliteralObject(
        ValidLiteralBases,
        InvalidLiteralBases,
        maxNestingLevel
    );
    continue;
}

describe("Literal Objects", () => {
    test.each(ValidLiteralObjects)("Positive tests %#", (entry) =>
        expect(isLiteralObject(entry)).toBe(true)
    );

    test.each(InvalidStructures)("Negative Basic tests %#", (entry) => {
        expect(isLiteralObject(entry)).toBe(false);
    });

    test.each(InvalidLiteralObjects)("Negative tests %#", (entry) => {
        let x = isLiteralObject(entry);
        expect(isLiteralObject(entry)).toBe(false);
    });
});
