import path from "path";
import { Reporter, Context } from "@jest/reporters";
import { AggregatedResult, AssertionResult } from "@jest/test-result";
import fs from "fs-extra";
import open from "open";
import { ParsedAssertions, parseAssertions } from "./assertions";
class NirikshakReporter implements Pick<Reporter, "onRunComplete"> {
    async onRunComplete(
        contextSet: Set<Context>,
        results: AggregatedResult
    ): Promise<void> {
        if (!results.numTotalTests) return;

        const assertions: AssertionResult[] = [];
        results.testResults.forEach((t) =>
            t.testResults.forEach(
                (res) => res.status === "failed" && assertions.push(res)
            )
        );
        const parsedAssertions: ParsedAssertions = parseAssertions(assertions);

        const htmlData = {
            total: results.numTotalTests,
            passed: results.numPassedTests,
            failed: results.numFailedTests,
            parsedAssertions,
        };

        let htmlFile = (
            await fs.readFile(path.resolve(__dirname, "../static/index.html"))
        ).toString();
        htmlFile = htmlFile.replace("{{testResult}}", JSON.stringify(htmlData));
        const dest = path.resolve(process.cwd(), "test-report.html");
        await fs.writeFile(
            path.resolve(process.cwd(), "test-report.html"),
            htmlFile
        );
        open(dest);
    }
}

export default NirikshakReporter;
