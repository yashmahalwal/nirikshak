import { URLString, isURLString } from "../types/urlString";
import { Inputs, MethodType, Outputs, Cases } from "..";
import _ from "lodash";
import { isMethodType, isCaseType } from "../types/helpers";

export type NodeName = string;

export function isNodeName(str: string): str is NodeName {
    const parts = str.split("-");
    return (
        parts.length === 5 &&
        isMethodType(parts[0]) &&
        typeof parts[1] === "number" &&
        isURLString(parts[2]) &&
        isCaseType(parts[3]) &&
        typeof parts[4] === "number"
    );
}

export interface NodeEntry {
    url: URLString;
    input: Inputs[MethodType];
    output: Exclude<Outputs[MethodType][keyof Outputs[MethodType]], Array<any>>;
}

export interface ParsedNode {
    method: MethodType;
    methodIndex: number;
    url: URLString;
    caseValue: Cases;
    caseIndex: number;
}

function serializeNodeNameBase(
    method: MethodType,
    methodIndex: number,
    url: URLString,
    caseValue: Cases,
    caseIndex: number
): NodeName {
    return `${method}-${methodIndex}-${url}-${caseValue}-${caseIndex}`;
}

function parseNodeNameBase(str: NodeName): ParsedNode {
    const parts = str.split("-");
    return {
        method: parts[0],
        methodIndex: parseInt(parts[1]),
        url: parts[2],
        caseValue: parts[3],
        caseIndex: parseInt(parts[4]),
    } as ParsedNode;
}

export const serializeNodeName = _.memoize(serializeNodeNameBase);
export const parseNodeName = _.memoize(parseNodeNameBase);
export type NodeMap = Map<NodeName, NodeEntry>;
