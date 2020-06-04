import path from "path";
import { Configuration, CliArgs, JestConfig } from "../utils/types";
import fs from "fs-extra";

export function makeJestConfiguration(
    configuration: CliArgs["configuration"]
): JestConfig {
    return {
        projects: configuration.resources.map((resource) => ({
            displayName: typeof resource == "string" ? resource : resource.name,
            testMatch: [
                path.join(
                    "<rootDir>",
                    configuration.dir,
                    typeof resource == "string" ? resource : resource.dir,
                    "**/*.test.ts"
                ),
            ],
        })),
        setupFilesAfterEnv: ["./jest.setup.js"],
    };
}

export default async function placeJestConfig(
    configuration: Configuration
): Promise<void> {
    const jestConfig = makeJestConfiguration(configuration);

    await fs.writeJSON("jest.config.json", jestConfig, {
        spaces: 4,
    });
    await fs.copy(
        path.resolve(__dirname, "../staticFiles/jest.setup"),
        "jest.setup.js"
    );
}
