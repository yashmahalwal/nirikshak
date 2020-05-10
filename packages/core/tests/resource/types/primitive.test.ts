import { isLiteralBase } from "../../../src/resource/types/primitive";

describe("Primitive Literal type", () => {
    const ValidInput = [12, "12", false, null];
    test.each(ValidInput)("Positive %#", (v) => {
        expect(isLiteralBase(v)).toBe(true);
    });

    const InValidInput = [
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
