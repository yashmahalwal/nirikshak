import { validateConfig } from "../../../src/configuration";
const invalidConfigs = [
    {},
    { dir: "testDirectory" },
    { resources: ["student"] },
    { dir: 12, resources: ["name"] },
    { dir: "testDir", resources: 12312 },
    { dir: "testDir", resources: [] },
    { dir: "testDir", resources: [""] },
    { dir: "testDir", resources: [{ name: "" }] },
    { dir: "testDir", resources: [{ name: "name" }] },
    { dir: "testDir", resources: [{ name: "name", dir: "" }] },
    { dir: "testDir", resources: [{ name: "name", dir: "dir" }, ""] },
    { dir: "testDir", resources: ["", { name: "" }] },
    { dir: "testDir", resources: ["", { name: "name" }] },
    { dir: "testDir", resources: ["", { name: "name", dir: "" }] },
    { app: "app.ts" },
    { app: "app.ts", dir: "testDirectory" },
    { app: "app.ts", resources: ["student"] },
    { app: "app.ts", dir: 12, resources: ["name"] },
    { app: "app.ts", dir: "testDir", resources: 12312 },
    { app: "app.ts", dir: "testDir", resources: [] },
    { app: "app.ts", dir: "testDir", resources: [""] },
    { app: "app.ts", dir: "testDir", resources: [{ name: "" }] },
    { app: "app.ts", dir: "testDir", resources: [{ name: "name" }] },
    { app: "app.ts", dir: "testDir", resources: [{ name: "name", dir: "" }] },
    {
        app: "app.ts",
        dir: "testDir",
        resources: [{ name: "name", dir: "dir" }, ""],
    },
    { app: "app.ts", dir: "testDir", resources: ["", { name: "" }] },
    { app: "app.ts", dir: "testDir", resources: ["", { name: "name" }] },
    {
        app: "app.ts",
        dir: "testDir",
        resources: ["", { name: "name", dir: "" }],
    },
    {
        app: "app.ts",
        dir: "testDir",
        resources: ["name", { name: "name", dir: "files" }],
    },
];

describe("Validate invalid config", () => {
    test.each(invalidConfigs)("Validate invalid config %#", (invalid) => {
        expect.assertions(1);
        try {
            validateConfig(invalid);
        } catch (e) {
            expect(e).toMatchSnapshot();
        }
    });
});
