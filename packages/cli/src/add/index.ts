import { CliArgs } from "../utils/types";
import addEntry from "./addEntry";
import addToConfig from "./addToConfig";
import addToJest from "./addToJest";
import validateDirectoryStructure from "../utils/validateDirectoryStructure";
import { validateConfig } from "../configuration";
import addDirectory from "./addDirectory";

interface AddArgs extends CliArgs {
    name: string;
    dir?: string;
}

async function add({
    name,
    dir,
    config,
    configuration,
}: AddArgs): Promise<void> {
    validateConfig(configuration);
    await validateDirectoryStructure(configuration);
    await addEntry(name);
    await addDirectory(dir ?? name, configuration.dir);
    await addToConfig(name, config, dir);
    await addToJest(name, configuration.dir, dir);
}

export const command = "add <name> [dir]";
export const describe = "Add a resource to the project";
export const handler = add;
