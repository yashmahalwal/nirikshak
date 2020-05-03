/*
    This test checks the fe-extra module functionality.
    It tests if the module correctly gets the JSON file.
    If the test passes after upgrading the module, it is safe to upgrade to module
*/
import { getConfig } from "../../../src/configuration";
import path from "path";

const fakeConfigPath = "./fakeConf/realFakeConf";
const actualConfigPath = path.join(
    process.cwd(),
    "packages/cli",
    "tests/configuration/existance/config.json"
);
const actualConfigObject = {
    dir: "nirikshak",
    resources: ["student"],
};

describe("Configuration existance tests", () => {
    test("Getting non existent configuration", () => {
        expect(() =>
            getConfig(fakeConfigPath)
        ).toThrowErrorMatchingInlineSnapshot(
            `"./fakeConf/realFakeConf: ENOENT: no such file or directory, open './fakeConf/realFakeConf'"`
        );
    });

    test("Getting an existing configuration file", () => {
        expect(getConfig(actualConfigPath)).toMatchObject(actualConfigObject);
    });
});
