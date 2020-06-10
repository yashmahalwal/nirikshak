import { CliArgs } from "../utils/types";
import validateDirectoryStructure from "../utils/validateDirectoryStructure";
import removeDirectory from "./removeDirectory";
import removeEntry from "./removeEntry";
import removeFromConfig from "./removeFromConfig";
import removeFromJest from "./removeFromJest";
import signale from "signale";

interface RemoveArgs extends CliArgs {
    name: string;
}

async function remove({
    name,
    config,
    configuration,
}: RemoveArgs): Promise<void> {
    signale.info(`Removing resource ${name}`);
    await validateDirectoryStructure(configuration);
    if (
        !configuration.resources.some((e) =>
            typeof e === "string" ? e === name : e.name === name
        )
    )
        throw new Error(`Cannot remove non existing resource: ${name}`);
    await removeDirectory(configuration, name);
    await removeEntry(name);
    await removeFromConfig(name, config);
    await removeFromJest(name);
    signale.success(`Done`);
}

export const command = "remove <name>";
export const describe = "Remove a resource from the project";
export const handler = remove;
