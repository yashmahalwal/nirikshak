import getPort from "get-port";
import { createServer } from "http";
import {
    Resource,
    SchemaHelpers,
    Description,
    Collection,
    generateResource,
    makeRequest,
    getRandomExistingResource,
} from "../../../../src";
import { RANDOMNESS_ITERATIONS } from "../../../../src/common/Env";
import supertest from "supertest";
import {
    NodeMap,
    parseNodeName,
} from "../../../../src/endpoints/graph/nodeTypes";
import { generateNodes } from "../../../../src/endpoints/graph/generateNodes";
import "../../../../src/jestMatchers/index";

const resourceSchema: Resource = {
    id: "faker:random.uuid",
    name: ["faker:name.firstName", "faker:name.lastName"],
    age: "faker:random.number",
    address: {
        types: [{ type: "faker:zipCode", plural: true }],
        fields: [
            {
                field: {
                    zipCode: "faker:addresss.zipCode",
                    city: "faker:address.city",
                },
                plural: true,
            },
        ],
    },
    bloodGroup: {
        type: { function: "custom:bloodGroup", args: ["O+"] },
        optional: true,
    },
};

const schemaHelpers: SchemaHelpers = {
    async bloodGroup(preferred?: string) {
        return preferred ?? "A+";
    },
};

const descriptions: Description[] = [
    {
        PUT: {
            input: {
                semantics: {
                    headers: {
                        "content-type": "application/json",
                    },
                    query: {
                        a: "10",
                    },
                },
                body: {
                    id: "resource:id",
                },
            },
            url: "/student",
            output: {
                DESTRUCTIVE: {
                    semantics: {
                        status: 400,
                    },
                },
            },
        },
    },
];

const collection: Collection = new Map();
const server = createServer((req, res) => {
    if (req.method === "PUT" && req.url?.startsWith("/student")) {
        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const body = JSON.parse(data);

            if (!("id" in body)) {
                res.statusCode = 400;
                res.end();
                return;
            }
            res.setHeader("item-id", body.id);

            const [, , query] = req.url!.split(/\?|\//);
            const o: Record<string, any> = {
                id: body.id,
            };

            if (query) {
                const [key, value] = query.split("=");
                o[key] = value;
            }
            res.statusCode = 201;
            res.setHeader("content-type", "application/json");
            res.write(JSON.stringify(o));
            res.end();
        });
    }
});

describe(`Post method`, () => {
    describe.each(descriptions)(`Description: %#`, (description) => {
        beforeAll(async (done) => {
            for (let i = 0; i < RANDOMNESS_ITERATIONS; i++) {
                const newResource = await generateResource(
                    resourceSchema,
                    schemaHelpers
                );
                collection.set(newResource.id, newResource);
            }

            server.listen(await getPort(), done);
        });
        const nodeMap: NodeMap = generateNodes(description);

        for (const [key, entry] of nodeMap.entries())
            test(key, async () => {
                const parsedNode = parseNodeName(key);
                const app = supertest(server);
                expect(
                    makeRequest(
                        entry.url,
                        parsedNode.method,
                        parsedNode.caseValue,
                        app,
                        entry.input,
                        getRandomExistingResource(collection),
                        schemaHelpers,
                        collection
                    )
                ).rejects.toMatchSnapshot();
            });
        afterAll((done) => server.close(done));
    });
});
