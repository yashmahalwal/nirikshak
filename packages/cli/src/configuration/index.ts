import fs from "fs-extra";
import _ from "lodash";
import schema from "./schema.json";
import Ajv from "ajv";
import { Configuration } from "../utils/types";
import { getResourceName } from "../utils/resourceData";

export const validateConfig = (data: any): void => {
    const ajv = new Ajv();
    // Validate with the stored JSON schema
    if (!ajv.validate(schema, data))
        throw `Error parsing configuration: ${ajv.errorsText()}`;

    const resources = (data as Configuration).resources.map((v) =>
        getResourceName(v)
    );
    // Check for resource uniqueness
    if (_.uniq(resources).length !== resources.length)
        throw `Duplicate resource names in configuration`;
};

export function parseConfig(
    configFile: string
): { configuration: Configuration } | Error {
    try {
        const data = fs.readJSONSync(configFile);
        validateConfig(data);
        return { configuration: data };
    } catch (e) {
        // Yargs requires an error object to be returned
        return new Error(e);
    }
}
