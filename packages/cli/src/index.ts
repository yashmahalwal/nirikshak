#!/usr/bin/env node
import figlet from "./utils/figletWrapper";
import chalk from "chalk";
import yargs from "yargs";
import * as Init from "./init";
import { parseConfig } from "./configuration";
/* Main file to route the commands to appropriate functions */

(async function () {
    console.log(
        chalk.whiteBright(
            await figlet("Nirikshak", {
                horizontalLayout: "full",
            })
        )
    );
    console.log(chalk.underline.bold("Test your REST APIs with ease"));
    console.log("\n");

    const { argv } = yargs
        .demandCommand(1)
        // Init command
        .command(Init)
        .usage("Usage: $0 [command] [options]")
        // Option: config
        .config("config", parseConfig)
        .alias("config", "c")
        .default("config", "nirikshak.json")
        .describe("config", "path to the configuration file")
        // Examples
        .example(
            "nirikshak init",
            "Initialises the Initialise nirikshak in the project with default config file"
        )
        .example(
            "nirikshak init -c config.json",
            "Initialises the Initialise nirikshak in the project with config.json file"
        )
        .example(
            "nirikshak init --config=config.json",
            "Initialises the Initialise nirikshak in the project with config.json file"
        )
        // Alias help
        .help("help")
        .alias("help", "h")
        // Alias version
        .version("version")
        .alias("version", "v");
})();
