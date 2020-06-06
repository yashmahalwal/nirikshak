import { AggregatedResult } from "@jest/reporters";
import { ParsedAssertions } from "./assertions";
interface ParsedResultBase {
    passed: number;
    failed: number;
    total: number;
    success: boolean;
}
declare type ParsedResult = ParsedResultBase & ({
    success: true;
} | {
    success: false;
    assertionResult: ParsedAssertions;
});
export declare function parseResults(result: AggregatedResult): ParsedResult;
export {};
