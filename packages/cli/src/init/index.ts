import { CliArgs } from "../utils/additionalTypes";
import { Configuration, DefaultConfig } from "../configuration";
import fs from "fs-extra";
import createDirectory from "./createDirectory";
async function init<T extends CliArgs = CliArgs>(args: T) {
    const buffer = await fs.readFile(args.config);
    const configuration: Configuration = JSON.parse(buffer.toString());

    // Explicitly overwrite values
    configuration.dir = configuration.dir ?? DefaultConfig.dir ?? "";
    createDirectory(configuration.dir);
}

export const command = "init";
export const describe = "Initialise nirikshak in the project";
export const handler = init;
