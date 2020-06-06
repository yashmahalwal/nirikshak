import path from "path";
import fs from "fs-extra";
import { Configuration } from "../utils/types";
export default async function removeDirectory(
    configuration: Configuration,
    name: string
): Promise<void> {
    const entry = configuration.resources.find(
        (r) => r === name || (typeof r === "object" && r.name === name)
    )!;

    const dir = typeof entry === "string" ? entry : entry.dir;
    return fs.remove(path.resolve(configuration.dir, dir));
}
