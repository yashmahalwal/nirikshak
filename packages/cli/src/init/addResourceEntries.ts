import { Configuration } from "../utils/types";
import fs from "fs-extra";
import path from "path";
import { getResourceName, getResourceDirEntry } from "../utils/resourceData";

export default async function addResourceEntries(
    configuration: Configuration
): Promise<void> {
    // Add the testing directory entry
    await fs.writeFile(path.resolve(".nirikshak", "dir"), configuration.dir);
    // Add the testing directory entry
    await fs.writeFile(path.resolve(".nirikshak", "app"), configuration.app);

    // Add resource entries
    const res = await Promise.all(
        configuration.resources.map((resource) => {
            // Add a file with name: resource name content: resource directory
            const resourceName = getResourceName(resource);
            return fs.writeFile(
                path.resolve(".nirikshak", resourceName),
                getResourceDirEntry(resource)
            );
        })
    );

    void res;
}
