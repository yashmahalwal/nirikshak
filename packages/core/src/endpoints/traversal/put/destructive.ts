import {
    HeaderAndQueryInstance,
    generateHeaderAndQuery,
} from "../../generation/input/headerAndQuery";
import { Inputs } from "../../types/input";
import { SchemaHelpers } from "../../../common/types/helpers";
import { URLString } from "../../types/urlString";
import { ResourceInstance } from "../../../resource/types/helper";
import Supertest from "supertest";
import { generateURL } from "../../generation/urlStringGen";
import { HeadersInstance } from "../../generation/helpers/headerMapGen";
import { BodyInstance } from "../../types";
import { generateBodyType } from "../../generation";
interface PutDestructiveInputInstance {
    semantics: HeaderAndQueryInstance;
    resource: ResourceInstance;
    body: BodyInstance;
}

// Generate input from a non existing resource
export async function generatePostDestructiveInput(
    input: Inputs["PUT"],
    helpers: SchemaHelpers,
    resource: ResourceInstance
): Promise<PutDestructiveInputInstance> {
    if (!input.destructiveBody)
        throw new Error(
            `Did not find a destructive body in input description for post. Cannot make destructive request`
        );
    return {
        semantics: await generateHeaderAndQuery(
            input.semantics,
            resource,
            helpers
        ),
        resource,
        body: await generateBodyType(input.destructiveBody!, resource, helpers),
    };
}

export async function makeDestructivePutRequest(
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["PUT"],
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
        .put(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {})
        .send(body);
    return { status, headers: header };
}
