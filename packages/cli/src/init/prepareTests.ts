import { Configuration } from "../utils/types";
import { getResourceDirectory } from "../utils/getResourceDir";
import fs from "fs-extra";
import path from "path";
export default async function prepareTestFiles(
    configuration: Configuration
): Promise<void> {
    const promiseArr: Promise<any>[] = configuration.resources.map(
        (resource) => {
            const destination = getResourceDirectory(
                resource,
                configuration.dir
            );
            return fs.copy(
                path.resolve(__dirname, "../staticFiles/config.json"),
                path.resolve(destination, "config.json")
            );
        }
    );

    await Promise.all(promiseArr);
}
