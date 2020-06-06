import { AssertionResult } from "@jest/test-result";
import { ParsedNode } from "@nirikshak/core";
export interface ParsedAssertions {
    resource: {
        [key: string]: number;
    };
}
interface ParsedAssertion {
    resource: string;
    iteration: number;
    pathIndex: number;
    parsedNode: ParsedNode;
    parsedPath: ParsedNode[];
}
export declare function parseAssertion({ ancestorTitles, title, }: AssertionResult): ParsedAssertion;
export declare function parseAssertions(input: AssertionResult[]): ParsedAssertions;
export {};
