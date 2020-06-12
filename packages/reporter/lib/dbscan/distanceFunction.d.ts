import { ParsedAssertion } from "../assertions";
import { Cases, MethodType } from "@nirikshak/core";
export declare function hamming(s1: string, s2: string): number;
export declare function methodDistance(aMethod: MethodType, aIndex: number, bMethod: MethodType, bIndex: number): number;
export declare function resourceDistance(a: string, b: string): number;
export declare function caseDistance(a: Cases, b: Cases): number;
export declare function errorDistance(errorA: string, errorB: string): number;
export declare function distance(a: ParsedAssertion, b: ParsedAssertion): number;
