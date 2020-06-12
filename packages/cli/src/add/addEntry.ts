import fs from "fs-extra";
import path from "path";
export default async function addEntry(
    name: string,
    dir?: string
): Promise<void> {
    const pathEntry = path.resolve(".nirikshak", name);
    if (await fs.pathExists(pathEntry))
        throw new Error(`Cannot add resource ${name}. It already exists`);
    await fs.writeFile(pathEntry, dir ?? name);
}
