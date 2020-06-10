import process from "process";
import * as Add from "../../../src/add";
import signale from "signale";
const config: Record<string, any> = {
    app: "index.ts",
    resources: ["student", "college"],
    dir: "test",
};

beforeAll(() => process.chdir(__dirname));
beforeEach(() => {
    signale.info = jest.fn();
    signale.error = jest.fn();
    signale.success = jest.fn();
});

test(`Invalid directory structure`, async () => {
    expect.assertions(3);
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
    expect(signale.info).toHaveBeenCalledWith(`Adding resource faculty`);
    expect(signale.success).not.toHaveBeenCalled();
});
