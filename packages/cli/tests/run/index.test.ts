import { Configuration } from "../../src/utils/types";
import * as Run from "../../src/run";
import childProcess from "child_process";
import signale from "signale";
jest.mock("child_process");

const invalidConfig: Configuration = {
    dir: "tests",
    app: "index.ts",
    resources: ["stu"],
};

const validConfig: Configuration = {
    dir: "tests",
    app: "index.ts",
    resources: ["student", { name: "person", dir: "personDir/" }],
};

beforeAll(() => process.chdir(__dirname));

test(`Command`, () => expect(Run.command).toEqual("run [name..]"));
test(`Description`, () =>
    expect(Run.describe).toEqual("Run tests for specified resources."));

test(`Invalid config`, async () => {
    expect.hasAssertions();
    try {
        await Run.handler({
            configuration: invalidConfig,
            config: "config.json",
        });
    } catch (e) {
        expect(e).toMatchInlineSnapshot(
            `[Error: Resource stu does not exist. Please check project configuration.]`
        );
    }
});

const validJest: {
    input: Parameters<typeof Run.handler>[0];
    command: string;
}[] = [
    {
        input: {
            name: ["student"],
            configuration: {
                ...validConfig,
                jestArgs: ["--no-cache", "--runInBand"],
            },
            config: "config.json",
        },
        command: `npx jest --no-cache --runInBand --color=false --noStackTrace tests/student/`,
    },
    {
        input: {
            name: ["person"],
            configuration: {
                ...validConfig,
            },
            config: "config.json",
        },
        command: `npx jest --color=false --noStackTrace tests/personDir/`,
    },
    {
        input: {
            name: [],
            configuration: {
                ...validConfig,
                jestArgs: ["--no-cache", "--runInBand"],
            },
            config: "config.json",
        },
        command: `npx jest --no-cache --runInBand --color=false --noStackTrace tests/student/ tests/personDir/`,
    },
];

describe(`Valid config`, () => {
    test(`Invalid resource names`, async () => {
        expect.hasAssertions();
        try {
            await Run.handler({
                configuration: validConfig,
                config: "config.json",
                name: ["true"],
            });
        } catch (e) {
            expect(e).toMatchInlineSnapshot(
                `[Error: Cannot find resource: true]`
            );
        }
    });

    test.each(validJest)(
        `Jest with config arguments: %#`,
        async ({ input, command }) => {
            await Run.handler(input);

            expect(childProcess.execSync).toHaveBeenCalledWith(command, {
                stdio: ["inherit", "inherit", "inherit"],
            });
        }
    );

    test(`Jest throws error`, async () => {
        expect.assertions(2);
        childProcess.execSync = jest.fn().mockImplementation(() => {
            throw new Error(`Mocking error`);
        });
        try {
            await Run.handler({
                config: "config.json",
                configuration: validConfig,
                name: [],
            });
        } catch (e) {
            expect(e).toBeTruthy();
            expect(signale.fatal).toHaveBeenCalledWith(`Jest sent an error`);
        }
    });
});
