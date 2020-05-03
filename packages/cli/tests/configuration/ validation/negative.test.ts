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
];

test.each(invalidConfigs)("Validate invalid config %#", () => {
    expect(() => validateConfig(invalidConfigs)).toThrowErrorMatchingSnapshot();
});
