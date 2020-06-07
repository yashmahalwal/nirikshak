import result from "./nirikshak.jest.log.json";
import { parseAssertions } from "../src/assertions";
import { AssertionResult } from "@jest/test-result";
describe("reporter", () => {
    test("Sample test", () => {
        let assertions: AssertionResult[] = [];
        result.testResults.forEach((t) =>
            assertions.push(...(t.assertionResults as any[]))
        );

        assertions = assertions.filter(
            (assertion) => assertion.status === "failed"
        );
        const results = parseAssertions(assertions);
        void results;
    });
});
