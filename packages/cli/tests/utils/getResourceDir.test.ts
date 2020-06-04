import { getResourceDirectory } from "../../src/utils/getResourceDir";
import path from "path";

const configurations = [
    {
        input: { dir: "rootDir", resources: ["student", "faculty"] },
        outputs: ["rootDir/student", "rootDir/faculty"],
    },
    {
        input: {
            dir: "rootDir",
            resources: [{ name: "student", dir: "st" }, "faculty"],
        },
        outputs: ["rootDir/st", "rootDir/faculty"],
    },
    {
        input: {
            dir: "rootDir",
            resources: [
                { name: "student", dir: "st" },
                { name: "faculty", dir: "fc" },
            ],
        },
        outputs: ["rootDir/st", "rootDir/fc"],
    },
    {
        input: {
            dir: "rootDir/tests/rootSource",
            resources: ["student", "faculty"],
        },
        outputs: [
            "rootDir/tests/rootSource/student",
            "rootDir/tests/rootSource/faculty",
        ],
    },
];

describe("Get resource dir", () => {
    test.each(configurations)(
        "Getting resource dir for config %#",
        ({ input: { dir, resources }, outputs }) => {
            resources.forEach((resource, i) =>
                expect(getResourceDirectory(resource, dir)).toEqual(
                    path.normalize(outputs[i])
                )
            );
        }
    );
});
