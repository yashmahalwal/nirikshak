import {
    isValidFakerString,
    FakerObject,
    isValidFakerObject,
    isValidFaker,
    normalizeFaker,
} from "../../../src/resource/types/fakerTypes";
import { ValidFakerStrings } from "../../../src/resource/types/fakerStrings";
import faker from "faker";
import { getValidLiterals } from "./utils";

const ValidLiterals = getValidLiterals();
describe("Faker", () => {
    test.each(ValidFakerStrings)(
        "ValidFakerStrings: Valid faker string %#",
        (str) => {
            expect(isValidFakerString(str)).toBe(true);
        }
    );

    test.each(ValidFakerStrings)(
        "ValidFakerStrings: Valid faker objects %#",
        (str) => {
            const object: FakerObject = {
                function: str,
            };

            if (faker.random.boolean()) {
                object.args = [];
                let length = faker.random.number({
                    min: 0,
                    max: 20,
                    precision: 1,
                });

                while (length--)
                    object.args.push(faker.random.arrayElement(ValidLiterals));
            }
            expect(isValidFakerObject(object)).toBe(true);
        }
    );
    test.each(ValidFakerStrings)("ValidFakerStrings: Valid faker %#", (str) => {
        expect.assertions(1);
        if (faker.random.boolean()) {
            expect(isValidFaker(str)).toBe(true);
            return;
        }

        const object: FakerObject = {
            function: str,
        };

        if (faker.random.boolean()) {
            object.args = [];
            let length = faker.random.number({
                min: 0,
                max: 20,
                precision: 1,
            });

            while (length--)
                object.args.push(faker.random.arrayElement(ValidLiterals));
        }
        expect(isValidFaker(object)).toBe(true);
    });

    test.each(ValidFakerStrings)(
        "ValidFakerStrings: Normalize faker %#",
        (str) => {
            expect.assertions(1);
            if (faker.random.boolean()) {
                expect(normalizeFaker(str)).toEqual({
                    function: str,
                    args: [],
                });
                return;
            }

            const object: FakerObject = {
                function: str,
            };

            if (faker.random.boolean()) {
                object.args = [];
                let length = faker.random.number({
                    min: 0,
                    max: 20,
                    precision: 1,
                });

                while (length--)
                    object.args.push(faker.random.arrayElement(ValidLiterals));
            }
            expect(normalizeFaker(object)).toEqual({ args: [], ...object });
        }
    );
});
