import { AssertionResult } from "@jest/test-result";
import { ParsedNode } from "@nirikshak/core";
export declare type ParsedAssertions = [{
    name: "resource";
    children: {
        name: string;
        children: {
            name: string;
            children: {
                name: string;
                value: number;
            }[];
        }[];
    }[];
}, {
    name: "iteration";
    children: {
        name: string;
        children: {
            name: string;
            children: {
                name: string;
                value: number;
            }[];
        }[];
    }[];
}, {
    name: "case";
    children: {
        name: string;
        children: {
            name: string;
            children: {
                name: string;
                value: number;
            }[];
        }[];
    }[];
}, {
    name: "url";
    children: {
        name: string;
        children: {
            name: string;
            children: {
                name: string;
                value: number;
            }[];
        }[];
    }[];
}, {
    name: "error-message";
    children: {
        name: string;
        children: {
            name: string;
            children: {
                name: string;
                value: number;
            }[];
        }[];
    }[];
}, {
    name: "method";
    children: {
        name: string;
        children: {
            name: string;
            children: {
                name: string;
                value: number;
            }[];
        }[];
    }[];
}];
export interface ParsedAssertion extends ParsedNode {
    resource: string;
    iteration: number;
    pathIndex: number;
    errorMessage: string;
}
export declare function parseAssertion({ ancestorTitles, title, failureMessages, }: AssertionResult): ParsedAssertion;
export declare function insertIntoAssertion(o: ParsedAssertions, assertion: ParsedAssertion): void;
export declare function parseAssertions(assertions: AssertionResult[]): ParsedAssertions;
