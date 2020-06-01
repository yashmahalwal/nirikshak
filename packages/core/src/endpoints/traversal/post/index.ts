import { Resource } from "../../../resource/types/resource";
import Supertest from "supertest";
import { URLString } from "../../types/urlString";
import { Inputs } from "../../types/input";
import { SchemaHelpers } from "../../../common/types/helpers";
import { Outputs } from "../../types/output";
import { makePositivePostRequest } from "./positive";
import { makeNegativePostRequest } from "./negative";
import { ResourceInstance } from "../../../resource";
import { HeadersInstance } from "../../generation/helpers/headerMapGen";
import { Collection } from "../collection";
import { makeDestructivePostRequest } from "./destructive";

export async function makePostRequest(
    key: keyof Outputs["POST"],
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["POST"],
    resourceInstance: ResourceInstance,
    helpers: SchemaHelpers,
    resourceJSON: Resource,
    collection: Collection
): Promise<{
    status: number;
    headers?: HeadersInstance;
    body?: any;
}> {
    switch (key) {
        case "POSITIVE":
            return makePositivePostRequest(
                server,
                url,
                input,
                helpers,
                resourceInstance,
                collection
            );
        case "NEGATIVE":
            return makeNegativePostRequest(
                server,
                url,
                input,
                helpers,
                collection
            );
        case "DESTRUCTIVE":
            return makeDestructivePostRequest(
                server,
                url,
                input,
                helpers,
                resourceInstance
            );
    }
}
