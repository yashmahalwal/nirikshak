import { AssertionResult } from "@jest/test-result";
import { ParsedNode, MethodType, Cases } from "@nirikshak/core";
export interface ParsedAssertions {
    resource: {
        [key: string]: {
            count: number;
            iteration: {
                [key: string]: number;
            };
            method: {
                [key in MethodType]?: {
                    [key: string]: number;
                };
            };
            case: {
                [key in Cases]?: number;
            };
            url: {
                [key: string]: number;
            };
            errorMessage: {
                [key: string]: number;
            };
        };
    };
    iteration: {
        [key: string]: {
            count: number;
            resource: {
                [key: string]: number;
            };
            method: {
                [key in MethodType]?: {
                    [key: string]: number;
                };
            };
            case: {
                [key in Cases]?: number;
            };
            url: {
                [key: string]: number;
            };
            errorMessage: {
                [key: string]: number;
            };
        };
    };
    case: {
        [key in Cases]?: {
            resource: {
                [key: string]: number;
            };
            method: {
                [key in MethodType]?: {
                    [key: string]: number;
                };
            };
            iteration: {
                [key: string]: number;
            };
            url: {
                [key: string]: number;
            };
            errorMessage: {
                [key: string]: number;
            };
        };
    } & {
        count: number;
    };
    url: {
        [key: string]: {
            count: number;
            iteration: {
                [key: string]: number;
            };
            method: {
                [key in MethodType]?: {
                    [key: string]: number;
                };
            };
            case: {
                [key in Cases]?: number;
            };
            resource: {
                [key: string]: number;
            };
            errorMessage: {
                [key: string]: number;
            };
        };
    };
    errorMessage: {
        [key: string]: {
            count: number;
            iteration: {
                [key: string]: number;
            };
            method: {
                [key in MethodType]?: {
                    [key: string]: number;
                };
            };
            case: {
                [key in Cases]?: number;
            };
            resource: {
                [key: string]: number;
            };
            url: {
                [key: string]: number;
            };
        };
    };
    method: {
        [key: string]: {
            [key: string]: {
                count: number;
                iteration: {
                    [key: string]: number;
                };
                resource: {
                    [key: string]: number;
                };
                case: {
                    [key in Cases]?: number;
                };
                url: {
                    [key: string]: number;
                };
                errorMessage: {
                    [key: string]: number;
                };
            } & {
                count: number;
            };
        };
    };
}
export interface ParsedAssertion {
    resource: string;
    iteration: number;
    pathIndex: number;
    parsedNode: ParsedNode;
    parsedPath: ParsedNode[];
    errorMessage: string;
}
export declare function parseAssertion({ ancestorTitles, title, failureMessages, }: AssertionResult): ParsedAssertion;
export declare function parseAssertions(input: AssertionResult[]): ParsedAssertions;
