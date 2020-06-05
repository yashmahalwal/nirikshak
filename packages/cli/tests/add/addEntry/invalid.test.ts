import process from "process";
import addEntry from "../../../src/add/addEntry";

beforeAll(async () => {
    process.chdir(__dirname);
});

test(`Adding existing resource`, async () => {
    expect.hasAssertions();
    try {
        await addEntry("student");
    } catch (e) {
        expect(e).toMatchInlineSnapshot(
            `[Error: Cannot add resource student. It already exists]`
        );
    }
});
