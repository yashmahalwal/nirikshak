import { Configuration } from "../../../../src/utils/types";
import process from "process";
import { ensureDirectories } from "../../../../src/init/ensureDirectories";
import fs from "fs-extra";
import path from "path";
const config: Configuration = {
    dir: "testDirectory",
    resources: [{ name: "student", dir: "studentDir" }],
};
beforeAll(() => {
    process.chdir(__dirname);
});
test(`Ensuring already existing directories`, async () => {
    await ensureDirectories(config);
    expect(fs.pathExists(".nirikshak")).resolves.toBe(true);
    expect(fs.pathExists("testDirectory")).resolves.toBe(true);
    expect(
        fs.pathExists(path.join("testDirectory", "studentDir"))
    ).resolves.toBe(true);
});

afterAll(async () => {
    await fs.remove(".nirikshak");
});
