import log from "./nirikshak.jest.log.json";
import { AssertionResult } from "@jest/test-result";
import DBScan from "../src/dbscan/dbscan";
import { parseAssertion } from "../src/assertions";
import { distance } from "../src/dbscan/distanceFunction";

test("DBScan with assertions", () => {
    let assertions: AssertionResult[] = [];
    log.testResults.forEach((t) =>
        assertions.push(...(t.testResults as AssertionResult[]))
    );

    assertions = assertions.filter((a) => a.status === "failed");
    const parsedAssertions = assertions.map((i) => parseAssertion(i));
    const { clusters, noise } = new DBScan(
        parsedAssertions,
        0.4,
        7,
        distance
    ).run();

    return;
});
