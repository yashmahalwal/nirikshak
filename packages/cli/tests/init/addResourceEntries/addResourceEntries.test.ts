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
const dirPath = path.resolve(__dirname, ".nirikshak", "dir");
test("Adding resource entries", async () => {
    await addResourceEntries(config);
    const result = await Promise.all(
        config.resources.map(async (resource) => {
            const content = (
                await fs.readFile(
                    path.resolve(
                        ".nirikshak",
                        typeof resource === "string" ? resource : resource.name
                    )
                )
            ).toString();

            return (
                content ===
                (typeof resource === "string" ? resource : resource.dir)
            );
        })
    );

    expect(result.every((v) => v)).toBe(true);
    expect(fs.pathExists(dirPath)).resolves.toBe(true);
    expect((await fs.readFile(dirPath)).toString()).toBe("nirikshak");
});

afterAll(async () => {
    await Promise.all(
        config.resources.map((resource) =>
            fs.remove(
                path.resolve(
                    ".nirikshak",
                    typeof resource === "string" ? resource : resource.name
                )
            )
        )
    );
    await fs.remove(dirPath);
});
