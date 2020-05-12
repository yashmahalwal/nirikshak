import {
    isLiteralBase,
} from "../../../src/resource/types/primitive";
import { getValidLiterals } from "./utils";

describe("Primitive Literal type", () => {
    test.each(getValidLiterals())("Positive %#", (v) => {
        expect(isLiteralBase(v)).toBe(true);
    });

    const InValidInput: any[] = [
        Symbol(),
        [],
        [1, 2, 3],
        ["432"],
        undefined,
        [undefined],
        { name: null },
        { age: null, name: undefined, props: "12", prp: [1321, ""] },
    ];
    test.each(InValidInput)("Negative %#", (v) => {
        expect(isLiteralBase(v)).toBe(false);
    });
});
