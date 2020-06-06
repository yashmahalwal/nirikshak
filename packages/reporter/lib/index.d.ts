import { Reporter, Context } from "@jest/reporters";
import { AggregatedResult } from "@jest/test-result";
export default class CustomReporter implements Pick<Reporter, "onRunComplete"> {
    onRunComplete(contextSet: Set<Context>, results: AggregatedResult): Promise<void>;
}
