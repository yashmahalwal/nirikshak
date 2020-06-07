import log from "./nirikshak.jest.log.json";
import { AssertionResult } from "@jest/test-result";
import { parseAssertions } from "../src/assertions";

test("Assertion grouping", () => {
    const assertions: AssertionResult[] = [];
    log.testResults.forEach((t) =>
        assertions.push(...(t.assertionResults as AssertionResult[]))
    );

    const output = parseAssertions(assertions);
    void output;
});
