import { Configuration } from "../utils/types";
import { ensureDirectories } from "./ensureDirectories";
import placeJestConfig from "./jest";

async function init({
    configuration,
}: {
    configuration: Configuration;
}): Promise<void> {
    await ensureDirectories(configuration);
    await placeJestConfig(configuration);
}

export const command = "init";
export const describe = "Initialise nirikshak in the project";
export const handler = init;
