import { CliArgs } from "../utils/additionalTypes";
import { ensureDirectories } from "./ensureDirectories";
import { rootJestConfig } from "./jestConfig";

async function init<T extends CliArgs = CliArgs>({ configuration }: T) {
  await ensureDirectories(configuration);
  await rootJestConfig(configuration);
}

export const command = "init";
export const describe = "Initialise nirikshak in the project";
export const handler = init;
