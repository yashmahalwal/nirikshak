import { Reporter, Context } from "@jest/reporters";
import { AggregatedResult } from "@jest/test-result";
declare class NirikshakReporter implements Pick<Reporter, "onRunComplete"> {
    onRunComplete(contextSet: Set<Context>, results: AggregatedResult): Promise<void>;
}
export default NirikshakReporter;
