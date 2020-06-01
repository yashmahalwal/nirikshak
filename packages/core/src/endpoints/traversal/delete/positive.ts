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
import { Collection } from "../collection";

interface DeletePositiveInputInstance {
    semantics: HeaderAndQueryInstance;
    resource: ResourceInstance;
}

// Generate input from an resource
export async function generateDeletePositiveInput(
    input: Inputs["DELETE"],
    resource: ResourceInstance,
    helpers: SchemaHelpers
): Promise<DeletePositiveInputInstance> {
    return {
        semantics: await generateHeaderAndQuery(
            input.semantics,
            resource,
            helpers
        ),
        resource,
    };
}

export async function makePositiveDeleteRequest(
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["DELETE"],
    helpers: SchemaHelpers,
    resourceInstance: ResourceInstance,
    collection: Collection
): Promise<{
    status: number;
    headers: HeadersInstance;
    body: any;
}> {
    const { resource, semantics } = await generateDeletePositiveInput(
        input,
        resourceInstance,
        helpers
    );
    const urlValue = await generateURL(url, resource, helpers);

    const { status, header, body } = await server
        .delete(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {});
    if (collection.has(resourceInstance.id))
        collection.delete(resourceInstance.id);
    else throw new Error(`Cannot delete non existent resource from collection`);
    return { status, headers: header, body };
}
