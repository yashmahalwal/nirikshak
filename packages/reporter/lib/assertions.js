"use strict";
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
exports.parseAssertions = exports.parseAssertion = void 0;
var core_1 = require("@nirikshak/core");
var lodash_1 = __importDefault(require("lodash"));
var getGroups_1 = require("./getGroups");
function parseAssertion(_a) {
    var e_1, _b;
    var ancestorTitles = _a.ancestorTitles, title = _a.title, failureMessages = _a.failureMessages;
    if (ancestorTitles.length !== 3)
        throw new Error("Invalid test result format: More than 3 ancestor titles. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter");
    var _c = __read(ancestorTitles, 3), resource = _c[0], index = _c[1], path = _c[2];
    if (Number.isNaN(parseFloat(index)))
        throw new Error("Invalid test result format: Method entry index is not a number. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter");
    var steps = path.split("--");
    var parsedPath = [];
    try {
        for (var steps_1 = __values(steps), steps_1_1 = steps_1.next(); !steps_1_1.done; steps_1_1 = steps_1.next()) {
            var step = steps_1_1.value;
            if (!core_1.isNodeName(step))
                throw new Error("Invalid test result format: Path entry is not a valid graph node. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter");
            else
                parsedPath.push(core_1.parseNodeName(step));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (steps_1_1 && !steps_1_1.done && (_b = steps_1.return)) _b.call(steps_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var _d = __read(title.split("::"), 2), indexString = _d[0], node = _d[1];
    if (Number.isNaN(parseInt(indexString)))
        throw new Error("Invalid test result format: Entry index in path is not a number. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter");
    if (!core_1.isNodeName(node))
        throw new Error("Invalid test result format: Title does not contain a valid graph node. This might happen if a non-nirikshak generated test case is run. Please skip those tests or disable this reporter");
    var parsedNode = core_1.parseNodeName(node);
    var errorMessage = "";
    if (typeof failureMessages[0] === "string") {
        var _e = __read(failureMessages[0].split("\n    at Object"), 1), err = _e[0];
        errorMessage = err.replace("Error:", "").trim();
    }
    return {
        parsedNode: parsedNode,
        parsedPath: parsedPath,
        pathIndex: parseInt(indexString),
        iteration: parseInt(index),
        resource: resource,
        errorMessage: errorMessage,
    };
}
exports.parseAssertion = parseAssertion;
function incrementKey(o, predecessor, suffixKeys) {
    var key = suffixKeys.length
        ? predecessor + "." + suffixKeys.join(".")
        : predecessor;
    lodash_1.default.set(o, key, lodash_1.default.has(o, key) ? lodash_1.default.get(o, key) + 1 : 1);
}
function parseAssertions(input) {
    var e_2, _a;
    var parsedAssertions = input.map(function (i) { return parseAssertion(i); });
    var o = {};
    try {
        for (var parsedAssertions_1 = __values(parsedAssertions), parsedAssertions_1_1 = parsedAssertions_1.next(); !parsedAssertions_1_1.done; parsedAssertions_1_1 = parsedAssertions_1.next()) {
            var assertion = parsedAssertions_1_1.value;
            getGroups_1.getGroups(assertion).forEach(function (_a) {
                var predecessor = _a.predecessor, suffixKey = _a.suffixKey;
                return incrementKey(o, predecessor, suffixKey);
            });
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (parsedAssertions_1_1 && !parsedAssertions_1_1.done && (_a = parsedAssertions_1.return)) _a.call(parsedAssertions_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return o;
}
exports.parseAssertions = parseAssertions;
//# sourceMappingURL=assertions.js.map