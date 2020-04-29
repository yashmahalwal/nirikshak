import fs from "fs-extra";
import signale from "signale";
import schema from "./schema.json";
import Ajv from "ajv";

export interface Configuration {
    dir: string;
    resources: Array<string | { name: string; dir: string }>;
}

export function parseConfig(configFile: string) {
    try {
        const data = fs.readJSONSync(configFile);
        const ajv = new Ajv();
        if (!ajv.validate(schema, data)) throw ajv.errors;

        console.log(data);
        return { configuration: data };
    } catch (e) {
        signale.fatal(e);
        process.exit();
    }
}
