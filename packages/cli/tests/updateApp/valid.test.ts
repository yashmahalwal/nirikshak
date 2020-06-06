import process from "process";
import * as Update from "../../src/updateApp";
import { Configuration } from "../../src/utils/types";
import path from "path";
import fs from "fs-extra";

const configuration = {
    app: "app.ts",
    dir: "test",
    resources: ["faculty"],
};

beforeAll(() => process.chdir(__dirname));

const appPath = path.resolve(__dirname, "test/app.ts");
test(`Valid configuration`, async () => {
    await Update.handler({
        config: "./config.json",
        configuration: configuration as Configuration,
        newPath: "server.ts",
    });

    expect(await fs.pathExists(appPath)).toBe(true);
    const appContent = (await fs.readFile(appPath)).toString();
    expect(appContent).toEqual(
        `export {default} from "${path.resolve("server.ts")}";`
    );

    const configContent: Configuration = await fs.readJSON("config.json");
    expect(configContent.app).toEqual("server.ts");
});

afterAll(async () => {
    await fs.remove(appPath);
    const configContent: Configuration = await fs.readJSON("config.json");
    configContent.app = "app.ts";
    await fs.writeJSON("config.json", configContent);
});
