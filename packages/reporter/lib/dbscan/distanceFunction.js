"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = exports.errorDistance = exports.caseDistance = exports.resourceDistance = exports.methodDistance = exports.hamming = void 0;
// All distance b/w: 0-1
const HammingMap = new Map();
function insertToMap(map, s1, s2, value) {
    map.has(s1)
        ? map.get(s1).set(s2, value)
        : map.set(s1, new Map([[s2, value]]));
    map.has(s2)
        ? map.get(s2).set(s1, value)
        : map.set(s2, new Map([[s1, value]]));
}
function hamming(s1, s2) {
    var _a;
    const max = Math.max(s1.length, s2.length);
    s1 = s1.padEnd(max);
    s2 = s2.padEnd(max);
    const mapEntry = (_a = HammingMap.get(s1)) === null || _a === void 0 ? void 0 : _a.get(s2);
    if (mapEntry !== undefined)
        return mapEntry;
    let res = 0;
    for (let i = 0; i < max; i++)
        if (s1[i] !== s2[i])
            res++;
    const value = res / max;
    insertToMap(HammingMap, s1, s2, value);
    return value;
}
exports.hamming = hamming;
function methodDistance(aMethod, aIndex, bMethod, bIndex) {
    let distance = 0;
    // Method has 80% weightage
    aMethod !== bMethod && (distance += 0.8);
    // Exact entry has 20% weightage
    aIndex !== bIndex && (distance += 0.2);
    return distance;
}
exports.methodDistance = methodDistance;
function resourceDistance(a, b) {
    return a !== b ? 1 : 0;
}
exports.resourceDistance = resourceDistance;
function caseDistance(a, b) {
    return a !== b ? 1 : 0;
}
exports.caseDistance = caseDistance;
const statusErrorMap = new Map();
function errorDistance(errorA, errorB) {
    var _a;
    if (!errorA.startsWith("Status mismatch") ||
        !errorB.startsWith("Status mismatch"))
        return hamming(errorA, errorB);
    const value = (_a = statusErrorMap.get(errorA)) === null || _a === void 0 ? void 0 : _a.get(errorB);
    if (value !== undefined)
        return value;
    function statusDistance(statusA, statusB) {
        return statusA !== statusB ? (statusA[0] === statusB[0] ? 0.5 : 1) : 0;
    }
    function extractRecieved(str) {
        // "Status mismatch: Expected 409,200,201,202,210 got 400"
        const [expectedStr, got] = str.slice(26).split(" got ");
        const expected = expectedStr.split(",");
        return { expected, got };
    }
    function compareExpected(expectedA, expectedB) {
        const [small, large] = expectedA.length < expectedB.length
            ? [expectedA, expectedB]
            : [expectedB, expectedA];
        let distance = 0;
        for (const entry1 of small) {
            let min = 1;
            for (const entry2 of large) {
                min = Math.min(min, statusDistance(entry1, entry2));
                if (min === 0)
                    break;
            }
            distance += min;
        }
        return distance / small.length;
    }
    let distance = 0;
    const { expected: expectedA, got: gotA } = extractRecieved(errorA);
    const { expected: expectedB, got: gotB } = extractRecieved(errorB);
    distance += statusDistance(gotA, gotB) / 2;
    distance += compareExpected(expectedA, expectedB) / 2;
    insertToMap(statusErrorMap, errorA, errorB, distance);
    return distance;
}
exports.errorDistance = errorDistance;
function distance(a, b) {
    let distance = 0;
    distance +=
        methodDistance(a.method, a.methodIndex, b.method, b.methodIndex) * 2;
    distance += resourceDistance(a.resource, b.resource);
    distance += hamming(a.url.slice(1), b.url.slice(1));
    distance += caseDistance(a.caseValue, b.caseValue) * 2;
    distance += errorDistance(a.errorMessage, b.errorMessage) * 2;
    return distance / 8;
}
exports.distance = distance;
//# sourceMappingURL=distanceFunction.js.map