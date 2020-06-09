import path from "path";
import fs from "fs-extra";
export default async function addDirectory(
    dir: string,
    rootDir: string
): Promise<void> {
    const resultant = path.resolve(rootDir, dir);
    if (await fs.pathExists(resultant))
        throw new Error(`Directory ${dir} already exists`);
    await fs.ensureDir(resultant);

    await fs.copy(
        path.resolve(__dirname, "../../staticFiles/config.json"),
        path.resolve(resultant, "config.json")
    );
}
