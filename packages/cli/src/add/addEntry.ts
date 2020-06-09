import fs from "fs-extra";
import path from "path";
export default async function addEntry(
    name: string,
    dir?: string
): Promise<void> {
    if (await fs.pathExists(path.resolve(".nirikshak", name)))
        throw new Error(`Cannot add resource ${name}. It already exists`);
    await fs.writeFile(path.resolve(".nirikshak", name), dir ?? name);
}