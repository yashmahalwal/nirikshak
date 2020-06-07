import { ParsedAssertion } from "./assertions";
export declare const getGroups: (assertion: ParsedAssertion) => Array<{
    predecessor: string;
    suffixKey: string[];
}>;
