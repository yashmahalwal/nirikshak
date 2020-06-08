import NirikshakReporter from "../src";
import log from "./nirikshak.jest.log.json";
import { AggregatedResult } from "@jest/reporters";

beforeAll(() => process.chdir(__dirname))

test("Custom reporter", () => {
    const reporter = new NirikshakReporter();
    reporter.onRunComplete(null as any, log as AggregatedResult);
    return;
});
