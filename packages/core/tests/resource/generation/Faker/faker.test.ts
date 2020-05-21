/* 
    Tests to validate faker data generation validation
*/
import { FakerType } from "../../../../src/common/types/fakerTypes";
import faker from "faker";
import { generateFaker } from "../../../../src/resource/generation/fakerGen";
const ValidFakers: FakerType[] = [
    { function: "faker:address.zipCode", args: ['"#####-###"'] },
    "faker:address.citySuffix",
    "faker:address.streetName",
    "faker:address.streetAddress",
    "faker:address.streetPrefix",
    "faker:address.county",
    "faker:address.countryCode",
    { function: "faker:address.state", args: [true] },
    "faker:commerce.productAdjective",
    "faker:commerce.product",
    { function: "faker:company.bs", args: [] },
    {
        function: "faker:company.catchPhraseAdjective",
        args: [null, null, null],
    },
    "faker:company.catchPhraseDescriptor",
    "faker:company.bsNoun",
    "faker:database.collation",
    { function: "faker:finance.account", args: [8] },
    "faker:hacker.verb",
    "faker:image.image",
    "faker:image.avatar",
    { function: "faker:image.cats", args: [200, 200] },
    { function: "faker:internet.userName", args: ["FirstName", "LastName"] },
    "faker:internet.url",
    { function: "faker:lorem.word", args: [3] },
    "faker:lorem.sentence",
    { function: "faker:lorem.slug", args: [4] },
    "faker:lorem.paragraph",
    "faker:name.firstName",
    "faker:name.lastName",
    {
        function: "faker:random.number",
        args: [{ min: 0, max: 1, precision: 0.1 }],
    },
    "faker:random.words",
    "faker:system.semver",
];

describe("Faker literal generation", () => {
    // Setting randomness seed
    // Does not work with random.uuid and Date.*
    // So avoid them during testing
    beforeAll(() => faker.seed(123));

    test.each(ValidFakers)(`Valid faker: %#`, (entry) =>
        expect(generateFaker(entry)).toMatchSnapshot()
    );
});
