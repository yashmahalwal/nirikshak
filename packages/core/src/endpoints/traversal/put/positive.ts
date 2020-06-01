import {
    HeaderAndQueryInstance,
    generateHeaderAndQuery,
} from "../../generation/input/headerAndQuery";
import { Inputs } from "../../types/input";
import { SchemaHelpers } from "../../../common/types/helpers";
import Supertest from "supertest";
import { ResourceInstance } from "../../../resource/types/helper";
import { URLString } from "../../types/urlString";
import { generateURL } from "../../generation/urlStringGen";
import { HeadersInstance } from "../../generation/helpers/headerMapGen";
import { BodyInstance } from "../../types";
import { generateBodyType } from "../../generation";
import { Collection } from "../collection";

interface PutPositiveInputInstance {
    semantics: HeaderAndQueryInstance;
    body: BodyInstance;
    resource: ResourceInstance;
}

// Generate input from an resource
export async function generatePutPositiveInput(
    input: Inputs["PUT"],
    resource: ResourceInstance,
    helpers: SchemaHelpers
): Promise<PutPositiveInputInstance> {
    return {
        semantics: await generateHeaderAndQuery(
            input.semantics,
            resource,
            helpers
        ),
        resource,
        body: await generateBodyType(input.body, resource, helpers),
    };
}

export async function makePositivePutRequest(
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["PUT"],
    helpers: SchemaHelpers,
    resourceInstance: ResourceInstance,
    collection: Collection
): Promise<{
    status: number;
    headers: HeadersInstance;
    body: any;
}> {
    const { resource, semantics, body: b } = await generatePutPositiveInput(
        input,
        resourceInstance,
        helpers
    );
    const urlValue = await generateURL(url, resource, helpers);

    const { status, header, body } = await server
        .put(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {})
        .send(b);
    collection.set(resourceInstance.id, resourceInstance);

    return { status, headers: header, body };
}
