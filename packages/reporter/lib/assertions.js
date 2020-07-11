"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAssertions = exports.insertIntoAssertion = exports.parseAssertion = void 0;
const lodash_1 = __importDefault(require("lodash"));
const core_1 = require("@nirikshak/core");
function parseAssertion({ ancestorTitles, title, failureMessages, }) {
    var _a, _b;
    if (ancestorTitles.length !== 3)
        throw new Error(`Invalid test result format: More than 3 ancestor titles. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter`);
    const [resource, index] = ancestorTitles;
    if (Number.isNaN(parseFloat(index)))
        throw new Error(`Invalid test result format: Method entry index is not a number. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter`);
    const [indexString, node] = title.split("::");
    if (Number.isNaN(parseInt(indexString)))
        throw new Error(`Invalid test result format: Entry index in path is not a number. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter`);
    if (!core_1.isNodeName(node))
        throw new Error(`Invalid test result format: Title does not contain a valid graph node. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter`);
    const parsedNode = core_1.parseNodeName(node);
    const [err] = (_b = (_a = failureMessages[0]) === null || _a === void 0 ? void 0 : _a.split("\n    at Object")) !== null && _b !== void 0 ? _b : [""];
    const errorMessage = err.replace("Error:", "").trim();
    return Object.assign(Object.assign({}, parsedNode), { pathIndex: parseInt(indexString), iteration: parseInt(index), resource,
        errorMessage });
}
exports.parseAssertion = parseAssertion;
function insertIntoAssertion(o, assertion) {
    const entries = [
        { title: "resource", value: lodash_1.default.get(assertion, "resource") },
        { title: "iteration", value: lodash_1.default.get(assertion, "iteration") + " " },
        { title: "case", value: lodash_1.default.get(assertion, "caseValue") },
        { title: "url", value: lodash_1.default.get(assertion, "url") },
        { title: "error-message", value: lodash_1.default.get(assertion, "errorMessage") },
        {
            title: "method",
            value: lodash_1.default.get(assertion, "method") +
                "-" +
                lodash_1.default.get(assertion, "methodIndex"),
        },
    ];
    for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
        const assertionEntry = o[entryIndex];
        let childrenIndex = assertionEntry.children.findIndex((c) => c.name === entries[entryIndex].value);
        if (childrenIndex === -1) {
            childrenIndex = assertionEntry.children.length;
            assertionEntry.children.push({
                name: entries[entryIndex].value.toString(),
                children: [],
            });
        }
        // assertionEntry.children[childrenIndex]
        for (const target of entries) {
            if (target.title === entries[entryIndex].title)
                continue;
            let innerIndex = assertionEntry.children[childrenIndex].children.findIndex((x) => x.name === target.title);
            if (innerIndex === -1) {
                innerIndex =
                    assertionEntry.children[childrenIndex].children.length;
                assertionEntry.children[childrenIndex].children.push({
                    name: target.title,
                    children: [],
                });
            }
            let finalIndex = assertionEntry.children[childrenIndex].children[innerIndex].children.findIndex((y) => y.name === target.value);
            if (finalIndex === -1) {
                finalIndex =
                    assertionEntry.children[childrenIndex].children[innerIndex]
                        .children.length;
                assertionEntry.children[childrenIndex].children[innerIndex].children.push({
                    name: target.value.toString(),
                    value: 0,
                });
            }
            assertionEntry.children[childrenIndex].children[innerIndex]
                .children[finalIndex].value++;
        }
    }
}
exports.insertIntoAssertion = insertIntoAssertion;
function parseAssertions(parsedAssertionArray) {
    const o = [
        { name: "resource", children: [] },
        { name: "iteration", children: [] },
        { name: "case", children: [] },
        { name: "url", children: [] },
        { name: "error-message", children: [] },
        { name: "method", children: [] },
    ];
    for (const assertion of parsedAssertionArray)
        insertIntoAssertion(o, assertion);
    return o;
}
exports.parseAssertions = parseAssertions;
//# sourceMappingURL=assertions.js.map