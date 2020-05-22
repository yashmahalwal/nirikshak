import { Inputs } from "../../../../src/endpoints/types/input";
import { Outputs } from "../../../../src/endpoints/types/output";
import { MethodType, Cases } from "../../../../src/endpoints/types/helpers";
import { isDescription, Description } from "../../../../src/endpoints/types";

const ValidInputs: Inputs = {
    DELETE: {
        semantics: {
            headers: {
                applicationContent: true,
            },
            query: {
                sample: 15,
            },
        },
    },
    GET: {
        semantics: {
            query: {
                names: ["faker:random.name", "faker:random.name"],
            },
        },
    },
    PUT: {
        semantics: {
            headers: {
                Authorization: "Bearer 123123123432",
            },
        },
        body: {
            id: "resource:id",
            name: "faker:random.name",
            age: {
                types: ["faker:random.number", { function: "custom:age" }],
            },
        },
    },
    PATCH: {
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
    POST: {
        semantics: {},
        body: {
            class: "resource.class",
            ages: {
                type: "custom:age",
                plural: true,
            },
        },
    },
};

const ValidOutputs: Outputs = {
    DELETE: {
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
    GET: {
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
    PUT: {
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
    POST: {
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
            semantics: { status: 201 },
            body: {
                name: "resource:name",
                generationID: "custom:getGenerationID",
            },
        },
    },
    PATCH: {
        DESTRUCTIVE: [
            { semantics: { status: 501 } },
            { semantics: { status: 500, headers: { application: "chrome" } } },
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
};

const ComplexCases: Description[] = [
    {},
    {
        GET: {
            input: ValidInputs["GET"],
            output: {},
        },
        POST: {
            input: ValidInputs["POST"],
            output: {},
        },
    },
    {
        GET: {
            input: ValidInputs["GET"],
            output: {
                NEGATIVE: ValidOutputs["GET"]["NEGATIVE"],
            },
        },
        POST: {
            input: ValidInputs["POST"],
            output: {
                DESTRUCTIVE: ValidOutputs["POST"]["DESTRUCTIVE"],
                POSITIVE: ValidOutputs["POST"]["POSITIVE"],
            },
        },
    },
    {
        DELETE: {
            input: ValidInputs["DELETE"],
            output: {
                POSITIVE: ValidOutputs["DELETE"]["POSITIVE"],
            },
        },
        POST: {
            input: ValidInputs["POST"],
            output: { NEGATIVE: ValidOutputs["POST"]["NEGATIVE"] },
        },
        PATCH: {
            input: ValidInputs["PATCH"],
            output: { DESTRUCTIVE: ValidOutputs["PATCH"]["DESTRUCTIVE"] },
        },
    },
    {
        GET: {
            input: ValidInputs["GET"],
            output: ValidOutputs["GET"],
        },
        DELETE: {
            input: ValidInputs["DELETE"],
            output: ValidOutputs["DELETE"],
        },
        POST: {
            input: ValidInputs["POST"],
            output: ValidOutputs["POST"],
        },
        PATCH: {
            input: ValidInputs["PATCH"],
            output: ValidOutputs["PATCH"],
        },
        PUT: {
            input: ValidInputs["PUT"],
            output: ValidOutputs["PUT"],
        },
    },
];

describe("Valid descriptions", () => {
    const methods: MethodType[] = ["GET", "PUT", "POST", "PATCH", "DELETE"];
    const casesCombination: Cases[][] = [
        ["DESTRUCTIVE", "NEGATIVE", "POSITIVE"],
        ["NEGATIVE", "POSITIVE"],
        ["NEGATIVE", "DESTRUCTIVE"],
        ["DESTRUCTIVE", "POSITIVE"],
        ["DESTRUCTIVE"],
        ["NEGATIVE"],
        ["POSITIVE"],
    ];

    methods.forEach((method) =>
        casesCombination.forEach((combination) => {
            const outputs = {};

            combination.forEach(
                (caseValue) =>
                    caseValue in ValidOutputs[method] &&
                    (outputs[caseValue] = ValidOutputs[method][caseValue])
            );

            if (!Object.keys(outputs).length) return;

            test(`Basic entry: ${method}: ${combination.join(", ")}`, () => {
                expect(
                    isDescription({
                        [method]: {
                            input: ValidInputs[method],
                            output: outputs,
                        },
                    })
                ).toBe(true);
            });
        })
    );

    ComplexCases.forEach((entry, index) =>
        test(`Complex case: ${index}`, () =>
            expect(isDescription(entry)).toBe(true))
    );
});
