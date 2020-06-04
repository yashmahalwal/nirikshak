import { CliArgs } from "./types";
import path from "path";
export function getResourceDirectory(
    resource: CliArgs["configuration"]["resources"][0],
    rootDir: CliArgs["configuration"]["dir"]
): string {
    return path.join(
        rootDir,
        typeof resource == "string" ? resource : resource.dir
    );
}
