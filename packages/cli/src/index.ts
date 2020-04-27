#!/usr/bin/env node
import figlet from "./figletWrapper";
import chalk from "chalk";
(async function () {
    console.log(
        chalk.whiteBright(
            await figlet("Nirikshak", {
                horizontalLayout: "full",
            })
        )
    );
    console.log(chalk.underline.bold(`Test your REST APIs with ease`));
})();
