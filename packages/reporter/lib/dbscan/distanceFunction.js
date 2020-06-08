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
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = void 0;
// All distance b/w: 0-1
var HammingMap = new Map();
function insertToMap(s1, s2, value) {
    HammingMap.has(s1)
        ? HammingMap.get(s1).set(s2, value)
        : HammingMap.set(s1, new Map([[s2, value]]));
    HammingMap.has(s2)
        ? HammingMap.get(s2).set(s1, value)
        : HammingMap.set(s2, new Map([[s1, value]]));
}
function hamming(s1, s2) {
    var _a;
    var mapEntry = (_a = HammingMap.get(s1)) === null || _a === void 0 ? void 0 : _a.get(s2);
    if (mapEntry)
        return mapEntry;
    var max = Math.max(s1.length, s2.length);
    s1 = s1.padEnd(max);
    s2 = s2.padEnd(max);
    var res = 0;
    for (var i = 0; i < max; i++)
        if (s1[i] !== s2[i])
            res++;
    var value = res / max;
    insertToMap(s1, s2, value);
    return value;
}
function methodDistance(a, b) {
    var distance = 0;
    // Method has 80% weightage
    a.parsedNode.method !== b.parsedNode.method && (distance += 0.8);
    // Exact entry has 20% weightage
    a.parsedNode.methodIndex !== b.parsedNode.methodIndex && (distance += 0.2);
    return distance;
}
function resourceDistance(a, b) {
    return a.resource !== b.resource ? 1 : 0;
}
function caseDistance(a, b) {
    return a.parsedNode.caseValue !== b.parsedNode.caseValue ? 1 : 0;
}
function errorDistance(_a, _b) {
    var _c;
    var errorA = _a.errorMessage;
    var errorB = _b.errorMessage;
    var value = (_c = HammingMap.get(errorA)) === null || _c === void 0 ? void 0 : _c.get(errorB);
    if (value)
        return value;
    if (!errorA.startsWith("Status mismatch") ||
        !errorB.startsWith("Status mismatch"))
        return hamming(errorA, errorB);
    function statusDistance(statusA, statusB) {
        return statusA !== statusB ? (statusA[0] === statusB[0] ? 0.5 : 1) : 0;
    }
    function extractRecieved(str) {
        // "Status mismatch: Expected 409,200,201,202,210 got 400"
        var _a = __read(str.slice(26).split(" got "), 2), expectedStr = _a[0], got = _a[1];
        var expected = expectedStr.split(",");
        return { expected: expected, got: got };
    }
    function compareExpected(expectedA, expectedB) {
        var e_1, _a, e_2, _b;
        var _c = __read(expectedA.length < expectedB.length
            ? [expectedA, expectedB]
            : [expectedB, expectedA], 2), small = _c[0], large = _c[1];
        var distance = 0;
        try {
            for (var small_1 = __values(small), small_1_1 = small_1.next(); !small_1_1.done; small_1_1 = small_1.next()) {
                var entry1 = small_1_1.value;
                var min = 1;
                try {
                    for (var large_1 = (e_2 = void 0, __values(large)), large_1_1 = large_1.next(); !large_1_1.done; large_1_1 = large_1.next()) {
                        var entry2 = large_1_1.value;
                        min = Math.min(min, statusDistance(entry1, entry2));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (large_1_1 && !large_1_1.done && (_b = large_1.return)) _b.call(large_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                distance += min;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (small_1_1 && !small_1_1.done && (_a = small_1.return)) _a.call(small_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return small.length
            ? distance / small.length
            : small.length === large.length
                ? 1
                : 0;
    }
    var distance = 0;
    var _d = extractRecieved(errorA), expectedA = _d.expected, gotA = _d.got;
    var _e = extractRecieved(errorB), expectedB = _e.expected, gotB = _e.got;
    distance += statusDistance(gotA, gotB) / 2;
    distance += compareExpected(expectedA, expectedB) / 2;
    insertToMap(errorA, errorB, distance);
    return distance;
}
function distance(a, b) {
    var distance = 0;
    distance += methodDistance(a, b) * 2;
    distance += resourceDistance(a, b);
    distance += hamming(a.parsedNode.url, b.parsedNode.url);
    distance += caseDistance(a, b) * 2;
    distance += errorDistance(a, b) * 2;
    return distance / 8;
}
exports.distance = distance;
//# sourceMappingURL=distanceFunction.js.map