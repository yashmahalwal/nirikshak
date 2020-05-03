const base = require("./jest.base");

module.exports = {
    ...base,
    projects: [
        {
            displayName: "Root",
            testMatch: ["<rootDir>/*.test.*"],
        },
        {
            testMatch: ["<rootDir>/packages/cli/**/*.test.*"],
        },
    ],
};
