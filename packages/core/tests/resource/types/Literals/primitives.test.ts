import {
    isLiteralBase,
    LiteralBase,
} from "../../../../src/resource/types/primitive";

/* 
    isLiteralBase : Function takes in an entry and find out if it is a valid literal
*/

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
const ValidInput: LiteralBase[] = [
    "12",
    false,
    null,
    23,
    "My String Name",
    80123812,
    true,
    null,
    null,
    "",
    0,
];
describe("Primitive literal type", () => {
    test.each(ValidInput)("Valid literal %#", (v) => {
        expect(isLiteralBase(v)).toBe(true);
    });

    test.each(InValidInput)("Invalid literal %#", (v) => {
        expect(isLiteralBase(v)).toBe(false);
    });
});
