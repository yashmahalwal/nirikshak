import fs from "fs-extra";
import path from "path";
import { Configuration } from "../utils/types";

export default async function removeFromConfig(
    name: string,
    configFile: string
): Promise<void> {
    const configPath = path.resolve(configFile);
    const configData: Configuration = await fs.readJSON(configPath);

    configData.resources = configData.resources.filter((entry) =>
        typeof entry === "string" ? entry !== name : entry.name !== name
    );

    await fs.writeJSON(configPath, configData, {
        spaces: 4,
    });
}
