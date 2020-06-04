import path from "path";
import process from "process";
import * as Init from "../../../src/init";
import { Configuration } from "../../../src/utils/types";
import fs from "fs-extra";

const config: Configuration = {
    dir: "nirikshak",
    resources: ["resource"],
};

const cwd = process.cwd();

describe(`Initialisation module metadata`, () => {
    test(`Command`, () => expect(Init.command).toEqual("init"));
    test(`Description`, () =>
        expect(Init.describe).toEqual("Initialise nirikshak in the project"));
});

describe(`Initilisation flow`, () => {
    beforeAll(() => process.chdir(__dirname));

    test(`File structure generation`, async () => {
        process.chdir(__dirname);
        await Init.handler({ configuration: config });
        expect(fs.pathExists("nirikshak")).resolves.toBe(true);
        expect(fs.pathExists(path.join("nirikshak", "resource"))).resolves.toBe(
            true
        );
        expect(fs.pathExists("jest.config.json")).resolves.toBe(true);
        expect(fs.pathExists("jest.setup.js")).resolves.toBe(true);
    });

    afterAll(async () => {
        await fs.remove(".nirikshak");
        await fs.remove(path.join("nirikshak", "resource"));
        await fs.remove("jest.config.json");
        await fs.remove("jest.setup.js");
        process.chdir(cwd);
    });
});
