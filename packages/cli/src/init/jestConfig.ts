import { CliArgs } from "../utils/additionalTypes";
import { makeRootJestConfiguration } from "../configuration/jestRoot";
import fs from "fs-extra";
import { PathJoiner } from "../utils/pathJoiner";
import { makeResourceJestConfiguration } from "../configuration/jestResource";
import { getResourceDirectory } from "../utils/getResourceDir";

export async function rootJestConfig(configuration: CliArgs["configuration"]) {
    const config = makeRootJestConfiguration(configuration);
    const joiner = new PathJoiner();
    await fs.writeJSON(
        joiner.join(configuration.dir, "jest.config.json"),
        config,
        { spaces: 4 }
    );

    await Promise.all(
        configuration.resources.map((resource) => {
            const config = makeResourceJestConfiguration(resource);
            return fs.writeJSON(
                joiner.join(
                    getResourceDirectory(resource, configuration.dir),
                    "jest.config.json"
                ),
                config,
                { spaces: 4 }
            );
        })
    );
}
