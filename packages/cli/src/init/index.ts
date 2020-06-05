import { Configuration } from "../utils/types";
import { ensureDirectories } from "./ensureDirectories";
import placeJestConfig from "./jest";
import placeApp from "./app";
import prepareTestFiles from "./prepareTests";
import addResourceEntries from "./addResourceEntries";

async function init({
    configuration,
}: {
    configuration: Configuration;
}): Promise<void> {
    await ensureDirectories(configuration);
    await placeJestConfig(configuration);
    await placeApp(configuration);
    await prepareTestFiles(configuration);
    await addResourceEntries(configuration);
}

export const command = "init";
export const describe = "Initialise nirikshak in the project";
export const handler = init;
