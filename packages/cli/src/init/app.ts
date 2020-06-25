import path from "path";
import fs from "fs-extra";
import { Configuration } from "../utils/types";

export default async function placeApp(
    configuration: Configuration
): Promise<void> {
    const appPath = path.resolve(configuration.app);

    const appContent = (
        await fs.readFile(path.resolve(__dirname, "../../staticFiles/app"))
    ).toString();

    await fs.writeFile(
        path.resolve(configuration.dir, "app.ts"),
        appContent
            .replace("${appPath}", `"${appPath}"`)
            .replace(/.(ts|js)(?=";$)/, "")
    );
}
