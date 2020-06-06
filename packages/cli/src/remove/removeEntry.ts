import fs from "fs-extra";
import path from "path";
export default async function removeEntry(name: string): Promise<void> {
    return fs.remove(path.resolve(".nirikshak", name));
}
