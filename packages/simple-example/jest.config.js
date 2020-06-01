process.env = {
    ...process.env,
    SETUP_INSTANCES: 10,
    ITERATIONS: 2,
};
module.exports = {
    displayName: "all",
    projects: [
        {
            displayName: "student",
            testMatch: ["<rootDir>/__tests__/student/**/*.test.ts"],
        },
    ],
};
