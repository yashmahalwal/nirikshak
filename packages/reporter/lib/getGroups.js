"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroups = void 0;
exports.getGroups = function (assertion) {
    var o = [
        // Resource
        {
            predecessor: "resource." + assertion["resource"] + ".count",
            suffixKey: [],
        },
        {
            predecessor: "resource." + assertion["resource"] + ".iteration",
            suffixKey: [assertion["iteration"] + " "],
        },
        {
            predecessor: "resource." + assertion["resource"] + ".method",
            suffixKey: [
                assertion["parsedNode"]["method"],
                assertion["parsedNode"]["methodIndex"] + " ",
            ],
        },
        {
            predecessor: "resource." + assertion["resource"] + ".case",
            suffixKey: [assertion["parsedNode"]["caseValue"]],
        },
        {
            predecessor: "resource." + assertion["resource"] + ".url",
            suffixKey: [assertion["parsedNode"]["url"]],
        },
        {
            predecessor: "resource." + assertion["resource"] + ".errorMessage",
            suffixKey: [assertion["errorMessage"]],
        },
        // Iteration
        {
            predecessor: "iteration." + (assertion["iteration"] + " ") + ".count",
            suffixKey: [],
        },
        {
            predecessor: "iteration." + (assertion["iteration"] + " ") + ".resource",
            suffixKey: [assertion["resource"]],
        },
        {
            predecessor: "iteration." + (assertion["iteration"] + " ") + ".method",
            suffixKey: [
                assertion["parsedNode"]["method"],
                assertion["parsedNode"]["methodIndex"] + " ",
            ],
        },
        {
            predecessor: "iteration." + (assertion["iteration"] + " ") + ".case",
            suffixKey: [assertion["parsedNode"]["caseValue"]],
        },
        {
            predecessor: "iteration." + (assertion["iteration"] + " ") + ".url",
            suffixKey: [assertion["parsedNode"]["url"]],
        },
        {
            predecessor: "iteration." + (assertion["iteration"] + " ") + ".errorMessage",
            suffixKey: [assertion["errorMessage"]],
        },
        // Case
        {
            predecessor: "case." + assertion["parsedNode"]["caseValue"] + ".count",
            suffixKey: [],
        },
        {
            predecessor: "case." + assertion["parsedNode"]["caseValue"] + ".iteration",
            suffixKey: [assertion["iteration"] + " "],
        },
        {
            predecessor: "case." + assertion["parsedNode"]["caseValue"] + ".method",
            suffixKey: [
                assertion["parsedNode"]["method"],
                assertion["parsedNode"]["methodIndex"] + " ",
            ],
        },
        {
            predecessor: "case." + assertion["parsedNode"]["caseValue"] + ".resource",
            suffixKey: [assertion["resource"]],
        },
        {
            predecessor: "case." + assertion["parsedNode"]["caseValue"] + ".url",
            suffixKey: [assertion["parsedNode"]["url"]],
        },
        {
            predecessor: "case." +
                assertion["parsedNode"]["caseValue"] +
                ".errorMessage",
            suffixKey: [assertion["errorMessage"]],
        },
        // url
        {
            predecessor: "url." + assertion["parsedNode"]["url"] + ".count",
            suffixKey: [],
        },
        {
            predecessor: "url." + assertion["parsedNode"]["url"] + ".iteration",
            suffixKey: [assertion["iteration"] + " "],
        },
        {
            predecessor: "url." + assertion["parsedNode"]["url"] + ".method",
            suffixKey: [
                assertion["parsedNode"]["method"],
                assertion["parsedNode"]["methodIndex"] + " ",
            ],
        },
        {
            predecessor: "url." + assertion["parsedNode"]["url"] + ".case",
            suffixKey: [assertion["parsedNode"]["caseValue"]],
        },
        {
            predecessor: "url." + assertion["parsedNode"]["url"] + ".resource",
            suffixKey: [assertion["resource"]],
        },
        {
            predecessor: "url." + assertion["parsedNode"]["url"] + ".errorMessage",
            suffixKey: [assertion["errorMessage"]],
        },
        // Error Message
        {
            predecessor: "errorMessage." + assertion["errorMessage"] + ".count",
            suffixKey: [],
        },
        {
            predecessor: "errorMessage." + assertion["errorMessage"] + ".iteration",
            suffixKey: [assertion["iteration"] + " "],
        },
        {
            predecessor: "errorMessage." + assertion["errorMessage"] + ".method",
            suffixKey: [
                assertion["parsedNode"]["method"],
                assertion["parsedNode"]["methodIndex"] + " ",
            ],
        },
        {
            predecessor: "errorMessage." + assertion["errorMessage"] + ".case",
            suffixKey: [assertion["parsedNode"]["caseValue"]],
        },
        {
            predecessor: "errorMessage." + assertion["errorMessage"] + ".url",
            suffixKey: [assertion["parsedNode"]["url"]],
        },
        {
            predecessor: "errorMessage." + assertion["errorMessage"] + ".resource",
            suffixKey: [assertion["resource"]],
        },
        // Method
        {
            predecessor: "method." + assertion["parsedNode"]["method"] + ".count",
            suffixKey: [],
        },
        {
            predecessor: "method." +
                assertion["parsedNode"]["method"] +
                "." +
                (assertion["parsedNode"]["methodIndex"] + " ") +
                ".iteration",
            suffixKey: [assertion["iteration"] + " "],
        },
        {
            predecessor: "method." +
                assertion["parsedNode"]["method"] +
                "." +
                (assertion["parsedNode"]["methodIndex"] + " ") +
                ".iteration",
            suffixKey: [assertion["iteration"] + " "],
        },
        {
            predecessor: "method." +
                assertion["parsedNode"]["method"] +
                "." +
                (assertion["parsedNode"]["methodIndex"] + " ") +
                ".resource",
            suffixKey: [assertion["resource"]],
        },
        {
            predecessor: "method." +
                assertion["parsedNode"]["method"] +
                "." +
                (assertion["parsedNode"]["methodIndex"] + " ") +
                ".case",
            suffixKey: [assertion["parsedNode"]["caseValue"]],
        },
        {
            predecessor: "method." +
                assertion["parsedNode"]["method"] +
                "." +
                (assertion["parsedNode"]["methodIndex"] + " ") +
                ".url",
            suffixKey: [assertion["parsedNode"]["url"]],
        },
        {
            predecessor: "method." +
                assertion["parsedNode"]["method"] +
                "." +
                (assertion["parsedNode"]["methodIndex"] + " ") +
                ".errorMessage",
            suffixKey: [assertion["errorMessage"]],
        },
    ];
    return o;
};
//# sourceMappingURL=getGroups.js.map