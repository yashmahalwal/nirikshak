import { Inputs } from "../../types/input";
import { SchemaHelpers } from "../../../common/types/helpers";
import Supertest from "supertest";
import { ResourceInstance } from "../../../resource/types/helper";
import { URLString } from "../../types/urlString";
import { generateURL } from "../../generation/urlStringGen";
import { HeadersInstance } from "../../generation/helpers/headerMapGen";
import { Collection } from "../collection";
import { generatePutInput } from "./input";

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
    const { semantics, body: b } = await generatePutInput(
        "POSITIVE",
        input,
        resourceInstance,
        helpers
    );
    const urlValue = await generateURL(url, resourceInstance, helpers);

    const { status, header, body } = await server
        .put(urlValue)
        .query(semantics.query ?? {})
        .set(semantics.headers ?? {})
        .send(b);
    collection.set(resourceInstance.id, resourceInstance);

    return { status, headers: header, body };
}
