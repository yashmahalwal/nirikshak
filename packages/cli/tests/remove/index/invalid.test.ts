import process from "process";
import * as Remove from "../../../src/remove";
import path from "path";
import fs from "fs-extra";
import { Configuration } from "../../../src/utils/types";

beforeAll(() => process.chdir(__dirname));

test(`Invalid resource`, async () => {
    const validConfig = await fs.readJSON(
        path.resolve(__dirname, "config.json")
    );
    try {
        await Remove.handler({
            config: "config.json",
            name: "faculty",
            configuration: validConfig,
        });
    } catch (e) {
        expect(e).toMatchInlineSnapshot(
            `[Error: Cannot remove non existing resource: faculty]`
        );
    }
});

test(`Invalid directory structure`, async () => {
    expect.hasAssertions();
    const validConfig = await fs.readJSON(
        path.resolve(__dirname, "config.json")
    );
    const c: Configuration = Object.assign({}, validConfig);
    c.resources.push("teacher");
    try {
        await Remove.handler({
            config: "config.json",
            name: "teacher",
            configuration: validConfig,
        });
    } catch (e) {
        expect(e).toMatchInlineSnapshot(
            `[Error: Directory for teacher not found]`
        );
    }
});
