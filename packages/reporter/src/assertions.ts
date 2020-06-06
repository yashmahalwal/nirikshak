import { AssertionResult } from "@jest/test-result";
import { isNodeName, ParsedNode, parseNodeName } from "@nirikshak/core";
import _ from "lodash";
export interface ParsedAssertions {
    resource: { [key: string]: number };
    iteration: { [key: number]: number };
    stepIndex: { [key: number]: number };
    method: { [key: string]: number };
    methodEntry: { [key: string]: number };
    caseValue: { [key: string]: number };
    url: { [key: string]: number };
    errorMessage: { [key: string]: number };
}
interface ParsedAssertion {
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
    suffixKey: string | number
): void {
    const key = `${predecessor}.${suffixKey}`;
    _.set(o, key, _.has(o, key) ? _.get(o, key) + 1 : 1);
}

export function parseAssertions(input: AssertionResult[]): ParsedAssertions {
    const parsedAssertions = input.map((i) => parseAssertion(i));
    const o: ParsedAssertions = {
        resource: {},
        iteration: {},
        caseValue: {},
        method: {},
        methodEntry: {},
        stepIndex: {},
        url: {},
        errorMessage: {},
    };

    for (const assertion of parsedAssertions) {
        [
            { predecessor: "resource", suffixKey: assertion["resource"] },
            { predecessor: "iteration", suffixKey: assertion["iteration"] },
            { predecessor: "stepIndex", suffixKey: assertion["pathIndex"] },
            {
                predecessor: "method",
                suffixKey: assertion["parsedNode"]["method"],
            },
            {
                predecessor: "url",
                suffixKey: assertion["parsedNode"]["url"],
            },
            {
                predecessor: "methodEntry",
                suffixKey:
                    assertion["parsedNode"]["method"] +
                    `-` +
                    assertion["parsedNode"]["methodIndex"],
            },
            {
                predecessor: "caseValue",
                suffixKey: assertion["parsedNode"]["caseValue"],
            },
        ].forEach(({ predecessor, suffixKey }) =>
            incrementKey(o, predecessor, suffixKey)
        );

        if (assertion.errorMessage.length) {
            void assertion.errorMessage;
            incrementKey(o, "errorMessage", assertion["errorMessage"]);
        }
    }

    return o;
}
