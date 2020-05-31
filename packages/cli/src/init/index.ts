import { CliArgs } from "../utils/additionalTypes";
import { ensureDirectories } from "./ensureDirectories";
import { rootJestConfig } from "./jestConfig";
import ora from "ora";

const waitPromise = (interval: number) =>
    new Promise((resolve) => setTimeout(resolve, interval));

async function init<T extends CliArgs = CliArgs>({ configuration }: T) {
    const spinner = ora({
        discardStdin: true,
        interval: 50,
        text: `Generating directory structure\n`,
    }).start();
    await ensureDirectories(configuration);
    await rootJestConfig(configuration);
    spinner.succeed();
}

export const command = "init";
export const describe = "Initialise nirikshak in the project";
export const handler = init;
