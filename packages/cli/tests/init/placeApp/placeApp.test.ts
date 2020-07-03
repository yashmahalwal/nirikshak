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

const appPath = path.resolve(__dirname, "nirikshak/app.ts");

beforeAll(() => process.chdir(__dirname));

test(`Places app correctly`, async () => {
    await placeApp(configuration);
    // Check existance of the tunnel
    expect(await fs.pathExists(appPath)).toBe(true);
    const content = (await fs.readFile(appPath)).toString();
    // Check the validity of the tunnel
    expect(content).toEqual(
        `export {default} from "${path.resolve(__dirname, "index")}";`
    );
});
afterEach(async () => await fs.remove(appPath));
