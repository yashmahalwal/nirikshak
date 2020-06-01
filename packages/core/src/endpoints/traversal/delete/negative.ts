import {
    HeaderAndQueryInstance,
    generateHeaderAndQuery,
} from "../../generation/input/headerAndQuery";
import { Inputs } from "../../types/input";
import { SchemaHelpers } from "../../../common/types/helpers";
import { getRandomNewInstance } from "../collection";
import { Resource } from "../../../resource/types/resource";
import { URLString } from "../../types/urlString";
import { ResourceInstance } from "../../../resource/types/helper";
import Supertest from "supertest";
import { generateURL } from "../../generation/urlStringGen";
import { HeadersInstance } from "../../generation/helpers/headerMapGen";
interface GetNegativeInputInstance {
    semantics: HeaderAndQueryInstance;
    resource: ResourceInstance;
}

// Generate input from a non existing resource
export async function generateDeleteNegativeInput(
    input: Inputs["DELETE"],
    resourceSchema: Resource,
    helpers: SchemaHelpers
): Promise<GetNegativeInputInstance> {
    const resource = await getRandomNewInstance(resourceSchema, helpers);
    return {
        semantics: await generateHeaderAndQuery(
            input.semantics,
            resource,
            helpers
        ),
        resource,
    };
}

export async function makeNegativeGetRequest(
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["DELETE"],
    helpers: SchemaHelpers,
    resourceSchema: Resource
): Promise<{
    status: number;
    headers?: HeadersInstance;
}> {
    const { resource, semantics } = await generateDeleteNegativeInput(
        input,
        resourceSchema,
        helpers
    );
    const urlValue = await generateURL(url, resource, helpers);

    const { status, header } = await server
        .delete(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {});
    return { status, headers: header };
}
