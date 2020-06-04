#!/usr/bin/env node
/* istanbul ignore file */
import figlet from "./utils/figletWrapper";
import chalk from "chalk";
import yargs from "yargs";
import * as Init from "./init";
import { parseConfig } from "./configuration";
import signale from "signale";
/* Main file to route the commands to appropriate functions */

(async function (): Promise<void> {
    console.log(
        chalk.whiteBright(
            await figlet("Nirikshak", {
                horizontalLayout: "full",
            })
        )
    );
    console.log(chalk.underline.bold("Test your REST APIs with ease"));
    console.log("\n");

    yargs
        .demandCommand(1)
        // Init command
        .command(Init)
        .usage("Usage: $0 [command] [options]")
        //     // Option: config
        .config("config", parseConfig)
        .alias("config", "c")
        .default("config", "nirikshak.json")
        .describe("config", "path to the configuration file")
        // // Examples
        .example(
            "nirikshak init",
            "Sets up the project using nirikshak.json file in the current working directory"
        )
        .example(
            "nirikshak init -c [configFile]",
            "Initialises the project with specified configuration file"
        )
        // Alias help
        .help()
        .alias("help", "h")
        // Alias version
        .version()
        .alias("version", "v")
        // Error handling
        .fail((message, error) => {
            if (message && message !== error?.message) signale.fatal(message);
            else signale.fatal(error);
            process.exit();
        })
        // Start
        .parse();
})();
