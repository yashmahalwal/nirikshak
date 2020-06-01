import { Resource } from "../../../resource/types/resource";
import Supertest from "supertest";
import { URLString } from "../../types/urlString";
import { Inputs } from "../../types/input";
import { SchemaHelpers } from "../../../common/types/helpers";
import { Outputs } from "../../types/output";
import { makePositivePatchRequest } from "./positive";
import { makeNegativePatchRequest } from "./negative";
import { ResourceInstance } from "../../../resource";
import { HeadersInstance } from "../../generation/helpers/headerMapGen";
import { Collection } from "../collection";
import { makeDestructivePatchRequest } from "./destructive";

export async function makePatchRequest(
    key: keyof Outputs["PATCH"],
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
            return makePositivePatchRequest(
                server,
                url,
                input,
                helpers,
                resourceInstance,
                collection
            );
        case "NEGATIVE":
            return makeNegativePatchRequest(
                server,
                url,
                input,
                helpers,
                resourceJSON
            );
        case "DESTRUCTIVE":
            return makeDestructivePatchRequest(
                server,
                url,
                input,
                helpers,
                resourceInstance
            );
    }
}
