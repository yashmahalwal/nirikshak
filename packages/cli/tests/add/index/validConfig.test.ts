import process from "process";
import * as Add from "../../../src/add";
import fs from "fs-extra";
import path from "path";
import { Configuration, JestConfig } from "../../../src/utils/types";

const configData: Configuration = fs.readJSONSync(
    path.resolve(__dirname, "config.json")
);
beforeAll(() => process.chdir(__dirname));

test(`Valid case`, async () => {
    await Add.handler({
        name: "faculty",
        config: "config.json",
        configuration: configData,
    });

    expect(fs.pathExists(path.resolve(".nirikshak", "faculty"))).resolves.toBe(
        true
    );
    expect(fs.pathExists(path.resolve("test", "faculty"))).resolves.toBe(true);
    expect(
        fs.pathExists(path.resolve("test", "faculty", "config.json"))
    ).resolves.toBe(true);

    const newConfig: Configuration = await fs.readJSON("config.json");
    expect(newConfig.resources.some((e) => e === "faculty")).toBe(true);
    const jest: JestConfig = await fs.readJSON("jest.config.json");
    const testPath = path.join("<rootDir>", "test", "faculty", "**/*.test.ts");
    const e = jest.projects[0];
    expect(e.displayName === "faculty" && e.testMatch.includes(testPath)).toBe(
        true
    );
});

afterAll(async () => {
    configData.resources = configData.resources.filter((e) => e !== "faculty");
    await fs.writeJSON("config.json", configData);
    await fs.writeJSON("jest.config.json", {
        projects: [],
    });
    await fs.remove(path.resolve(".nirikshak", "faculty"));
    await fs.remove(path.resolve("test", "faculty"));
});
