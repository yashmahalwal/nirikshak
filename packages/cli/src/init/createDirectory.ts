import fs from "fs-extra";
export default async function createDirectory(dirPath: string) {
    return fs.ensureDir(dirPath);
}
