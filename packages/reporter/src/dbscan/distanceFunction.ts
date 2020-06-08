import { ParsedAssertion } from "../assertions";

// All distance b/w: 0-1
const HammingMap: Map<string, Map<string, number>> = new Map();

function insertToMap(s1: string, s2: string, value: number): void {
    HammingMap.has(s1)
        ? HammingMap.get(s1)!.set(s2, value)
        : HammingMap.set(s1, new Map([[s2, value]]));
    HammingMap.has(s2)
        ? HammingMap.get(s2)!.set(s1, value)
        : HammingMap.set(s2, new Map([[s1, value]]));
}

function hamming(s1: string, s2: string): number {
    const mapEntry = HammingMap.get(s1)?.get(s2);
    if (mapEntry) return mapEntry;

    const max = Math.max(s1.length, s2.length);
    s1 = s1.padEnd(max);
    s2 = s2.padEnd(max);

    let res = 0;
    for (let i = 0; i < max; i++) if (s1[i] !== s2[i]) res++;

    const value = res / max;
    insertToMap(s1, s2, value);
    return value;
}

function methodDistance(a: ParsedAssertion, b: ParsedAssertion): number {
    let distance = 0;
    // Method has 80% weightage
    a.parsedNode.method !== b.parsedNode.method && (distance += 0.8);
    // Exact entry has 20% weightage
    a.parsedNode.methodIndex !== b.parsedNode.methodIndex && (distance += 0.2);
    return distance;
}

function resourceDistance(a: ParsedAssertion, b: ParsedAssertion): number {
    return a.resource !== b.resource ? 1 : 0;
}

function caseDistance(a: ParsedAssertion, b: ParsedAssertion): number {
    return a.parsedNode.caseValue !== b.parsedNode.caseValue ? 1 : 0;
}

function errorDistance(
    { errorMessage: errorA }: ParsedAssertion,
    { errorMessage: errorB }: ParsedAssertion
): number {
    const value = HammingMap.get(errorA)?.get(errorB);
    if (value) return value;

    if (
        !errorA.startsWith("Status mismatch") ||
        !errorB.startsWith("Status mismatch")
    )
        return hamming(errorA, errorB);

    function statusDistance(statusA: string, statusB: string): number {
        return statusA !== statusB ? (statusA[0] === statusB[0] ? 0.5 : 1) : 0;
    }

    function extractRecieved(str: string): { expected: string[]; got: string } {
        // "Status mismatch: Expected 409,200,201,202,210 got 400"
        const [expectedStr, got] = str.slice(26).split(" got ");
        const expected = expectedStr.split(",");

        return { expected, got };
    }

    function compareExpected(expectedA: string[], expectedB: string[]): number {
        const [small, large] =
            expectedA.length < expectedB.length
                ? [expectedA, expectedB]
                : [expectedB, expectedA];

        let distance = 0;
        for (const entry1 of small) {
            let min = 1;
            for (const entry2 of large) {
                min = Math.min(min, statusDistance(entry1, entry2));
            }

            distance += min;
        }
        return small.length
            ? distance / small.length
            : small.length === large.length
            ? 1
            : 0;
    }

    let distance = 0;
    const { expected: expectedA, got: gotA } = extractRecieved(errorA);
    const { expected: expectedB, got: gotB } = extractRecieved(errorB);

    distance += statusDistance(gotA, gotB) / 2;
    distance += compareExpected(expectedA, expectedB) / 2;
    insertToMap(errorA, errorB, distance);
    return distance;
}

export function distance(a: ParsedAssertion, b: ParsedAssertion): number {
    let distance = 0;
    distance += methodDistance(a, b) * 2;
    distance += resourceDistance(a, b);
    distance += hamming(a.parsedNode.url, b.parsedNode.url);
    distance += caseDistance(a, b) * 2;
    distance += errorDistance(a, b) * 2;
    return distance / 8;
}
