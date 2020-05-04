import { CliArgs } from "./additionalTypes";
import { PathJoiner } from "./pathJoiner";

export function getResourceDirectory(
  resource: CliArgs["configuration"]["resources"][0],
  rootDir: CliArgs["configuration"]["dir"]
) {
  const joiner = new PathJoiner();
  return joiner.join(
    rootDir,
    typeof resource == "string" ? resource : resource.dir
  );
}
