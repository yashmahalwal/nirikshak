import process from "process";
import { validateConfig } from "../../../src/configuration";
import { Configuration } from "../../../src/utils/types";

const validConfigs: Configuration[] = [
    {
        dir: "nirikshak",
        resources: ["student"],
        app: "app.ts",
    },
    {
        dir: "nirikshak",
        resources: ["student", "faculty"],
        app: "app.ts",
    },
    {
        dir: "tests",
        resources: [{ name: "student", dir: "st" }, "faculty"],
        app: "app.ts",
    },
    {
        dir: "tests",
        resources: [
            { name: "student", dir: "st" },
            {
                name: "faculty",
                dir: "fc",
            },
        ],
        app: "app.ts",
    },
    {
        dir: "tests",
        resources: [
            "student",
            {
                name: "faculty",
                dir: "fc",
            },
        ],
        app: "app.ts",
    },
];

describe("Validate valid config", () => {
    beforeAll(() => process.chdir(__dirname));

    test.each(validConfigs)("Validate valid config %#", (validConfig) =>
        expect(() => validateConfig(validConfig)).not.toThrow()
    );
});
