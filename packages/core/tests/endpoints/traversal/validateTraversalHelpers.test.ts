import {
    ResourceInstance,
    SchemaHelpers,
    TraversalHelpers,
    generateCustom,
    Collection,
} from "../../../src";
import faker from "faker";
import _ from "lodash";
import { validateWithTraversalHelpers } from "../../../src/endpoints/traversal/traversalHelpers";
import { ResourceInstanceBase } from "../../../src/resource/types/helper";
import { NodeEntry } from "../../../src/endpoints/graph/nodeTypes";

const resource: ResourceInstance = {
    id: faker.random.uuid(),
    age: 3,
    ages: {
        classes: {
            places: [{ a: 12 }, { b: 13 }],
        },
    },
    purpose: [1, 2, 4],
    lorem: [{ ipsum: 4 }, { ipsum: 5 }],
};

const schemaHelpers: SchemaHelpers = {
    word: async (): Promise<string> => faker.random.word(),
};

const collection: Collection = new Map([[resource.id, resource]]);

const traversalHelpers: TraversalHelpers = {
    basicBodyMatch: async (
        input: any,
        resource: ResourceInstance,
        schemaHelpers: SchemaHelpers,
        nodeEntry: NodeEntry
    ) => {
        return (
            !!nodeEntry.input.semantics.query?.main &&
            generateCustom("custom:word", schemaHelpers) &&
            typeof resource.age === "number" &&
            typeof input === "object" &&
            _.isEqual(input, (resource.ages as any).classes)
        );
    },

    invalid: async () => 12 as any,
};

describe(`Traversal helpers`, () => {
    test(`Non existent function`, () => {
        expect(
            validateWithTraversalHelpers(
                7,
                "custom:nonExistent",
                resource,
                schemaHelpers,
                traversalHelpers,
                {
                    input: {
                        semantics: {
                            query: {
                                main: true,
                            },
                        },
                    },
                    url: `/main/url`,
                    output: {
                        semantics: {
                            status: 200,
                        },
                        body: {},
                    },
                },
                collection
            )
        ).rejects.toMatchInlineSnapshot(
            `[Error: Could not find traversal helper function: custom:nonExistent, args: ]`
        );
    });
    test(`Invalid function`, () => {
        expect(
            validateWithTraversalHelpers(
                7,
                "custom:invalid",
                resource,
                schemaHelpers,
                traversalHelpers,
                {
                    input: {
                        semantics: {
                            query: {
                                main: true,
                            },
                        },
                    },
                    url: `/main/url`,
                    output: {
                        semantics: {
                            status: 200,
                        },
                        body: {},
                    },
                },
                collection
            )
        ).rejects.toMatchInlineSnapshot(
            `[Error: function: custom:invalid, args:  did not return a boolean value]`
        );
    });

    test(`Valid input`, () => {
        expect(
            validateWithTraversalHelpers(
                (resource.ages as ResourceInstanceBase).classes,
                "custom:basicBodyMatch",
                resource,
                schemaHelpers,
                traversalHelpers,
                {
                    input: {
                        semantics: {
                            query: {
                                main: true,
                            },
                        },
                    },
                    url: `/main/url`,
                    output: {
                        semantics: {
                            status: 200,
                        },
                        body: {},
                    },
                },
                collection
            )
        ).resolves.toBe(true);
    });

    test(`Invalid input`, () => {
        expect(
            validateWithTraversalHelpers(
                resource.ages,
                "custom:basicBodyMatch",
                resource,
                schemaHelpers,
                traversalHelpers,
                {
                    input: {
                        semantics: {},
                    },
                    url: `/main/url`,
                    output: {
                        semantics: {
                            status: 200,
                        },
                        body: {},
                    },
                },
                collection
            )
        ).resolves.toBe(false);
    });
});
