import signale from "signale";
import { CliArgs, Configuration } from "../utils/types";
import childProcess from "child_process";
import validateDirectoryStructure from "../utils/validateDirectoryStructure";
import { getResourceDirectory } from "../utils/getResourceDir";
interface RunArgs extends CliArgs {
    name: string[];
}

async function run({
    name = [],
    configuration,
    ...args
}: RunArgs): Promise<void> {
    validateDirectoryStructure(configuration);

    let mapping: Configuration["resources"] = [];

    name.forEach((n) => {
        const val = configuration.resources.find((resource) =>
            typeof resource === "string" ? resource === n : resource.name === n
        );
        if (!val) throw new Error(`Cannot find resource: ${n}`);
        mapping.push(val);
    });

    if (!mapping.length) mapping = configuration.resources;
    const commandString: string[] = configuration.jestArgs ?? [];
    // Override user
    commandString.push("--color=false", "--noStackTrace");
    commandString.push(
        ...mapping.map((m) => getResourceDirectory(m, configuration.dir))
    );

    try {
        childProcess.execSync(`npx jest ${commandString.join(" ")}`, {
            stdio: ["inherit", "inherit", "inherit"],
        });
    } catch (e) {
        signale.fatal("Jest sent an error");
        throw e;
    }
}

export const command = "run [name..]";
export const describe = "Run tests for specified resources.";
export const handler = run;
