import { CliArgs, Configuration } from "../utils/types";
import validateDirectoryStructure from "../utils/validateDirectoryStructure";
import placeApp from "../init/app";
import path from "path";
import fs from "fs-extra";
interface UpdateAppArgs extends CliArgs {
    newPath: string;
}

async function updateApp({
    configuration,
    newPath,
    config,
}: UpdateAppArgs): Promise<void> {
    await validateDirectoryStructure(configuration);

    const configPath = path.resolve(config);
    const configData: Configuration = await fs.readJSON(configPath);
    configData.app = newPath;
    await fs.writeJSON(configPath, configData);
    await placeApp({ ...configuration, app: newPath });
}

export const command = "update-app <newPath>";
export const describe = "Update the path to server to be used for testing";
export const handler = updateApp;
