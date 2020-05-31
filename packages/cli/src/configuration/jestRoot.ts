import { CliArgs } from "../utils/additionalTypes";
import { JestConfig } from ".";
import { PathJoiner } from "../utils/pathJoiner";
export function makeRootJestConfiguration(
    configuration: CliArgs["configuration"]
): JestConfig {
    const joiner = new PathJoiner();
    return {
        displayName: "all",
        projects: configuration.resources.map((resource) => ({
            displayName: typeof resource == "string" ? resource : resource.name,
            testMatch: [
                joiner.join(
                    "<rootDir>",
                    joiner.join(
                        "__tests__",
                        joiner.join(
                            typeof resource == "string"
                                ? resource
                                : resource.dir,
                            "**/*.test.ts"
                        )
                    )
                ),
            ],
        })),
    };
}
