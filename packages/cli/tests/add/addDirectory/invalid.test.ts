import process from "process";
import addDirectory from "../../../src/add/addDirectory";
beforeAll(() => process.chdir(__dirname));

test(`Adding already existing directory`, async () => {
    expect.hasAssertions();
    try {
        await addDirectory("sample", "nirikshak");
    } catch (e) {
        expect(e).toMatchInlineSnapshot(
            `[Error: Directory sample already exists]`
        );
    }
});
