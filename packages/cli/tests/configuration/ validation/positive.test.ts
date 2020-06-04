import { validateConfig } from "../../../src/configuration";

const validConfigs = [
    {
        dir: "nirikshak",
        resources: ["student"],
    },
    {
        dir: "nirikshak",
        resources: ["student", "faculty"],
    },
    {
        dir: "tests",
        resources: [{ name: "student", dir: "st" }, "faculty"],
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
    },
];

describe("Validate valid config", () => {
    test.each(validConfigs)("Validate valid config %#", (validConfig) =>
        expect(() => validateConfig(validConfig)).not.toThrow()
    );
});
