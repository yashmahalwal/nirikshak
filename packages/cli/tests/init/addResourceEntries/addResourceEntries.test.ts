import path from "path";
import fs from "fs-extra";
import { Configuration } from "../../../src/utils/types";
import addResourceEntries from "../../../src/init/addResourceEntries";
import process from "process";
const config: Configuration = {
    app: "app.ts",
    dir: "nirikshak",
    resources: [
        "student",
        {
            name: "faculty",
            dir: "facultyDir",
        },
    ],
};

beforeAll(() => process.chdir(__dirname));

test("Adding resource entries", async () => {
    await addResourceEntries(config);
    const result = await Promise.all(
        config.resources.map((resource) =>
            fs.pathExists(
                path.resolve(
                    ".nirikshak",
                    typeof resource === "string" ? resource : resource.name
                )
            )
        )
    );

    expect(result.every((v) => v)).toBe(true);
});

afterAll(
    async () =>
        await Promise.all(
            config.resources.map((resource) =>
                fs.remove(
                    path.resolve(
                        ".nirikshak",
                        typeof resource === "string" ? resource : resource.name
                    )
                )
            )
        )
);
