import { CliArgs } from "../utils/additionalTypes";
import { makeRootJestConfiguration } from "../configuration/jestRoot";
import fs from "fs-extra";
import { PathJoiner } from "../utils/pathJoiner";

export async function rootJestConfig(configuration: CliArgs["configuration"]) {
    const config = makeRootJestConfiguration(configuration);
    await fs.writeJSON("jest.config.json", config, { spaces: 4 });
}
