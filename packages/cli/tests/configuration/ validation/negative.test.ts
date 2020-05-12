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

describe("Validate invalid config", () => {
  test.each(invalidConfigs)("Validate invalid config %#", (invalid) => {
    expect(() => validateConfig(invalid)).toThrowErrorMatchingSnapshot();
  });
});