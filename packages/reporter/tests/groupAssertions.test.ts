import log from "./nirikshak.jest.log.json";
import { AssertionResult } from "@jest/test-result";
import { parseAssertions } from "../src/assertions";
test("Assertion grouping", async () => {
    let assertions: AssertionResult[] = [];
    log.testResults.forEach((t) =>
        assertions.push(...(t.testResults as AssertionResult[]))
    );

    assertions = assertions.filter((a) => a.status === "failed");

    const output = parseAssertions(assertions);
    void output;
});
