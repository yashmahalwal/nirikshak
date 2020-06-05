import fs from "fs-extra";
import { CliArgs } from "../utils/types";
import { getResourceDirectory } from "../utils/getResourceDir";
import path from "path";

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
            fs.ensureDir(
                path.resolve(getResourceDirectory(resource, configuration.dir))
            )
        )
    );
}
