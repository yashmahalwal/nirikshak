module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    ignorePatterns: ["node_modules", "*.js", "*.d.ts"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "no-unused-vars": ["off"],
        "import/no-extraneous-dependencies": ["error"],
    },
};
