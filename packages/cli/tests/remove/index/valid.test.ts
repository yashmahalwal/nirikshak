import process from "process";
import * as Remove from "../../../src/remove";
import path from "path";
import fs from "fs-extra";
import { Configuration, JestConfig } from "../../../src/utils/types";
import signale from "signale";
const validConfig: Configuration = fs.readJSONSync(
    path.resolve(__dirname, "config.json")
);

beforeAll(() => process.chdir(__dirname));
beforeEach(() => {
    signale.info = jest.fn();
    signale.error = jest.fn();
    signale.success = jest.fn();
});
test(`Removing valid resource`, async () => {
    await Remove.handler({
        config: "config.json",
        name: "student",
        configuration: validConfig,
    });

    const data: Configuration = await fs.readJSON("config.json");
    expect(data.resources.some((e) => e === "student")).toBe(false);
    const jestData: JestConfig = await fs.readJSON("jest.config.json");
    expect(jestData.projects.some((e) => e.displayName === "student")).toBe(
        false
    );
    expect(fs.pathExists(path.resolve(".nirikshak", "student"))).resolves.toBe(
        false
    );
    expect(fs.pathExists(path.resolve("test", "student"))).resolves.toBe(false);
    expect(signale.info).toHaveBeenCalledWith("Removing resource student");
    expect(signale.success).toHaveBeenCalledWith("Done");
});

afterAll(async () => {
    await fs.writeFile(path.resolve(".nirikshak", "student"), "student");
    const data: JestConfig = await fs.readJSON("jest.config.json");
    data.projects.push({
        displayName: "student",
        testMatch: ["<rootDir>/student"],
    });
    await fs.writeJSON("jest.config.json", data, { spaces: 4 });
    const configData: Configuration = await fs.readJSON("config.json");
    configData.resources.push("student");
    await fs.writeJSON("config.json", configData, { spaces: 4 });
    await fs.ensureDir(path.resolve("test", "student"));
});
