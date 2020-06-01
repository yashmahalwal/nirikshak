import {
    HeaderAndQueryInstance,
    generateHeaderAndQuery,
} from "../../generation/input/headerAndQuery";
import { Inputs } from "../../types/input";
import { SchemaHelpers } from "../../../common/types/helpers";
import { getRandomNewInstance } from "../collection";
import { URLString } from "../../types/urlString";
import { ResourceInstance } from "../../../resource/types/helper";
import Supertest from "supertest";
import { generateURL } from "../../generation/urlStringGen";
import { HeadersInstance } from "../../generation/helpers/headerMapGen";
import { BodyInstance } from "../../types";
import { generateBodyType } from "../../generation";
import { Resource } from "../../../resource";
interface PatchNegativeInputInstance {
    semantics: HeaderAndQueryInstance;
    resource: ResourceInstance;
    body: BodyInstance;
}

// Generate input from a non existing resource
export async function generatePatchNegativeInput(
    input: Inputs["PATCH"],
    helpers: SchemaHelpers,
    resourceJSON: Resource
): Promise<PatchNegativeInputInstance> {
    const resource = await getRandomNewInstance(resourceJSON, helpers);
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

export async function makeNegativePatchRequest(
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["PATCH"],
    helpers: SchemaHelpers,
    resourceJSON: Resource
): Promise<{
    status: number;
    headers?: HeadersInstance;
}> {
    const { resource, semantics, body } = await generatePatchNegativeInput(
        input,
        helpers,
        resourceJSON
    );
    const urlValue = await generateURL(url, resource, helpers);

    const { status, header } = await server
        .patch(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {})
        .send(body);
    return { status, headers: header };
}
