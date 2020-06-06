import process from "process";
import fs from "fs-extra";
import path from "path";
import removeEntry from "../../../src/remove/removeEntry";
const entryPath = path.resolve(__dirname, ".nirikshak/student");

beforeAll(() => process.chdir(__dirname));

test(`Removes the resource entry`, async () => {
    await removeEntry("student");
    expect(fs.pathExists(entryPath)).resolves.toBe(false);
});

afterAll(async () => await fs.writeFile(entryPath, "student"));
