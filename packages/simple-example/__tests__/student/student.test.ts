import {
    Collection,
    isResource,
    isDescription,
    MethodType,
    Outputs,
    makeRequest,
} from "@nirikshak/core";
import ResourceJSON from "./resource.json";
import EndpointsJSON from "./endpoints.json";
import { setup, cleanup, schemaHelpers } from "./helpers";
import app from "./app";
import { Server } from "http";
import { Description } from "@nirikshak/core/lib/endpoints/types/description";
import supertest from "supertest";

// TODO: Move to a previous step in nirikshak preprocessing
if (!isResource(ResourceJSON)) throw new Error(`Invalid resource schema`);
if (!isDescription(EndpointsJSON))
    throw new Error(`Invalid description schema`);

const collection: Collection = new Map();
let server: Server | null = null;

describe("student", () => {
    beforeAll((done) => {
        server = app.listen(3000, async (err) => {
            if (err) return done(err);
            await setup(supertest(server), collection, ResourceJSON, done);
        });
    });

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
                                for (let i = 0; i < caseArr.length; i++) {
                                    test(`${i}`, async () => {
                                        const x = await makeRequest(
                                            url,
                                            method as MethodType,
                                            key as keyof Outputs[typeof method],
                                            supertest(server),
                                            input,
                                            schemaHelpers,
                                            collection,
                                            ResourceJSON
                                        );
                                        void x;
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    afterAll((done) => {
        server && server.close((err) => (err ? done(err) : cleanup(done)));
    });
});
