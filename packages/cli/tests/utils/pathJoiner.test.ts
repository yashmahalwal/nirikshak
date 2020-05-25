import { PathJoiner } from "../../src/utils/pathJoiner";
import path from "path";

// To account for multiple calls to the api or to account for randomness
const iterationCount = 50;
const samplePaths = [
    "/home/files/content",
    "../src.json",
    "./tests/main.fileName",
    "rootDir",
];

const getRandomPath = () =>
    samplePaths[Math.floor(Math.random() * samplePaths.length)];

describe("Path joiner", () => {
    test("Only a single instance exists", async () => {
        const j = new PathJoiner();

        for (let i = 0; i < iterationCount; i++)
            expect(new PathJoiner()).toEqual(j);
    });

    test("Correctly joins two paths", async () => {
        const j = new PathJoiner();

        for (let i = 0; i < iterationCount; i++) {
            const p1 = getRandomPath();
            const p2 = getRandomPath();

            expect(j.join(p1, p2)).toEqual(path.join(p1, p2));
        }
    });

    test("Correctly composes paths by multiple calls", async () => {
        const j = new PathJoiner();

        for (let i = 0; i < iterationCount; i++) {
            const p1 = getRandomPath();
            const p2 = getRandomPath();
            const p3 = getRandomPath();
            const p4 = getRandomPath();

            const actual = path.join(p1, p2, p3, p4);
            const c1 = j.join(p1, j.join(p2, j.join(p3, p4)));
            const c2 = j.join(p1, j.join(j.join(p2, p3), p4));
            const c3 = j.join(j.join(p1, p2), j.join(p3, p4));
            const c4 = j.join(j.join(j.join(p1, p2), p3), p4);

            expect(c1).toEqual(actual);
            expect(c2).toEqual(actual);
            expect(c3).toEqual(actual);
            expect(c4).toEqual(actual);
        }
    });

    test("Effeciently caches the values", async () => {
        const j = new PathJoiner();
        const p1 = getRandomPath();
        const p2 = getRandomPath();

        const start1 = Date.now();
        for (let i = 0; i < iterationCount; i++) path.join(p1, p2);
        const end1 = Date.now();
        const start2 = Date.now();
        for (let i = 0; i < iterationCount; i++) j.join(p1, p2);
        const end2 = Date.now();

        expect(end1 - start1).toBeGreaterThanOrEqual(end2 - start2);
    });
});
