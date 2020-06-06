import { Reporter, Context } from "@jest/reporters";
import { AggregatedResult } from "@jest/test-result";
export default class CustomReporter implements Pick<Reporter, "onRunComplete"> {
    async onRunComplete(
        contextSet: Set<Context>,
        results: AggregatedResult
    ): Promise<void> {
        console.log("Total tests: ", results.numTotalTests);
        console.log("Failed tests: ", results.numFailedTests);
        // await open(path.resolve(__dirname, "../static", "index.html"));
    }
}
