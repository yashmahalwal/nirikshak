import fs from "fs-extra";
import _ from "lodash";
import schema from "./schema.json";
import Ajv from "ajv";
import { Configuration } from "../utils/types";

export const validateConfig = (data: any): void => {
    const ajv = new Ajv();
    if (!ajv.validate(schema, data)) throw ajv.errors;

    const resources = (data as Configuration).resources.map((v) =>
        typeof v === "string" ? v : v.name
    );
    if (_.uniq(resources).length !== resources.length)
        throw new Error(`Duplicate resource names in configuration`);
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
