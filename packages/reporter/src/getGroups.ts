import { ParsedAssertion } from "./assertions";

export const getGroups = (
    assertion: ParsedAssertion
): Array<{ predecessor: string; suffixKey: string[] }> => {
    const o = [
        { predecessor: "resource", suffixKey: [assertion["resource"]] },
        {
            predecessor: "iteration",
            suffixKey: [`${`${assertion["iteration"]} `} `],
        },
        {
            predecessor: "stepIndex",
            suffixKey: [`${`${assertion["pathIndex"]} `} `],
        },
        {
            predecessor: "method",
            suffixKey: [assertion["parsedNode"]["method"]],
        },
        {
            predecessor: "url",
            suffixKey: [assertion["parsedNode"]["url"]],
        },
        {
            predecessor: "caseValue",
            suffixKey: [assertion["parsedNode"]["caseValue"]],
        },
        { predecessor: "errorMessage", suffixKey: [assertion["errorMessage"]] },
        {
            predecessor: "resourceIteration",
            suffixKey: [assertion["resource"], `${assertion["iteration"]} `],
        },
        {
            predecessor: "resourceErrorMessage",
            suffixKey: [assertion["resource"], assertion["errorMessage"]],
        },
        {
            predecessor: "resourceMethod",
            suffixKey: [
                assertion["resource"],
                assertion["parsedNode"]["method"],
            ],
        },
        {
            predecessor: "resourceCaseValue",
            suffixKey: [
                assertion["resource"],
                assertion["parsedNode"]["caseValue"],
            ],
        },

        {
            predecessor: "resourceUrl",
            suffixKey: [assertion["resource"], assertion["parsedNode"]["url"]],
        },
        {
            predecessor: "methodIteration",
            suffixKey: [
                assertion["parsedNode"]["method"],
                `${assertion["iteration"]} `,
            ],
        },
        {
            predecessor: "methodCaseValue",
            suffixKey: [
                assertion["parsedNode"]["method"],
                assertion["parsedNode"]["caseValue"],
            ],
        },
        {
            predecessor: "methodUrl",
            suffixKey: [
                assertion["parsedNode"]["method"],
                assertion["parsedNode"]["url"],
            ],
        },
        {
            predecessor: "methodMethodIndex",
            suffixKey: [
                assertion["parsedNode"]["method"],
                `${assertion["parsedNode"]["methodIndex"]} `,
            ],
        },
        {
            predecessor: "methodErrorMessage",
            suffixKey: [
                assertion["parsedNode"]["method"],
                assertion["errorMessage"],
            ],
        },
        {
            predecessor: "caseUrl",
            suffixKey: [
                assertion["parsedNode"]["caseValue"],
                assertion["parsedNode"]["url"],
            ],
        },
        {
            predecessor: "caseErrorMessage",
            suffixKey: [
                assertion["parsedNode"]["caseValue"],
                assertion["errorMessage"],
            ],
        },
        {
            predecessor: "resourceMethodMethodIndex",
            suffixKey: [
                assertion["resource"],
                assertion["parsedNode"]["method"],
                `${assertion["parsedNode"]["methodIndex"]} `,
            ],
        },
        {
            predecessor: "urlMethodMethodIndex",
            suffixKey: [
                assertion["parsedNode"]["url"],
                assertion["parsedNode"]["method"],
                `${assertion["parsedNode"]["methodIndex"]} `,
            ],
        },
        {
            predecessor: "caseMethodMethodIndex",
            suffixKey: [
                assertion["parsedNode"]["caseValue"],
                assertion["parsedNode"]["method"],
                `${assertion["parsedNode"]["methodIndex"]} `,
            ],
        },
        {
            predecessor: "resourceUrlMethodMethodIndex",
            suffixKey: [
                assertion["resource"],
                assertion["parsedNode"]["url"],
                assertion["parsedNode"]["method"],
                `${assertion["parsedNode"]["methodIndex"]} `,
            ],
        },
        {
            predecessor: "resourceCaseMethodMethodIndex",
            suffixKey: [
                assertion["resource"],
                assertion["parsedNode"]["caseValue"],
                assertion["parsedNode"]["method"],
                `${assertion["parsedNode"]["methodIndex"]} `,
            ],
        },
    ];
    return o;
};
