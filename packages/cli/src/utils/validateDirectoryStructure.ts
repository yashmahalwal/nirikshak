import fs from "fs-extra";
import path from "path";
import { Configuration } from "./types";
import { getResourceDirectory } from "./getResourceDir";
// TODO: Validate app existence
export default async function validateDirectoryStructure(
    data: Configuration
): Promise<void> {
    if (!(await fs.pathExists(path.resolve(".nirikshak"))))
        throw new Error(`Project has not been initialized.`);
    const dirFilePath = path.resolve(".nirikshak", "dir");
    if (!(await fs.pathExists(dirFilePath)))
        throw new Error(
            `Project configuration corrupted. Delete .nirikshak folder and start over`
        );
    const dirContent = (await fs.readFile(dirFilePath)).toString();
    if (dirContent !== data.dir)
        throw new Error(
            `Nirikshak directory changed. Expected dir key of config to be ${dirContent}, got ${data.dir}`
        );

    if (!(await fs.pathExists(path.resolve(data.dir))))
        throw new Error(`Nirikshak directory: ${data.dir} does not exist`);
    const promiseArr: Promise<void>[] = data.resources.map(async (r) => {
        const resource = typeof r === "string" ? r : r.name;
        if (!(await fs.pathExists(path.resolve(".nirikshak", resource))))
            throw new Error(
                `Resource ${resource} does not exist. Please check project configuration.`
            );
        if (
            !(await fs.pathExists(
                path.resolve(getResourceDirectory(r, data.dir))
            ))
        )
            throw new Error(`Directory for ${resource} not found`);
    });

    await Promise.all(promiseArr);
}
