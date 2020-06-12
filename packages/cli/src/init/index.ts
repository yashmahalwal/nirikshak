import { Configuration } from "../utils/types";
import { ensureDirectories } from "./ensureDirectories";
import placeJestConfig from "./jest";
import placeApp from "./app";
import addResourceEntries from "./addResourceEntries";
import signale from "signale";

async function init({
    configuration,
}: {
    configuration: Configuration;
}): Promise<void> {
    signale.info("Initialising nirikshak");
    await ensureDirectories(configuration);
    await placeJestConfig(configuration);
    await placeApp(configuration);
    await addResourceEntries(configuration);
    signale.success("Done");
}

export const command = "init";
export const describe = "Initialise nirikshak in the project";
export const handler = init;
