import process from "process";
import path from "path";
import fs from "fs-extra";
import addEntry from "../../../src/add/addEntry";

beforeAll(async () => {
    process.chdir(__dirname);
});

test(`Adding new resource`, async () => {
    await addEntry("faculty");
    expect(fs.pathExists(path.resolve(".nirikshak", "faculty"))).resolves.toBe(
        true
    );
});

afterAll(async () => await fs.remove(path.resolve(".nirikshak", "faculty")));
