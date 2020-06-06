import process from "process";
import * as Update from "../../src/updateApp";
import { Configuration } from "../../src/utils/types";
const configuration = {
    app: "app.ts",
    dir: "test",
    resources: ["student"],
};

beforeAll(() => process.chdir(__dirname));

test(`Invalid configuration`, async () => {
    expect.hasAssertions();
    try {
        await Update.handler({
            config: "./config.json",
            configuration: configuration as Configuration,
            newPath: "server.ts",
        });
    } catch (e) {
        expect(e).toMatchInlineSnapshot(
            `[Error: Directory for student not found]`
        );
    }
});
