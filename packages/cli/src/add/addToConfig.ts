import fs from "fs-extra";
import path from "path";
import { Configuration } from "../utils/types";

export default async function addToConfig(
    name: string,
    configFile: string,
    dir?: string
): Promise<void> {
    const configData: Configuration = await fs.readJSON(
        path.resolve(configFile)
    );

    configData.resources.push(
        dir
            ? {
                  dir,
                  name,
              }
            : name
    );

    await fs.writeJSON(configFile, configData, {
        spaces: 4,
    });
}
