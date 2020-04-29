import fs from "fs-extra";

export interface Configuration {
    dir?: string;
}

export const DefaultConfig: Configuration = {
    dir: "nirikshak",
};

export async function configFileExists(configFile: string): Promise<boolean> {
    return fs.pathExists(configFile);
}

export async function validateConfig(configFile: string): Promise<boolean> {
    // TODO: validate with a json schema
    if (!configFileExists(configFile)) return false;
    return true;
}

export async function parseConfig(configFile: string) {
    return validateConfig(configFile);
}
