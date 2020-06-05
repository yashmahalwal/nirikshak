import { Configuration } from "../utils/types";
import fs from "fs-extra";
import path from "path";

export default async function addResourceEntries(
    configuration: Configuration
): Promise<void> {
   const res = await Promise.all(
        configuration.resources.map((resource) => {
            const resourceName =
                typeof resource === "string" ? resource : resource.name;
            return fs.ensureFile(path.resolve(".nirikshak", resourceName));
        })
    );

    void res;
}
