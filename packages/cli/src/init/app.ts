import path from "path";
import fs from "fs-extra";
import { Configuration } from "../utils/types";

export default async function placeApp(
    configuration: Configuration
): Promise<void> {
    const appPath = path.resolve(configuration.app);
    const nirikshakDir = path.normalize(configuration.dir);

    const appContent = (
        await fs.readFile(path.resolve(__dirname, "../staticFiles/app"))
    ).toString();

    await fs.writeFile(
        path.resolve(nirikshakDir, "app.ts"),
        appContent.replace("${appPath}", `"${appPath}"`)
    );
}
