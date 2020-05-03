module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["packages/**/src/**/*.ts", "!**/node_modules/**"],
    coverageDirectory: "<rootDir>/coverage",
};
