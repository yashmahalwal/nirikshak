import path from "path";
import process from "process";
import * as Init from "../../../src/init";
import { Configuration } from "../../../src/utils/types";
import fs from "fs-extra";

const config: Configuration = {
    app: "app.ts",
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
        expect(fs.pathExists(".nirikshak")).resolves.toBe(true);
        expect(
            fs.pathExists(path.resolve(".nirikshak", "resource"))
        ).resolves.toBe(true);
        expect(
            fs.pathExists(path.resolve("nirikshak", "resource"))
        ).resolves.toBe(true);
        expect(fs.pathExists("jest.config.json")).resolves.toBe(true);
        expect(fs.pathExists("jest.setup.js")).resolves.toBe(true);
        expect(
            fs.pathExists(path.resolve("nirikshak", "app.ts"))
        ).resolves.toBe(true);
        expect(
            (
                await fs.readFile(path.resolve(".nirikshak", "resource"))
            ).toString()
        ).toEqual("resource");
        expect(fs.pathExists(path.resolve(".nirikshak", "dir"))).resolves.toBe(
            true
        );
        expect(
            (await fs.readFile(path.resolve(".nirikshak", "dir"))).toString()
        ).toEqual("nirikshak");
    });

    afterAll(async () => {
        await fs.remove(".nirikshak");
        await fs.remove("nirikshak");
        await fs.remove("jest.config.json");
        await fs.remove("jest.setup.js");
        process.chdir(cwd);
    });
});
