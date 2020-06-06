import { AggregatedResult } from "@jest/reporters";
import { ParsedAssertions, parseAssertions } from "./assertions";
import { AssertionResult } from "@jest/test-result";

interface ParsedResultBase {
    passed: number;
    failed: number;
    total: number;
    success: boolean;
}

type ParsedResult = ParsedResultBase &
    (
        | {
              success: true;
          }
        | {
              success: false;
              assertionResult: ParsedAssertions;
          }
    );

export function parseResults(result: AggregatedResult): ParsedResult {
    let o: ParsedResult = {
        total: result.numTotalTests,
        passed: result.numPassedTests,
        failed: result.numFailedTests,
        success: true,
    };

    if (!result.success) {
        const assertions: AssertionResult[] = [];

        for (const { testResults } of result.testResults)
            for (const assertion of testResults)
                if (assertion.status === "failed") assertions.push(assertion);

        o = {
            ...o,
            success: false,
            assertionResult: parseAssertions(assertions),
        };
    }
    return o;
}
