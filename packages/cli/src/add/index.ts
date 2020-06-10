import { CliArgs } from "../utils/types";
import addEntry from "./addEntry";
import addToConfig from "./addToConfig";
import addToJest from "./addToJest";
import validateDirectoryStructure from "../utils/validateDirectoryStructure";
import addDirectory from "./addDirectory";
import signale from "signale";

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
    signale.info(`Adding resource ${name}`);
    await validateDirectoryStructure(configuration);
    await addEntry(name, dir);
    await addDirectory(dir ?? name, configuration.dir, name, configuration.app);
    await addToConfig(name, config, dir);
    await addToJest(name, configuration.dir, dir);
    signale.success("Done");
}

export const command = "add <name> [dir]";
export const describe = "Add a resource to the project";
export const handler = add;
