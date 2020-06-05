import path from "path";
import process from "process";
import { Configuration } from "../../../src/utils/types";
import fs from "fs-extra";
import placeApp from "../../../src/init/app";
const configuration: Configuration = {
    app: "app.ts",
    dir: "nirikshak",
    resources: ["student"],
};

const appPath = path.resolve(__dirname, "nirikshak/app.ts");

beforeAll(() => process.chdir(__dirname));

test(`Places app correctly`, async () => {
    await placeApp(configuration);
    expect(fs.pathExists(appPath)).resolves.toBe(true);
    const content = (await fs.readFile(appPath)).toString();
    expect(content).toEqual(
        `export {default} from "${path.resolve(__dirname, "app.ts")}";`
    );
});

afterAll(async () => await fs.remove(appPath));
