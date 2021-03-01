/* Only for jest */

// babel.config.js
module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
    ],
    plugins: [
        "@babel/plugin-proposal-export-namespace-from",
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
    sourceMaps: "inline",
    retainLines: true,
};
