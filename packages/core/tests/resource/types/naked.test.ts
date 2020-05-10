import { isNakedLiteral } from "../../../src/resource/types/primitive";
import faker from "faker";
import _ from "lodash";

const MaxArrSize = 100;
const MaxEntrySize = 20;

/* Valid Literals */
const ValidLiterals = [12, "12", false, null];

/* Array of valid literals */
const ValidArr: any[] = [];

/* Populating the array of valid literals */
for (let i = 0; i < MaxArrSize; i++) {
    const RandomArr: any[] = [];
    const RandomLength = Math.floor(Math.random() * MaxEntrySize) || 1;

    for (let j = 0; j < RandomLength; j++)
        RandomArr.push(faker.random.arrayElement(ValidLiterals));
    ValidArr.push(RandomArr);
}

/* Invalid literals */
const InvalidBase = [undefined];

/* Array of valid + invalid literals */
const InvalidArr: any[] = [];

/* Populating the array*/
for (let i = 0; i < MaxArrSize; i++) {
    let RandomArr: any[] = [];
    const RandomLength = Math.floor(Math.random() * MaxEntrySize) || 1;

    let negative = 0;
    for (let j = 0; j < RandomLength; j++) {
        let condition = Math.random() <= 0.5;
        if (condition) {
            negative++;
            RandomArr.push(faker.random.arrayElement(InvalidBase));
            continue;
        }
        RandomArr.push(faker.random.arrayElement(ValidLiterals));
    }

    if (!negative || !RandomLength)
        RandomArr.push(faker.random.arrayElement(InvalidBase));

    InvalidArr.push(RandomArr);
}

/* Array of simple and arrays of valid literals */
const CompositeValidArrays: any[] = [];

/* Populating */
for (let i = 0; i < MaxArrSize; i++) {
    const randomLength = Math.random() * MaxEntrySize || 1;
    const arrays = Math.random() * randomLength || 1;
    const entry: any[] = [];

    for (let i = 0; i < arrays; i++)
        entry.push(faker.random.arrayElement(ValidArr));
    for (let i = 0; i < randomLength - arrays; i++) {
        entry.push(faker.random.arrayElement(ValidLiterals));
    }

    CompositeValidArrays.push(entry);
}

_.shuffle(CompositeValidArrays);

/* Array of simple and arrays of Valid and Invalid literals */
const CompositeInvalidArrays: any[] = [];

/* Populating */
for (let i = 0; i < MaxArrSize; i++) {
    const randomLength = Math.random() * MaxEntrySize || 1;
    const arrays = Math.random() * randomLength || 1;
    const entry: any[] = [];

    for (let i = 0; i < arrays; i++)
        entry.push(
            faker.random.arrayElement(
                faker.random.boolean() ? ValidArr : InvalidArr
            )
        );
    for (let i = 0; i < randomLength - arrays; i++) {
        entry.push(
            faker.random.arrayElement(
                faker.random.boolean() ? InvalidBase : ValidLiterals
            )
        );
    }

    CompositeValidArrays.push(entry);
}

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
