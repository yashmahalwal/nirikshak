import faker from "faker";
import SuperTest from "supertest";
import {
    SchemaHelpers,
    TraversalHelpers,
    Collection,
    Resource,
    ResourceInstance,
    generateResource,
} from "@nirikshak/core";

export const schemaHelpers: SchemaHelpers = {
    async grade() {
        return faker.random.arrayElement(["A", "B", "C"]);
    },
};

export const traversalHelpers: TraversalHelpers = {
    bodyMatcher: (args) => {
        console.log("Body matching ", args);
        return true;
    },
};

export async function setup(
    server: SuperTest.SuperTest<SuperTest.Test>,
    collection: Collection,
    resourceJSON: Resource,
    done: (err?: any) => void
): Promise<void> {
    const promiseArr: Promise<ResourceInstance>[] = [];
    for (let i = 0; i < parseInt(process.env.SETUP_INSTANCES); i++)
        promiseArr.push(generateResource(resourceJSON, schemaHelpers));

    (await Promise.all(promiseArr)).forEach((p) => collection.set(p.id, p));

    try {
        for (const value of collection.values()) {
            await server.post("/Student").send(value);
        }
    } catch (e) {
        done(e);
        return;
    }
    done();
}

export async function cleanup(done: () => void): Promise<void> {
    done();
}
