import { URLString, isURLString } from "../types/urlString";
import { MethodType, Cases } from "..";
import { isMethodType, isCaseType, BodyType } from "../types/helpers";
import { HeaderAndStatus } from "../types";
import { InputSemantics, InputBodies } from "../types/input";

export type NodeName = string;

export function isNodeName(str: any): str is NodeName {
    if (typeof str !== "string") return false;

    const parts = str.split(";;");
    return (
        parts.length === 5 &&
        isMethodType(parts[0]) &&
        !isNaN(parseInt(parts[1])) &&
        isURLString(parts[2]) &&
        isCaseType(parts[3]) &&
        !isNaN(parseInt(parts[4]))
    );
}

export interface NodeEntry {
    url: URLString;
    input: InputSemantics & Partial<InputBodies>;
    output: {
        semantics: HeaderAndStatus;
        body?: BodyType;
    };
}

export interface ParsedNode {
    method: MethodType;
    methodIndex: number;
    url: URLString;
    caseValue: Cases;
    caseIndex: number;
}

export function serializeNodeName(
    method: MethodType,
    methodIndex: number,
    url: URLString,
    caseValue: Cases,
    caseIndex: number
): NodeName {
    return `${method};;${methodIndex};;${url};;${caseValue};;${caseIndex}`;
}

export function parseNodeName(str: NodeName): ParsedNode {
    const parts = str.split(";;");
    return {
        method: parts[0],
        methodIndex: parseInt(parts[1]),
        url: parts[2],
        caseValue: parts[3],
        caseIndex: parseInt(parts[4]),
    } as ParsedNode;
}

export type NodeMap = Map<NodeName, NodeEntry>;
