import fs from "fs-extra";
import signale from "signale";
import schema from "./schema.json";
import Ajv from "ajv";

export interface Configuration {
  dir: string;
  resources: Array<string | { name: string; dir: string }>;
}

export interface JestConfig {
  displayName: string;
  projects?: string[];
}

export const getConfig = (configFile: string) => fs.readJSONSync(configFile);

export const validateConfig = (data: any) => {
  const ajv = new Ajv();
  if (!ajv.validate(schema, data)) throw ajv.errors;
};
export function parseConfig(configFile: string) {
  try {
    const data = getConfig(configFile);
    validateConfig(data);
    return { configuration: data };
  } catch (e) {
    signale.fatal(e);
    process.exit();
  }
}
