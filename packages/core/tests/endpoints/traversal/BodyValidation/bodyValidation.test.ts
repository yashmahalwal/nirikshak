import {
    SchemaHelpers,
    TraversalHelpers,
    BodyType,
    ResourceInstance,
    bodyValidation,
} from "../../../../src";
import { CustomFunctionType } from "../../../../src/common/types/custom";

const schemaHelpers: SchemaHelpers = {
    word: async (): Promise<string> => "word word",
    invalid: async () => ({ age: 12 } as any),
};

const traversalHelpers: TraversalHelpers = {
    validate: async (input: any) => input === "secretKeyHash",
    invalid: async () => 12 as any,
};

const resource: ResourceInstance = {
    id: "identification",
    age: 3,
    ages: {
        classes: {
            places: [{ a: 12 }, { b: 13 }],
        },
    },
    purpose: [1, 2, 4],
    lorem: [{ ipsum: 4 }, { ipsum: 5 }],
};

const Bodies: (
    | { type: "body type"; value: BodyType }
    | { type: "custom function"; value: CustomFunctionType }
)[] = [
    {
        type: "body type",
        value: {
            id: "resource:id",
            purpose: "resource:purpose",
        },
    },
    {
        type: "custom function",
        value: "custom:validate",
    },
    {
        type: "body type",
        value: {
            id: "resource:id",
            age: "faker:random.number",
        },
    },
];

const entries: { input: any; output: boolean }[] = [
    {
        input: {
            id: resource.id,
            purpose: resource.purpose,
        },
        output: true,
    },
    { input: "secretKeyHash", output: true },
    {
        input: {
            id: resource.id,
            age: resource.age,
        },
        output: true,
    },
    {
        input: {
            id: resource.id,
        },
        output: false,
    },
    { input: "secretKey", output: false },
];

const InvalidBodies: {
    input: any;
    body: { type: "body type" | "custom function"; value: any };
}[] = [
    {
        input: {
            age: 53,
        },
        body: {
            value: {
                age: "resource:non.existent",
            },
            type: "body type",
        },
    },
    {
        input: {
            ages: [1],
        },
        body: {
            type: "body type",
            value: { ages: ["resource:ages"] },
        },
    },
    {
        input: {
            classes: "purple",
        },
        body: {
            type: "body type",
            value: { classes: "custom:color" },
        },
    },
    {
        input: { purpose: false },
        body: {
            type: "body type",
            value: { purpose: "custom:invalid" },
        },
    },
    {
        input: { a: "1" },
        body: { type: "custom function", value: "custom:color" },
    },
    {
        input: { a: "1" },
        body: { type: "custom function", value: "custom:invalid" },
    },
];

describe(`Validate body`, () => {
    test.each(entries)(`Entry: %#`, (entry) => {
        expect(
            bodyValidation(
                entry.input,
                Bodies,
                resource,
                schemaHelpers,
                traversalHelpers,
                {
                    input: {
                        semantics: {},
                        body: entry.input,
                    },
                    url: "/sampleURL",
                    output: {
                        semantics: {
                            status: 202,
                        },
                        body: {
                            lorem: "p",
                        },
                    },
                },
                new Map([[resource.id, resource]])
            )
        ).resolves.toBe(entry.output);
    });

    test.each(InvalidBodies)(`Invalid entry: %#`, (entry) => {
        expect(
            bodyValidation(
                entry.input,
                [entry.body],
                resource,
                schemaHelpers,
                traversalHelpers,
                {
                    input: {
                        semantics: {},
                        body: entry.input,
                    },
                    url: "/sampleURL",
                    output: {
                        semantics: {
                            status: 202,
                        },
                        body: {
                            lorem: "p",
                        },
                    },
                },
                new Map([[resource.id, resource]])
            )
        ).rejects.toMatchSnapshot();
    });
});
