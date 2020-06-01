import {
    Collection,
    isResource,
    isDescription,
    MethodType,
    Outputs,
    makeRequest,
    Description,
    getRandomExistingResource,
    extractStatusFromSemantics,
    statusValidation,
    extractHeadersFromSemantics,
    headersValidation,
    extractBodiesFromOutput,
    bodyValidation,
} from "@nirikshak/core";
import ResourceJSON from "./resource.json";
import EndpointsJSON from "./endpoints.json";
import { setup, cleanup, schemaHelpers } from "./helpers";
import app from "./app";
import { Server } from "http";
import supertest from "supertest";

// TODO: Move to a previous step in nirikshak preprocessing
if (!isResource(ResourceJSON)) throw new Error(`Invalid resource schema`);
if (!isDescription(EndpointsJSON))
    throw new Error(`Invalid description schema`);

const collection: Collection = new Map();
let server: Server | null = null;

for (let i = 0; i < parseInt(process.env.ITERATIONS); i++)
    describe(`${i}`, () => {
        describe("student", () => {
            for (const method in EndpointsJSON as Description) {
                describe(method, () => {
                    const methodEntry: Extract<
                        Description[MethodType],
                        Array<any>
                    > = Array.isArray(EndpointsJSON[method])
                        ? EndpointsJSON[method]
                        : [EndpointsJSON[method]];

                    for (let i = 0; i < methodEntry.length; i++) {
                        describe(`${i}`, () => {
                            const url = methodEntry[i].url;
                            const input = methodEntry[i].input;
                            const outputs = methodEntry[i].output;
                            for (const key in outputs) {
                                const caseArr: Extract<
                                    Outputs[MethodType][keyof Outputs[MethodType]],
                                    Array<any>
                                > = Array.isArray(outputs[key])
                                    ? outputs[key]
                                    : [outputs[key]];
                                describe(url, () => {
                                    describe(key, () => {
                                        beforeAll((done) => {
                                            server = app.listen(
                                                3000,
                                                async (err) => {
                                                    if (err) return done(err);
                                                    await setup(
                                                        supertest(server),
                                                        collection,
                                                        ResourceJSON,
                                                        done
                                                    );
                                                }
                                            );
                                        });

                                        for (
                                            let i = 0;
                                            i < caseArr.length;
                                            i++
                                        ) {
                                            test(`${i}`, async () => {
                                                const RandomResourceEntry = getRandomExistingResource(
                                                    collection
                                                ).id;
                                                const x = await makeRequest(
                                                    url,
                                                    method as MethodType,
                                                    key as keyof Outputs[MethodType],
                                                    supertest(server),
                                                    input,
                                                    collection.get(
                                                        RandomResourceEntry
                                                    )!,
                                                    schemaHelpers,
                                                    collection,
                                                    ResourceJSON
                                                );

                                                const statuses = extractStatusFromSemantics(
                                                    caseArr
                                                );
                                                expect(
                                                    statusValidation(
                                                        x.status,
                                                        statuses
                                                    )
                                                ).toBe(true);

                                                if ("headers" in x) {
                                                    const headers = extractHeadersFromSemantics(
                                                        caseArr
                                                    );
                                                    expect(
                                                        headersValidation(
                                                            x.headers,
                                                            headers,
                                                            collection.get(
                                                                RandomResourceEntry
                                                            )!,
                                                            schemaHelpers
                                                        )
                                                    ).resolves.toBe(true);
                                                }

                                                if ("body" in x) {
                                                    const bodies = extractBodiesFromOutput(
                                                        caseArr
                                                    );
                                                    expect(
                                                        bodyValidation(
                                                            x.body,
                                                            bodies,
                                                            collection.get(
                                                                RandomResourceEntry
                                                            )!,
                                                            schemaHelpers
                                                        )
                                                    ).resolves.toBe(true);
                                                }
                                            });
                                        }

                                        afterAll((done) => {
                                            server?.close((err) =>
                                                err ? done(err) : cleanup(done)
                                            );
                                        });
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    });
