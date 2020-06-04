import fs from "fs-extra";
import schema from "./schema.json";
import Ajv from "ajv";
import { Configuration } from "../utils/types";

export const validateConfig = (data: any): void => {
    const ajv = new Ajv();
    if (!ajv.validate(schema, data)) throw ajv.errors;
};
export function parseConfig(
    configFile: string
): { configuration: Configuration } | Error {
    try {
        const data = fs.readJSONSync(configFile);
        validateConfig(data);
        return { configuration: data };
    } catch (e) {
        return e;
    }
}
