import path from "path";
import { Configuration } from "../../../../src/utils/types";
import process from "process";
import { ensureDirectories } from "../../../../src/init/ensureDirectories";
import fs from "fs-extra";
const config: Configuration = {
    app: "index.ts",
    dir: "testDirectory",
    resources: [{ name: "student", dir: "studentDir" }],
};
beforeAll(() => {
    process.chdir(__dirname);
});
test(`Ensuring non existing resource directories`, async () => {
    await ensureDirectories(config);
    expect(fs.pathExists(".nirikshak")).resolves.toBe(true);
    expect(fs.pathExists("testDirectory")).resolves.toBe(true);
    expect(
        fs.pathExists(path.join("testDirectory", "studentDir"))
    ).resolves.toBe(true);
});

afterAll(async () => {
    await fs.remove(path.join("testDirectory", "studentDir"));
    await fs.remove(".nirikshak");
});
