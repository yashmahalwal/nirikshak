const base = require("./jest.base");

module.exports = {
    ...base,
    projects: [
        {
            displayName: "Root",
            testMatch: ["<rootDir>/*.test.ts"],
        },
        {
            displayName: "CLI",
            testMatch: ["<rootDir>/packages/cli/**/*.test.ts"],
        },
    ],
};
