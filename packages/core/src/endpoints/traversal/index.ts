import Supertest from "supertest";
import { MethodType, Inputs, Outputs } from "../types";
import { URLString } from "../types/urlString";
import { ResourceInstance, Resource } from "../../resource";
import { SchemaHelpers } from "../../common";
import { Collection } from "./collection";
import { HeadersInstance } from "../generation/helpers/headerMapGen";
import { makeGetRequest } from "./get";
import { makeDeleteRequest } from "./delete";
import { makePatchRequest } from "./patch";
import { makePostRequest } from "./post";
import { makePutRequest } from "./put";
export { extractBodiesFromOutput, bodyValidation } from "./bodyValidation";
export { TraversalHelpers, TraversalHelperFunctions } from "./traversalHelpers";
export {
    Collection,
    getRandomNewInstance,
    getRandomExistingResource,
} from "./collection";
export {
    extractHeadersFromSemantics,
    extractStatusFromSemantics,
    statusValidation,
    headersValidation,
} from "./semanticsValidation";
export async function makeRequest(
    url: URLString,
    method: MethodType,
    caseValue: keyof Outputs[typeof method],
    server: Supertest.SuperTest<Supertest.Test>,
    input: Inputs[typeof method],
    resource: ResourceInstance,
    helpers: SchemaHelpers,
    collection: Collection,
    resourceJSON: Resource
): Promise<{
    status: number;
    headers?: HeadersInstance;
    body?: any;
}> {
    switch (method) {
        case "GET":
            return makeGetRequest(
                caseValue,
                server,
                url,
                input,
                resource,
                helpers,
                resourceJSON
            );
        case "DELETE":
            return makeDeleteRequest(
                caseValue,
                server,
                url,
                input,
                resource,
                helpers,
                resourceJSON,
                collection
            );
        case "PATCH":
            return makePatchRequest(
                caseValue,
                server,
                url,
                input as Inputs["PATCH"],
                resource,
                helpers,
                resourceJSON,
                collection
            );
        case "POST":
            return makePostRequest(
                caseValue,
                server,
                url,
                input as Inputs["PATCH"],
                resource,
                helpers,
                resourceJSON,
                collection
            );
        case "PUT":
            return makePutRequest(
                caseValue,
                server,
                url,
                input as Inputs["PUT"],
                resource,
                helpers,
                resourceJSON,
                collection
            );
    }
}
