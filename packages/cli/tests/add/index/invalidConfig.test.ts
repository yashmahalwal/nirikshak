import * as Add from "../../../src/add";

const config: Record<string, any> = {
    app: "index.ts",
    resources: ["student"],
};

test(`Invalid configuration`, async () => {
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
            `"data should have required property 'dir'"`
        );
    }
});
