import { isDescription } from "../../../../src/endpoints/types";

const InvalidDescriptions: any[] = [
    null,
    "string",
    [false, true, "absorption", "alaska"],
    {
        purple: {
            input: {
                semantics: {
                    headers: {
                        applicationContent: true,
                    },
                    query: {
                        sample: 15,
                    },
                },
            },
            output: {
                DESTRUCTIVE: [
                    { semantics: { status: 501 } },
                    {
                        semantics: {
                            status: 500,
                            headers: { application: "chrome" },
                        },
                    },
                ],
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
                POSITIVE: {
                    semantics: {
                        status: 200,
                    },
                    body: {
                        name: "resource:name",
                        age: "resource:age",
                    },
                },
            },
        },
    },
    {
        GET: {
            output: {
                DESTRUCTIVE: [
                    { semantics: { status: 501 } },
                    {
                        semantics: {
                            status: 500,
                            headers: { application: "chrome" },
                        },
                    },
                ],
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
                POSITIVE: {
                    semantics: {
                        status: 200,
                    },
                    body: {
                        name: "resource:name",
                        age: "resource:age",
                    },
                },
            },
        },
    },
    {
        GET: {
            input: {
                semantics: {
                    headers: {
                        applicationContent: true,
                    },
                    query: {
                        sample: 15,
                    },
                },
            },
        },
    },
    {
        DELETE: {
            input: {
                semantics: {
                    headers: {
                        applicationContent: [true],
                    },
                    query: {
                        sample: 15,
                    },
                },
            },
            output: {
                DESTRUCTIVE: [
                    { semantics: { status: 501 } },
                    {
                        semantics: {
                            status: 500,
                            headers: { application: "chrome" },
                        },
                    },
                ],
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
                POSITIVE: {
                    semantics: {
                        status: 200,
                    },
                    body: {
                        name: "resource:name",
                        age: "resource:age",
                    },
                },
            },
        },
    },
    {
        GET: {
            input: {
                semantics: {
                    headers: {
                        applicationContent: [true],
                    },
                    query: {
                        sample: 15,
                    },
                },
            },
            output: {
                DESTRUCTIVE: [
                    { semantics: { status: "false" } },
                    {
                        semantics: {
                            status: 500,
                            headers: { application: "chrome" },
                        },
                    },
                ],
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
                POSITIVE: {
                    semantics: {
                        status: 200,
                    },
                    body: {
                        name: "resource:name",
                        age: "resource:age",
                    },
                },
            },
        },
    },
    {
        DELETE: {
            input: {
                semantics: {
                    headers: {
                        applicationContent: true,
                    },
                    query: {
                        sample: 15,
                    },
                },
            },
            output: {
                NEGATIVE: {
                    semantics: {
                        status: 200,
                    },
                },
                POSITIVE: [
                    {
                        semantics: {
                            status: 404,
                            headers: {
                                message: "not found value",
                            },
                        },
                    },
                    {
                        semantics: {
                            status: 400,
                        },
                    },
                ],
            },
        },
        GET: {
            input: {
                semantics: {
                    query: {
                        names: ["faker:random.name", "faker:random.name"],
                    },
                },
            },
            output: {
                POSITIVE: [
                    {
                        semantics: {
                            status: 200,
                            headers: {
                                "content-type": `Application/JSON`,
                            },
                        },
                    },
                    {
                        semantics: {
                            status: 201,
                        },
                    },
                ],
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
            },
        },
        PUT: {
            input: {
                semantics: {
                    headers: {
                        Authorization: "Bearer 123123123432",
                    },
                },
                body: {
                    id: "resource:id",
                    name: "faker:random.name",
                    age: {
                        types: [
                            "faker:random.number",
                            { function: "custom:age" },
                        ],
                    },
                },
            },
            output: {
                DESTRUCTIVE: {
                    semantics: {
                        status: 500,
                        headers: {
                            messsage: "Invalid fields value",
                        },
                    },
                },
                POSITIVE: [
                    {
                        body: {
                            id: "resource:id",
                            name: "resource:name",
                            classes: "resource.classes",
                        },
                        semantics: {
                            status: 200,
                        },
                    },
                    {
                        body: {
                            id: "resource:id",
                            name: "resource:name",
                            classes: "resource.classes",
                        },
                        semantics: {
                            status: 201,
                        },
                    },
                ],
            },
        },
        PATCH: {
            input: {
                semantics: {
                    headers: {
                        "x-poweredBy": "google",
                        version: "v1.0.0",
                    },
                    query: {
                        version: 1,
                        useful: false,
                    },
                },
                body: {
                    id: "resource:id",
                    name: {
                        type: "resource.name",
                        optional: true,
                    },
                    age: {
                        type: "resource.age",
                        optional: true,
                    },
                },
            },
            output: {
                DESTRUCTIVE: [
                    { semantics: { status: 501 } },
                    {
                        semantics: {
                            status: 500,
                            headers: { application: "chrome" },
                        },
                    },
                ],
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
                POSITIVE: {
                    semantics: {
                        status: 200,
                    },
                    body: {
                        name: "resource:name",
                        age: "resource:age",
                    },
                },
            },
        },
        POST: {
            input: {
                semantics: {},
                body: {
                    class: "resource.class",
                    ages: {
                        type: "custom:age",
                        plural: true,
                    },
                },
            },
            output: {
                DESTRUCTIVE: {
                    semantics: {
                        status: 500,
                    },
                },
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
                POSITIVE: {
                    semantics: { status: null },
                    body: {
                        name: "resource:name",
                        generationID: "custom:getGenerationID",
                    },
                },
            },
        },
    },
    {
        DELETE: {
            input: {
                semantics: {
                    headers: {
                        applicationContent: true,
                    },
                    query: {
                        sample: 15,
                    },
                },
            },
            output: {
                NEGATIVE: {
                    semantics: {
                        status: 200,
                    },
                },
                POSITIVE: [
                    {
                        semantics: {
                            status: 404,
                            headers: {
                                message: "not found value",
                            },
                        },
                    },
                    {
                        semantics: {
                            status: 400,
                        },
                    },
                ],
            },
        },
        GET: {
            input: {
                semantics: {
                    query: {
                        names: ["faker:random.name", "faker:random.name"],
                    },
                },
            },
            output: {
                POSITIVE: [
                    {
                        semantics: {
                            status: 200,
                            headers: {
                                "content-type": `Application/JSON`,
                            },
                        },
                    },
                    {
                        semantics: {
                            status: 201,
                        },
                    },
                ],
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
            },
        },
        PUT: {
            input: {
                semantics: {
                    headers: {
                        Authorization: "Bearer 123123123432",
                    },
                },
                body: {
                    id: "resource:id",
                    name: "faker:random.name",
                    age: {
                        types: [
                            "faker:random.number",
                            { function: "custom:age" },
                        ],
                    },
                },
            },
            output: {
                DESTRUCTIVE: {
                    semantics: {
                        status: 500,
                        headers: {
                            messsage: "Invalid fields value",
                        },
                    },
                },
                POSITIVE: [
                    {
                        body: {
                            id: "resource:id",
                            name: "resource:name",
                            classes: "resource.classes",
                        },
                        semantics: {
                            status: 200,
                        },
                    },
                    {
                        body: {
                            id: "resource:id",
                            name: "resource:name",
                            classes: "resource.classes",
                        },
                        semantics: {
                            status: 201,
                        },
                    },
                ],
            },
        },
        PATCH: {
            input: {
                semantics: {
                    headers: {
                        "x-poweredBy": "google",
                        version: "v1.0.0",
                    },
                    query: {
                        version: 1,
                        useful: false,
                    },
                },
                body: {
                    id: "resource:id",
                    age: { function: undefined },
                    name: {
                        type: "resource.name",
                        optional: true,
                    },
                },
            },
            output: {
                DESTRUCTIVE: [
                    { semantics: { status: 501 } },
                    {
                        semantics: {
                            status: 500,
                            headers: { application: "chrome" },
                        },
                    },
                ],
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
                POSITIVE: {
                    semantics: {
                        status: 200,
                    },
                    body: {
                        name: "resource:name",
                        age: "resource:age",
                    },
                },
            },
        },
        POST: {
            input: {
                semantics: {},
                body: {
                    class: "resource.class",
                    ages: {
                        type: "custom:age",
                        plural: true,
                    },
                },
            },
            output: {
                DESTRUCTIVE: {
                    semantics: {
                        status: 500,
                    },
                },
                NEGATIVE: {
                    semantics: {
                        status: 404,
                    },
                },
                POSITIVE: {
                    semantics: { status: 200 },
                    body: {
                        name: "resource:name",
                        generationID: "custom:getGenerationID",
                    },
                },
            },
        },
    },
];

describe("Invalid descriptions", () => {
    InvalidDescriptions.forEach((desc, index) => {
        test(`Invalid entry: ${index}`, () =>
            expect(isDescription(desc)).toBe(false));
    });
});
