import { CliArgs } from "../utils/additionalTypes";
import { JestConfig } from ".";

export function makeResourceJestConfiguration(
    resource: CliArgs["configuration"]["resources"][0]
): JestConfig {
    return {
        displayName: typeof resource == "string" ? resource : resource.name,
    };
}
