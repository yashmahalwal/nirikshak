import Config from "./config.json";
import {
    Collection,
    isResource,
    isDescription,
    generateNodes,
    makeGraph,
    traverseGraph,
    parseNodeName,
    ResourceInstance,
    getRandomExistingResource,
    makeRequest,
    extractStatusFromSemantics,
    extractHeadersFromSemantics,
    headersValidation,
    extractBodiesFromOutput,
    bodyValidation,
    statusValidation,
    getRandomNewInstance,
} from "@nirikshak/core";
import ResourceJSON from "./resource.json";
import EndpointsJSON from "./endpoints.json";
import { setup, cleanup, schemaHelpers, traversalHelpers } from "./helpers";
import app from "./app";
import { Server } from "http";
import supertest from "supertest";
import getPort from "get-port";

// TODO: Move to a previous step in nirikshak preprocessing
if (!isResource(ResourceJSON)) throw new Error(`Invalid resource schema`);
if (!isDescription(EndpointsJSON))
    throw new Error(`Invalid description schema`);

describe(`student`, () => {
    let server: Server | null = null;
    const nodeMap = generateNodes(EndpointsJSON);
    const graph = makeGraph(nodeMap);
    const traversal = traverseGraph(graph, Config.steps);
    for (let i = 0; i < Config.iterations; i++)
        describe(`${i + 1}`, () => {
            for (const path of traversal)
                describe(path.join(";"), () => {
                    const collection: Collection = new Map();
                    let instance: ResourceInstance | null = null;
                    let prevPass = true;
                    beforeAll(async (done) => {
                        server = app.listen(await getPort(), async (err) => {
                            if (err) done(err);
                            await setup(
                                supertest(server),
                                collection,
                                ResourceJSON,
                                done
                            );
                        });
                    });

                    for (const node of path)
                        test(node, async () => {
                            if (!prevPass) return;
                            const parsedNode = parseNodeName(node);
                            if (!instance) {
                                if (parsedNode.method === "POST")
                                    instance = await getRandomNewInstance(
                                        ResourceJSON,
                                        schemaHelpers
                                    );
                                else
                                    instance = getRandomExistingResource(
                                        collection
                                    );
                            }

                            const entry = nodeMap.get(node);

                            if (!entry)
                                throw new Error(
                                    `Node map did not have the node : ${node}`
                                );

                            const response = await makeRequest(
                                entry.url,
                                parsedNode.method,
                                parsedNode.caseValue,
                                supertest(server),
                                entry.input,
                                instance,
                                schemaHelpers,
                                collection,
                                ResourceJSON
                            );

                            const statuses = extractStatusFromSemantics(
                                entry.output
                            );
                            prevPass =
                                prevPass &&
                                statusValidation(response.status, statuses);
                            expect(response.status).toMatchStatus(statuses);

                            if ("headers" in response) {
                                const headers = extractHeadersFromSemantics(
                                    entry.output
                                );
                                const result = await headersValidation(
                                    response.headers,
                                    headers,
                                    response.resource,
                                    schemaHelpers
                                );
                                prevPass = prevPass && result;
                                expect(result).toMatchHeaders(true);
                            }

                            if ("body" in response) {
                                const bodies = extractBodiesFromOutput(
                                    entry.output
                                );
                                const result = await bodyValidation(
                                    response.body,
                                    bodies,
                                    response.resource,
                                    schemaHelpers,
                                    traversalHelpers,
                                    entry,
                                    collection
                                );
                                instance = response.resource;
                                prevPass = prevPass && result;
                                expect(result).toMatchBody(true);
                            }
                        });

                    afterAll(async (done) => {
                        server?.close((err) =>
                            err ? done(err) : cleanup(done)
                        );
                    });
                });
        });
});
