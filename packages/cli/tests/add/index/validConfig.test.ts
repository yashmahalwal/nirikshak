import signale from "signale";
import process from "process";
import * as Add from "../../../src/add";
import fs from "fs-extra";
import path from "path";
import { Configuration, JestConfig } from "../../../src/utils/types";

const configData: Configuration = fs.readJSONSync(
    path.resolve(__dirname, "config.json")
);
beforeAll(() => process.chdir(__dirname));
beforeEach(() => {
    signale.info = jest.fn();
    signale.error = jest.fn();
    signale.success = jest.fn();
});

test(`Valid case`, async () => {
    await Add.handler({
        name: "faculty",
        config: "config.json",
        configuration: configData,
    });

    expect(fs.pathExists(path.resolve(".nirikshak", "faculty"))).resolves.toBe(
        true
    );
    expect(
        (await fs.readFile(path.resolve(".nirikshak", "faculty"))).toString()
    ).toBe("faculty");
    expect(fs.pathExists(path.resolve("test", "faculty"))).resolves.toBe(true);
    expect(
        fs.pathExists(path.resolve("test", "faculty", "config.json"))
    ).resolves.toBe(true);
    expect(
        fs.pathExists(path.resolve("test", "faculty", "helpers.ts"))
    ).resolves.toBe(true);
    expect(
        fs.pathExists(path.resolve("test", "faculty", "faculty.test.ts"))
    ).resolves.toBe(true);
    const newConfig: Configuration = await fs.readJSON("config.json");
    expect(newConfig.resources.some((e) => e === "faculty")).toBe(true);
    const jest: JestConfig = await fs.readJSON("jest.config.json");
    const testPath = path.join("<rootDir>", "test", "faculty", "**/*.test.ts");
    const e = jest.projects[1];
    expect(e.displayName === "faculty" && e.testMatch.includes(testPath)).toBe(
        true
    );

    expect(signale.info).toHaveBeenCalledWith("Adding resource faculty");
    expect(signale.success).toHaveBeenCalledWith("Done");
});

afterAll(async () => {
    configData.resources = configData.resources.filter((e) => e !== "faculty");
    await fs.writeJSON("config.json", configData, { spaces: 4 });
    await fs.writeJSON(
        "jest.config.json",
        {
            projects: [{ displayName: "student", testMatch: ["student"] }],
        },
        { spaces: 4 }
    );
    await fs.remove(path.resolve(".nirikshak", "faculty"));
    await fs.remove(path.resolve("test", "faculty"));
});
