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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResults = void 0;
var assertions_1 = require("./assertions");
function parseResults(result) {
    var e_1, _a, e_2, _b;
    var o = {
        total: result.numTotalTests,
        passed: result.numPassedTests,
        failed: result.numFailedTests,
        success: true,
    };
    if (!result.success) {
        var assertions = [];
        try {
            for (var _c = __values(result.testResults), _d = _c.next(); !_d.done; _d = _c.next()) {
                var testResults = _d.value.testResults;
                try {
                    for (var testResults_1 = (e_2 = void 0, __values(testResults)), testResults_1_1 = testResults_1.next(); !testResults_1_1.done; testResults_1_1 = testResults_1.next()) {
                        var assertion = testResults_1_1.value;
                        if (assertion.status === "failed")
                            assertions.push(assertion);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (testResults_1_1 && !testResults_1_1.done && (_b = testResults_1.return)) _b.call(testResults_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        o = __assign(__assign({}, o), { success: false, assertionResult: assertions_1.parseAssertions(assertions) });
    }
    return o;
}
exports.parseResults = parseResults;
//# sourceMappingURL=parseTest.js.map