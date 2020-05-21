import { FakerType, normalizeFaker } from "../../common/types/fakerTypes";
import faker from "faker";
import _ from "lodash";
import { Primitives } from "../types/helper";

// Function to generate faker literals
// Should not throw any error for valid faker types
export function generateFaker(input: FakerType): Primitives {
    const object = normalizeFaker(input);

    const functionName = object.function.slice(6);
    return _.get(faker, functionName)(...object.args);
}
