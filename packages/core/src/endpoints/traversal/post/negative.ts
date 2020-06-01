import {
    HeaderAndQueryInstance,
    generateHeaderAndQuery,
} from "../../generation/input/headerAndQuery";
import { Inputs } from "../../types/input";
import { SchemaHelpers } from "../../../common/types/helpers";
import { getRandomExistingResource, Collection } from "../collection";
import { URLString } from "../../types/urlString";
import { ResourceInstance } from "../../../resource/types/helper";
import Supertest from "supertest";
import { generateURL } from "../../generation/urlStringGen";
import { HeadersInstance } from "../../generation/helpers/headerMapGen";
import { BodyInstance } from "../../types";
import { generateBodyType } from "../../generation";
interface PostNegativeInputInstance {
    semantics: HeaderAndQueryInstance;
    resource: ResourceInstance;
    body: BodyInstance;
}

// Generate input from a non existing resource
export async function generatePostNegativeInput(
    input: Inputs["POST"],
    helpers: SchemaHelpers,
    collection: Collection
): Promise<PostNegativeInputInstance> {
    const resource = getRandomExistingResource(collection);
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

export async function makeNegativePostRequest(
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["POST"],
    helpers: SchemaHelpers,
    collection: Collection
): Promise<{
    status: number;
    headers?: HeadersInstance;
}> {
    const { resource, semantics, body } = await generatePostNegativeInput(
        input,
        helpers,
        collection
    );
    const urlValue = await generateURL(url, resource, helpers);

    const { status, header } = await server
        .post(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {})
        .send(body);
    return { status, headers: header };
}
