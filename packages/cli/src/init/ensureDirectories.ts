import fs from "fs-extra";
import signale from "signale";
import { CliArgs } from "../utils/additionalTypes";
import { getResourceDirectory } from "../utils/getResourceDir";

export async function ensureDirectories(
  configuration: CliArgs["configuration"]
) {
  try {
    // Create the directory
    await fs.ensureDir(configuration.dir);
    await Promise.all(
      configuration.resources.map((resource) =>
        fs.ensureDir(getResourceDirectory(resource, configuration.dir))
      )
    );
  } catch (e) {
    signale.fatal(e);
    process.exit();
  }
}
