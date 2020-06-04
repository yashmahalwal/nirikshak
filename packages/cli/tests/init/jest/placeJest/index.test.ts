import fs from "fs-extra";
import process from "process";
import placeJestConfig, {
    makeJestConfiguration,
} from "../../../../src/init/jest";
import { Configuration } from "../../../../src/utils/types";
import path from "path";
beforeAll(() => process.chdir(__dirname));

const config: Configuration = {
    dir: "teacher",
    resources: ["student"],
};

test(`Placing jest configuration files`, async () => {
    await placeJestConfig(config);
    await fs.pathExists("jest.config.js");
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line import/no-unresolved
    const { default: mod } = await import("./jest.config.json");
    expect(mod).toEqual(makeJestConfiguration(config));
    await fs.pathExists("jest.setup.js");
    const buff1 = await fs.readFile("jest.setup.js");
    const buff2 = await fs.readFile(
        path.resolve(__dirname, "../../../../src/staticFiles/jest.setup")
    );
    expect(buff1.equals(buff2)).toBe(true);
});

afterAll(async () => {
    await fs.remove("jest.config.json");
    await fs.remove("jest.setup.js");
});
