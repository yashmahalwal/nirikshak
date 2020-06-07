import { AssertionResult } from "@jest/test-result";
import {
    isNodeName,
    ParsedNode,
    parseNodeName,
    MethodType,
    Cases,
} from "@nirikshak/core";
import _ from "lodash";
import { getGroups } from "./getGroups";
export interface ParsedAssertions {
    resource: { [key: string]: number };
    iteration: { [key: string]: number };
    stepIndex: { [key: string]: number };
    method: { [key in MethodType]?: number };
    caseValue: { [key in Cases]?: number };
    url: { [key: string]: number };
    errorMessage: { [key: string]: number };
    resourceIteration: { [key: string]: { [key: string]: number } };
    resourceErrorMessage: { [key: string]: { [key: string]: number } };
    resourceMethod: { [key: string]: { [key in MethodType]: number } };
    resourceCaseValue: { [key: string]: { [key: string]: number } };
    resourceUrl: { [key: string]: { [key: string]: number } };
    methodCaseValue: {
        [key in MethodType]?: {
            [key in Cases]?: number;
        };
    };
    methodIteration: {
        [key in MethodType]?: {
            [key: string]: number;
        };
    };
    methodUrl: {
        [key in MethodType]?: {
            [key: string]: number;
        };
    };
    methodErrorMessage: {
        [key in MethodType]?: {
            [key: string]: number;
        };
    };
    methodMethodIndex: {
        [key in MethodType]?: {
            [key: string]: number;
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

export function parseAssertion({
    ancestorTitles,
    title,
    failureMessages,
}: AssertionResult): ParsedAssertion {
    if (ancestorTitles.length !== 3)
        throw new Error(
            `Invalid test result format: More than 3 ancestor titles. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter`
        );

    const [resource, index, path] = ancestorTitles;
    if (Number.isNaN(parseFloat(index)))
        throw new Error(
            `Invalid test result format: Method entry index is not a number. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter`
        );

    const steps = path.split("--");
    const parsedPath: ParsedNode[] = [];
    for (const step of steps)
        if (!isNodeName(step))
            throw new Error(
                `Invalid test result format: Path entry is not a valid graph node. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter`
            );
        else parsedPath.push(parseNodeName(step));
    const [indexString, node] = title.split("::");
    if (Number.isNaN(parseInt(indexString)))
        throw new Error(
            `Invalid test result format: Entry index in path is not a number. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter`
        );
    if (!isNodeName(node))
        throw new Error(
            `Invalid test result format: Title does not contain a valid graph node. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter`
        );

    const parsedNode = parseNodeName(node);
    let errorMessage = "";

    if (typeof failureMessages[0] === "string") {
        const [err] = failureMessages[0].split("\n    at Object");
        errorMessage = err.replace("Error:", "").trim();
    }

    return {
        parsedNode,
        parsedPath,
        pathIndex: parseInt(indexString),
        iteration: parseInt(index),
        resource,
        errorMessage,
    };
}

function incrementKey(
    o: object,
    predecessor: string,
    suffixKeys: (string | number)[]
): void {
    const key = `${predecessor}.${suffixKeys.join(".")}`;
    _.set(o, key, _.has(o, key) ? _.get(o, key) + 1 : 1);
}

export function parseAssertions(input: AssertionResult[]): ParsedAssertions {
    const parsedAssertions = input.map((i) => parseAssertion(i));
    const o: object = {};

    for (const assertion of parsedAssertions) {
        getGroups(assertion).forEach(({ predecessor, suffixKey }) =>
            incrementKey(o, predecessor, suffixKey)
        );

        if (assertion.errorMessage.length) {
            void assertion.errorMessage;
            incrementKey(o, "errorMessage", [assertion["errorMessage"]]);
        }
    }

    return o as ParsedAssertions;
}
