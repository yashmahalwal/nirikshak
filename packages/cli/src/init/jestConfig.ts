import { CliArgs } from "../utils/additionalTypes";
import { makeRootJestConfiguration } from "../configuration/jestRoot";
import fs from "fs-extra";
import { PathJoiner } from "../utils/pathJoiner";

export async function rootJestConfig(configuration: CliArgs["configuration"]) {
  const config = makeRootJestConfiguration(configuration);
  const joiner = new PathJoiner();
  await fs.writeJSON(
    joiner.join(configuration.dir, "jest.config.json"),
    config,
    { spaces: 4 }
  );
}
