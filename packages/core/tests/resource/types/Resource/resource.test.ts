import { Resource, isResource } from "../../../../src/resource/types";

const ValidResources: Resource[] = [
    {
        identifier: "id",
        id: "faker:random.uuid",
        name: {
            type: { function: "faker:name.firstName", args: [true] },
            optional: true,
        },
        address: {
            field: {
                street: { type: "faker.address.streetAddress", nullable: true },
                city: "faker.address.city",
                zipCode: "faker.address.zipCode",
            },
            plural: true,
        },
        grades: {
            sem1: { literals: [9.0, 8.85, { literals: [2.56, 4.42] }] },
        },
        branch: {
            fields: [
                { currentBranch: "custom:branchName" },
                { branch: "CSE-2" },
            ],
            oneof: true,
        },
    },
    {
        identifier: "name.firstName",
        name: {
            firstName: "faker:name.firstName",
            lastName: "faker:name.lastName",
        },
        age: {
            function: "faker:random.number",
            args: [{ min: 1, max: 100, precision: 1 }],
        },
        image: {
            types: ["faker:image.image", "faker:image.avatar"],
            oneof: true,
        },
        address: {
            fields: [
                {
                    zipCode: "faker:address.zipCode",
                    streets: { type: "faker:address.streetName", plural: true },
                },
                { city: "faker:address.city" },
            ],
            oneof: true,
        },
    },
];

const InvalidResources: any[] = [
    {
        name: {
            firstName: "faker:name.firstName",
            lastName: "faker:name.lastName",
        },
        age: {
            function: "faker:random.number",
            args: [{ min: 1, max: 100, precision: 1 }],
        },
        image: {
            types: ["faker:image.image", "faker:image.avatar"],
            oneof: true,
        },
        address: {
            fields: [
                {
                    zipCode: "faker:address.zipCode",
                    streets: { type: "faker:address.streetName", plural: true },
                },
                { city: "faker:address.city" },
            ],
            oneof: true,
        },
    },
    undefined,
    true,
    [15, 15, 16, 17, 18, "strutter"],
];

describe("Resource", () => {
    ValidResources.forEach((entry, index) =>
        test(`Valid resource ${index}`, () => {
            expect(isResource(entry)).toBe(true);
        })
    );

    InvalidResources.forEach((entry, index) =>
        test(`Valid resource ${index}`, () => {
            expect(isResource(entry)).toBe(false);
        })
    );
});
