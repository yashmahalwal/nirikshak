import process from "process";
import * as Add from "../../../src/add";

const config: Record<string, any> = {
    app: "index.ts",
    resources: ["student", "college"],
    dir: "test",
};

beforeAll(() => process.chdir(__dirname));

test(`Invalid directory structure`, async () => {
    expect.hasAssertions();
    try {
        await Add.handler({
            name: "faculty",
            dir: "fc",
            config: "config.json",
            configuration: config as any,
        });
    } catch (e) {
        expect(e).toMatchInlineSnapshot(
            `[Error: Resource college does not exist. Please check project configuration.]`
        );
    }
});
