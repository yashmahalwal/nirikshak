process.env = {
    ...process.env,
};
module.exports = {
    displayName: "all",
    projects: [
        {
            displayName: "student",
            testMatch: ["<rootDir>/__tests__/student/**/*.test.ts"],
        },
    ],
    setupFilesAfterEnv: ["./jest.setup.js"],
};
