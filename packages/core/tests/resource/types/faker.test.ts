import {
    isValidFakerString,
    FakerObject,
    isValidFakerObject,
    isValidFaker,
    FakerType,
} from "../../../src/resource/types/fakerTypes";
import { ValidFakerStrings } from "../../../src/resource/types/fakerStrings";

/* Check if the faker library functions are being mapped correctly */

const InvalidFakerStrings: string[] = [
    "fixMeUp",
    "faker:random.name",
    "faker:random.number.name",
];

const ValidFakerObjects: FakerObject[] = [
    { function: "faker:name.firstName" },
    { function: "faker:lorem.lines", args: [1] },
    {
        function: "faker:random.number",
        args: [{ max: 1, min: 0, precision: 0.1 }],
    },
];

const InvalidFakerObjects: any[] = [
    { function: "faker:name.number" },
    { function: "faker:lorem.lines", args: false },
    { fiction: "faker:random.number" },
];

const ValidFaker: FakerType[] = [
    "faker:address.zipCode",
    { function: "faker:address.streetAddress", args: [] },
    "faker:address.county",
    "faker:address.longitude",
    { function: "faker:commerce.productName" },
    "faker:company.companyName",
    "faker:company.bs",
    { function: "faker:company.catchPhraseNoun" },
    {
        function: "faker:date.between",
        args: [12, 13, "dlkjjkafh", undefined, null],
    },
    "faker:finance.amount",
    "faker:helpers.slugify",
    "faker:image.cats",
    "faker:internet.mac",
    {
        function: "faker:internet.password",
        args: [
            { name: true, value: 312123 },
            { min: 0, max: 0 },
        ],
    },
    { function: "faker:lorem.text" },
    "faker:name.jobDescriptor",
    { function: "faker:random.words" },
    "faker:random.image",
];

const InvalidFaker: any[] = [
    "address.zipCode",
    { function: "faker:address.streetAddress", args: null },
    { fc: "faker:address.county" },
    { function: "faker:invalidPath" },
];

describe("Faker", () => {
    test.each(ValidFakerStrings)("Valid faker string %#", (str) => {
        expect(isValidFakerString(str)).toBe(true);
    });

    test.each(InvalidFakerStrings)("Invalid faker string %#", (str) => {
        expect(isValidFakerString(str)).toBe(false);
    });

    test.each(ValidFakerObjects)("Valid faker object %#", (object) =>
        expect(isValidFakerObject(object)).toBe(true)
    );

    test.each(InvalidFakerObjects)("Invalid faker object %#", (object) =>
        expect(isValidFakerObject(object)).toBe(false)
    );
    test.each(ValidFaker)("Valid faker type %#", (entry) =>
        expect(isValidFaker(entry)).toBe(true)
    );

    test.each(InvalidFaker)("Invalid faker type %#", (entry) =>
        expect(isValidFaker(entry)).toBe(false)
    );
});
