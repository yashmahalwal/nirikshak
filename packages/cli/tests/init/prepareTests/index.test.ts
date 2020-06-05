import path from "path";
import fs from "fs-extra";
import process from "process";
import prepareTestFiles from "../../../src/init/prepareTests";
import { Configuration } from "../../../src/utils/types";
import { getResourceDirectory } from "../../../src/utils/getResourceDir";

const config: Configuration = {
    app: "app.ts",
    dir: "nirikshak",
    resources: ["resource1", { name: "r2", dir: "resource2" }],
};

beforeAll(async () => {
    process.chdir(__dirname);
    await prepareTestFiles(config);
});

test("Checking config files", async () => {
    expect.assertions(config.resources.length);
    const res = await Promise.all(
        config.resources.map((resource) =>
            fs.pathExists(
                path.resolve(
                    getResourceDirectory(resource, config.dir),
                    "config.json"
                )
            )
        )
    );

    expect(res.length).toBe(config.resources.length);
    expect(res.every((v) => v)).toBe(true);
});

afterAll(async () => {
    await Promise.all(
        config.resources.map((resource) =>
            fs.remove(
                path.resolve(
                    getResourceDirectory(resource, config.dir),
                    "config.json"
                )
            )
        )
    );
});
