import { CliArgs } from "../utils/additionalTypes";
import { JestConfig } from ".";
import { PathJoiner } from "../utils/pathJoiner";
export function makeRootJestConfiguration(
  configuration: CliArgs["configuration"]
): JestConfig {
  const joiner = new PathJoiner();
  return {
    displayName: "all",
    projects: configuration.resources.map((resource) =>
      joiner.join(
        "<rootDir>",
        typeof resource == "string" ? resource : resource.dir
      )
    ),
  };
}
