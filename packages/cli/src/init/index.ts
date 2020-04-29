import { CliArgs } from "../utils/additionalTypes";
import { Configuration } from "../configuration";
import fs from "fs-extra";
async function init<T extends CliArgs = CliArgs>(args: T) {}

export const command = "init";
export const describe = "Initialise nirikshak in the project";
export const handler = init;
