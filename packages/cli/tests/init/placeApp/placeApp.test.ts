import path from "path";
import process from "process";
import { Configuration } from "../../../src/utils/types";
import fs from "fs-extra";
import placeApp from "../../../src/init/app";
const configuration: Configuration = {
    app: "index.ts",
    dir: "nirikshak",
    resources: ["student"],
};

const apps = ["index.js", "index.ts", "index"];

const appPath = path.resolve(__dirname, "nirikshak/app.ts");

beforeAll(() => process.chdir(__dirname));

apps.forEach((app) => {
    test(`Places app correctly: ${app}`, async () => {
        await placeApp(configuration);
        expect(fs.pathExists(appPath)).resolves.toBe(true);
        const content = (await fs.readFile(appPath)).toString();
        expect(content).toEqual(
            `export {default} from "${path.resolve(__dirname, "index")}";`
        );
    });
});
afterEach(async () => await fs.remove(appPath));
