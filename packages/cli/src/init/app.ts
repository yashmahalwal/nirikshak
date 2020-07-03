import path from "path";
import fs from "fs-extra";
import { Configuration } from "../utils/types";
import { getAppImport } from "../utils/getAppImport";

export default async function placeApp(
    configuration: Configuration
): Promise<void> {
    // The path of the app
    const appPath = getAppImport(path.resolve(configuration.app));

    // Read the app tunneling template
    const appContent = (
        await fs.readFile(path.resolve(__dirname, "../../staticFiles/app"))
    ).toString();

    // Write the tunnel file
    await fs.writeFile(
        path.resolve(configuration.dir, "app.ts"),
        appContent.replace("${appPath}", `"${appPath}"`)
    );
}
