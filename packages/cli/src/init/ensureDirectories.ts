import fs from "fs-extra";
import { CliArgs } from "../utils/types";
import path from "path";
import addDirectory from "../add/addDirectory";

export async function ensureDirectories(
    configuration: CliArgs["configuration"]
): Promise<void> {
    // Create the directory
    if (await fs.pathExists(".nirikshak"))
        throw new Error(
            `Project already initialised. Delete ${path.resolve(
                ".nirikshak"
            )} if you want to restart from scratch.`
        );
    else await fs.mkdir(".nirikshak");
    await fs.ensureDir(path.resolve(configuration.dir));
    await Promise.all(
        configuration.resources.map((resource) =>
            addDirectory(
                typeof resource === "string" ? resource : resource.dir,
                configuration.dir,
                typeof resource === "string" ? resource : resource.name,
                configuration.app
            )
        )
    );
}
