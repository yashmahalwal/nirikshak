import {
    HeaderAndQueryInstance,
    generateHeaderAndQuery,
} from "../../generation/input/headerAndQuery";
import { Inputs } from "../../types/input";
import { SchemaHelpers } from "../../../common/types/helpers";
import { HeaderAndStatusInstance } from "../../generation/output/headerAndStatus";
import Supertest from "supertest";
import { ResourceInstance } from "../../../resource/types/helper";
import { URLString } from "../../types/urlString";
import { generateURL } from "../../generation/urlStringGen";
import { HeadersInstance } from "../../generation/helpers/headerMapGen";

interface GetPositiveInputInstance {
    semantics: HeaderAndQueryInstance;
    resource: ResourceInstance;
}

// Generate input from an resource
export async function generateGetPositiveInput(
    input: Inputs["GET"],
    resource: ResourceInstance,
    helpers: SchemaHelpers
): Promise<GetPositiveInputInstance> {
    return {
        semantics: await generateHeaderAndQuery(
            input.semantics,
            resource,
            helpers
        ),
        resource,
    };
}

export async function makePositiveGetRequest(
    server: Supertest.SuperTest<Supertest.Test>,
    url: URLString,
    input: Inputs["GET"],
    helpers: SchemaHelpers,
    resourceInstance: ResourceInstance
): Promise<{
    status: number;
    headers: HeadersInstance;
    body: any;
}> {
    const { resource, semantics } = await generateGetPositiveInput(
        input,
        resourceInstance,
        helpers
    );
    const urlValue = await generateURL(url, resource, helpers);

    const { status, header, body } = await server
        .get(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {});
    return { status, headers: header, body };
}
