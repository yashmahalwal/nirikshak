import log from "./nirikshak.jest.log.json";
import { AssertionResult } from "@jest/test-result";
import DBScan from "../src/dbscan/dbscan";
import { parseAssertion } from "../src/assertions";

test("DBScan with assertions", () => {
    const assertions: AssertionResult[] = [];
    log.testResults.forEach((t) =>
        assertions.push(...(t.assertionResults as AssertionResult[]))
    );

    const parsedAssertions = assertions.map((i) => parseAssertion(i));
    const { clusters, noise } = new DBScan(parsedAssertions, 0.5, 4, (a, b) => {
        let distance = 0;

        if (a.parsedNode.method !== b.parsedNode.method) distance += 0.8;
        if (a.parsedNode.methodIndex !== b.parsedNode.methodIndex)
            distance += 0.2;

        return distance;
    }).run();

    const formattedClusters = clusters.map((cluster) =>
        cluster.map(
            (entry) =>
                `${entry.parsedNode.method}-${entry.parsedNode.methodIndex}`
        )
    );

    const formattedNoise = noise.map(
        (entry) => `${entry.parsedNode.method}-${entry.parsedNode.methodIndex}`
    );

    return;
});
