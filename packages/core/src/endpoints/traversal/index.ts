import Supertest from "supertest";
import { MethodType, Inputs, Outputs } from "../types";
import { URLString } from "../types/urlString";
import { ResourceInstance, Resource } from "../../resource";
import { SchemaHelpers } from "../../common";
import { Collection } from "./collection";
import { HeadersInstance } from "../generation/helpers/headerMapGen";
import { makeGetRequest } from "./get";

export { TraversalHelpers, TraversalHelperFunctions } from "./traversalHelpers";
export { Collection } from "./collection";

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

    switch(method){
        case "GET":
            return makeGetRequest(caseValue, server,url,input,resource,helpers,resourceJSON);
    }

    return { status: 200 };
}
