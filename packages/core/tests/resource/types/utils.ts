import {
    LiteralObject,
    LiteralBase,
    NakedLiteral,
} from "../../../src/resource/types/primitive";
import faker from "faker";
import { shuffle } from "lodash";

export const MaxEntries = 20;
export const maxNestingLevel = 5;
export const MaxArraySize = 100;

/* Literal Object */
export function generateLiteralObject(
    ValidLiteralBases: LiteralBase[],
    maxNestingLevel: number
): LiteralObject {
    if (maxNestingLevel < 1) return { literals: [] };

    let randomLength = Math.floor(Math.random() * MaxEntries);

    if (maxNestingLevel == 1) {
        const arr: LiteralBase[] = [];
        while (randomLength--)
            arr.push(faker.random.arrayElement(ValidLiteralBases));
        return { literals: arr };
    }

    const arr: LiteralObject[] = [];
    while (randomLength--) {
        let randomNestingLevel = Math.ceil(
            Math.random() * (maxNestingLevel - 1)
        );
        arr.push(generateLiteralObject(ValidLiteralBases, randomNestingLevel));
    }

    return { literals: arr };
}

export function generateInvalidliteralObject(
    ValidLiteralBases: LiteralBase[],
    InvalidLiteralBases: any[],
    maxNestingLevel: number
): { literals: any[] } {
    if (maxNestingLevel < 1) return { literals: [null] };

    let randomLength = Math.floor(Math.random() * MaxEntries) || 1;

    if (maxNestingLevel == 1) {
        const arr: any[] = [];
        let negatives = 0;
        while (randomLength--) {
            let condition = faker.random.boolean();
            if (condition) negatives++;
            arr.push(
                faker.random.arrayElement(
                    condition ? InvalidLiteralBases : ValidLiteralBases
                )
            );
        }

        if (!negatives)
            arr.push(faker.random.arrayElement(InvalidLiteralBases));
        return { literals: arr };
    }

    const arr: LiteralObject[] = [];
    while (randomLength--) {
        let randomNestingLevel = Math.ceil(
            Math.random() * (maxNestingLevel - 1)
        );
        arr.push(
            generateInvalidliteralObject(
                ValidLiteralBases,
                InvalidLiteralBases,
                randomNestingLevel
            )
        );
    }

    return { literals: arr };
}

/* Naked Literals */
export function getValidLiterals() {
    return shuffle([
        faker.random.word(),
        faker.random.number(),
        null,
        faker.random.boolean(),
    ]);
}

export function getValidLiteralArrays(ValidLiterals: LiteralBase[]) {
    /* Array of valid literals */
    const ValidArr: LiteralBase[][] = [];

    /* Populating the array of valid literals */
    for (let i = 0; i < MaxArraySize; i++) {
        const RandomArr: any[] = [];
        const RandomLength = Math.floor(Math.random() * MaxEntries) || 1;

        for (let j = 0; j < RandomLength; j++)
            RandomArr.push(faker.random.arrayElement(ValidLiterals));
        ValidArr.push(RandomArr);
    }
    return shuffle(ValidArr);
}

export function getInvalidLiterals(): any[] {
    return shuffle([undefined]);
}

export function getInvalidArrays(
    InvalidBase: any[],
    ValidLiterals: LiteralBase[]
): any[][] {
    /* Array of valid + invalid literals */
    const InvalidArr: any[][] = [];

    /* Populating the array*/
    for (let i = 0; i < MaxArraySize; i++) {
        let RandomArr: any[] = [];
        const RandomLength = Math.floor(Math.random() * MaxEntries) || 1;

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

    return shuffle(InvalidArr);
}

export function generateCompositeValidArr(
    ValidArr: LiteralBase[][],
    ValidLiterals: LiteralBase[]
) {
    /* Array of simple and arrays of valid literals */
    const CompositeValidArrays: NakedLiteral[] = [];

    /* Populating */
    for (let i = 0; i < MaxArraySize; i++) {
        const randomLength = Math.random() * MaxEntries || 1;
        const arrays = Math.random() * randomLength || 1;
        const entry: any[] = [];

        for (let i = 0; i < arrays; i++)
            entry.push(faker.random.arrayElement(ValidArr));
        for (let i = 0; i < randomLength - arrays; i++) {
            entry.push(faker.random.arrayElement(ValidLiterals));
        }

        CompositeValidArrays.push(entry);
    }

    return shuffle(CompositeValidArrays);
}

export function generateCompositeInvalidArr(
    ValidArr: LiteralBase[][],
    InvalidArr: any[][],
    InvalidBase: any[],
    ValidLiterals: LiteralBase[]
) {
    /* Array of simple and arrays of Valid and Invalid literals */
    const CompositeInvalidArrays: any[][] = [];

    /* Populating */
    for (let i = 0; i < MaxArraySize; i++) {
        const randomLength = Math.random() * MaxEntries || 1;
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

        CompositeInvalidArrays.push(entry);
    }

    return shuffle(CompositeInvalidArrays);
}
