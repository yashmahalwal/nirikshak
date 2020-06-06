import { Configuration } from "../utils/types";
import fs from "fs-extra";
import path from "path";

export default async function addResourceEntries(
    configuration: Configuration
): Promise<void> {
    await fs.writeFile(path.resolve(".nirikshak", "dir"), configuration.dir);

    const res = await Promise.all(
        configuration.resources.map((resource) => {
            const resourceName =
                typeof resource === "string" ? resource : resource.name;
            return fs.writeFile(
                path.resolve(".nirikshak", resourceName),
                typeof resource === "string" ? resource : resource.dir
            );
        })
    );

    void res;
}
