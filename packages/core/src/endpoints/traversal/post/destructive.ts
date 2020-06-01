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
interface PostDestructiveInputInstance {
    semantics: HeaderAndQueryInstance;
    resource: ResourceInstance;
    body: BodyInstance;
}

// Generate input from a non existing resource
export async function generatePostDestructiveInput(
    input: Inputs["POST"],
    helpers: SchemaHelpers,
    resource: ResourceInstance
): Promise<PostDestructiveInputInstance> {
    if (!input.desctructiveBody)
        throw new Error(
            `Did not find a desctructive body in input description for post. Cannot make desctructive request`
        );
    return {
        semantics: await generateHeaderAndQuery(
            input.semantics,
            resource,
            helpers
        ),
        resource,
        body: await generateBodyType(
            input.desctructiveBody!,
            resource,
            helpers
        ),
    };
}

export async function makeDestructivePostRequest(
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["POST"],
    helpers: SchemaHelpers,
    resourceInstance: ResourceInstance
): Promise<{
    status: number;
    headers?: HeadersInstance;
}> {
    const { resource, semantics, body } = await generatePostDestructiveInput(
        input,
        helpers,
        resourceInstance
    );
    const urlValue = await generateURL(url, resource, helpers);

    const { status, header } = await server
        .post(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {})
        .send(body);
    return { status, headers: header };
}
