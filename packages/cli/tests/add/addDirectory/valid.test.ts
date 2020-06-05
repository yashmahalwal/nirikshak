import path from "path";
import fs from "fs-extra";
import process from "process";
import addDirectory from "../../../src/add/addDirectory";
beforeAll(() => process.chdir(__dirname));

test(`Adding new directory`, async () => {
    const resultant = path.resolve("nirikshak/student");
    await addDirectory("student", "nirikshak");
    expect(fs.pathExists(resultant)).resolves.toBe(true);
    expect(fs.pathExists(path.resolve(resultant, "config.json"))).resolves.toBe(
        true
    );
});

afterAll(async () => await fs.remove(path.resolve("nirikshak/student")));
