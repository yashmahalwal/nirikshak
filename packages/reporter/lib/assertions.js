"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAssertions = exports.insertIntoAssertion = exports.parseAssertion = void 0;
var lodash_1 = __importDefault(require("lodash"));
var core_1 = require("@nirikshak/core");
function parseAssertion(_a) {
    var ancestorTitles = _a.ancestorTitles, title = _a.title, failureMessages = _a.failureMessages;
    if (ancestorTitles.length !== 3)
        throw new Error("Invalid test result format: More than 3 ancestor titles. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter");
    var _b = __read(ancestorTitles, 2), resource = _b[0], index = _b[1];
    if (Number.isNaN(parseFloat(index)))
        throw new Error("Invalid test result format: Method entry index is not a number. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter");
    var _c = __read(title.split("::"), 2), indexString = _c[0], node = _c[1];
    if (Number.isNaN(parseInt(indexString)))
        throw new Error("Invalid test result format: Entry index in path is not a number. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter");
    if (!core_1.isNodeName(node))
        throw new Error("Invalid test result format: Title does not contain a valid graph node. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter");
    var parsedNode = core_1.parseNodeName(node);
    var errorMessage = "";
    if (typeof failureMessages[0] === "string") {
        var _d = __read(failureMessages[0].split("\n    at Object"), 1), err = _d[0];
        errorMessage = err.replace("Error:", "").trim();
    }
    return __assign(__assign({}, parsedNode), { pathIndex: parseInt(indexString), iteration: parseInt(index), resource: resource,
        errorMessage: errorMessage });
}
exports.parseAssertion = parseAssertion;
function insertIntoAssertion(o, assertion) {
    var entries = [
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
    var _loop_1 = function (entryIndex) {
        var e_1, _a;
        var assertionEntry = o[entryIndex];
        var childrenIndex = assertionEntry.children.findIndex(function (c) { return c.name === entries[entryIndex].value; });
        if (childrenIndex === -1) {
            childrenIndex = assertionEntry.children.length;
            assertionEntry.children.push({
                name: entries[entryIndex].value.toString(),
                children: [],
            });
        }
        var _loop_2 = function (target) {
            if (target.title === entries[entryIndex].title)
                return "continue";
            var innerIndex = assertionEntry.children[childrenIndex].children.findIndex(function (x) { return x.name === target.title; });
            if (innerIndex === -1) {
                innerIndex =
                    assertionEntry.children[childrenIndex].children.length;
                assertionEntry.children[childrenIndex].children.push({
                    name: target.title,
                    children: [],
                });
            }
            var finalIndex = assertionEntry.children[childrenIndex].children[innerIndex].children.findIndex(function (y) { return y.name === target.value; });
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
        };
        try {
            // assertionEntry.children[childrenIndex]
            for (var entries_1 = (e_1 = void 0, __values(entries)), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var target = entries_1_1.value;
                _loop_2(target);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    for (var entryIndex = 0; entryIndex < entries.length; entryIndex++) {
        _loop_1(entryIndex);
    }
}
exports.insertIntoAssertion = insertIntoAssertion;
function parseAssertions(assertions) {
    var e_2, _a;
    var parsedAssertionArray = assertions.map(function (a) { return parseAssertion(a); });
    var o = [
        { name: "resource", children: [] },
        { name: "iteration", children: [] },
        { name: "case", children: [] },
        { name: "url", children: [] },
        { name: "error-message", children: [] },
        { name: "method", children: [] },
    ];
    try {
        for (var parsedAssertionArray_1 = __values(parsedAssertionArray), parsedAssertionArray_1_1 = parsedAssertionArray_1.next(); !parsedAssertionArray_1_1.done; parsedAssertionArray_1_1 = parsedAssertionArray_1.next()) {
            var assertion = parsedAssertionArray_1_1.value;
            insertIntoAssertion(o, assertion);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (parsedAssertionArray_1_1 && !parsedAssertionArray_1_1.done && (_a = parsedAssertionArray_1.return)) _a.call(parsedAssertionArray_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return o;
}
exports.parseAssertions = parseAssertions;
//# sourceMappingURL=assertions.js.map