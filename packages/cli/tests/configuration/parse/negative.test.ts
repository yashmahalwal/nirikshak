import path from "path";
import { parseConfig } from "../../../src/configuration";
const invalidPath = path.resolve(__dirname, "nonExistent.json");
const validPath = path.resolve(__dirname, "invalid.json");

describe(`Parse invalid configuration`, () => {
    test(`Invalid path`, () => {
        const err = parseConfig(invalidPath);
        expect(err).toMatchInlineSnapshot(
            `[Error: /home/yash/Desktop/nirikshak/packages/cli/tests/configuration/parse/nonExistent.json: ENOENT: no such file or directory, open '/home/yash/Desktop/nirikshak/packages/cli/tests/configuration/parse/nonExistent.json']`
        );
    });

    test(`Invalid file`, () => {
        const err = parseConfig(validPath);
        expect(err).toMatchInlineSnapshot(`
            Array [
              Object {
                "dataPath": "",
                "keyword": "required",
                "message": "should have required property 'dir'",
                "params": Object {
                  "missingProperty": "dir",
                },
                "schemaPath": "#/required",
              },
            ]
        `);
    });
});
