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

interface PatchPositiveInputInstance {
    semantics: HeaderAndQueryInstance;
    body: BodyInstance;
    resource: ResourceInstance;
}

// Generate input from an resource
export async function generatePatchPositiveInput(
    input: Inputs["PATCH"],
    resource: ResourceInstance,
    helpers: SchemaHelpers
): Promise<PatchPositiveInputInstance> {
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

export async function makePositivePatchRequest(
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["PATCH"],
    helpers: SchemaHelpers,
    resourceInstance: ResourceInstance,
    collection: Collection
): Promise<{
    status: number;
    headers: HeadersInstance;
    body: any;
}> {
    const { resource, semantics, body: b } = await generatePatchPositiveInput(
        input,
        resourceInstance,
        helpers
    );
    const urlValue = await generateURL(url, resource, helpers);

    const { status, header, body } = await server
        .patch(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {})
        .send(b);
    if (collection.has(resourceInstance.id))
        collection.set(resourceInstance.id, resourceInstance);
    else throw new Error(`Cannot update non existing resource in collection`);

    return { status, headers: header, body };
}
