import {
    HeaderAndStatus,
    outputValidationFunctions,
} from "../../../../../src/endpoints/types/output";
import {
    HeaderMap,
    BodyType,
    MethodType,
    Cases,
} from "../../../../../src/endpoints/types/helpers";

const ValidHeader: HeaderMap = {
    "content-type": "faker:system:mimetype",
    Authorization: "faker:random.alphaNumeric",
    identity: false,
    resource: "resource:id",
    count: 4,
};

const InvalidHeader: any = {
    purple: "color",
    color: "purple",
    application: [1, 3, false, null],
};

const ValidStatus: HeaderAndStatus["status"] = 200;

const InvalidStatus: any = "200";

const ValidBody: BodyType = {
    plurals: true,
    parrots: {
        type: "custom:colors",
        plural: true,
        optional: true,
    },
    fradulency: [
        1,
        5.3,
        "agatha",
        null,
        null,
        ["faker:random.invalidFunction", "flip-flip"],
    ],
    address: {
        fields: [
            { zipCode: "faker:random.zipCode" },
            {
                street: {
                    types: [
                        { function: "faker:address.streetName" },
                        "faker:address:streetAddress",
                    ],
                },
            },
        ],
    },
};

const InvalidBody: any = {
    plurals: true,
    parrots: {
        type: "custom:colors",
        plural: true,
        optional: true,
    },
    fradulency: [
        1,
        5.3,
        "agatha",
        null,
        null,
        ["faker:random.invalidFunction", "flip-flip", [[[undefined]]]],
    ],
    address: {
        fields: [
            { zipCode: "faker:random.zipCode" },
            {
                street: {
                    types: [
                        { function: "faker:address.streetName" },
                        "faker:address:streetAddress",
                    ],
                },
            },
        ],
    },
};

const ValidHeaderAndStatus: HeaderAndStatus[] = [
    { status: ValidStatus },
    {
        headers: ValidHeader,
        status: ValidStatus,
    },
];
const InvalidHeaderAndStatus: any[] = [
    {},
    { headers: InvalidHeader },
    { status: InvalidStatus },
    { headers: ValidHeader, status: InvalidStatus },
    { headers: InvalidHeader, status: ValidStatus },
    { headers: InvalidHeader, status: InvalidStatus },
];

const ValidHeaderAndStatusAndBodyArrays: {
    body: BodyType;
    semantics: HeaderAndStatus;
}[][] = [
    [{ body: ValidBody, semantics: ValidHeaderAndStatus[0] }],
    [
        { body: ValidBody, semantics: ValidHeaderAndStatus[0] },
        { body: ValidBody, semantics: ValidHeaderAndStatus[1] },
    ],
    [
        { body: ValidBody, semantics: ValidHeaderAndStatus[1] },
        { body: ValidBody, semantics: ValidHeaderAndStatus[1] },
        { body: ValidBody, semantics: ValidHeaderAndStatus[1] },
    ],
];

const InvalidHeaderAndStatusAndBodyArrays: {
    body?: any;
    semantics?: any;
}[][] = [
    [{ body: ValidBody }],
    [{ semantics: ValidHeaderAndStatus[1] }],
    [
        { body: ValidBody, semantics: ValidHeaderAndStatus[0] },
        { body: ValidBody, semantics: ValidHeaderAndStatus[1] },
        { body: ValidBody, semantics: ValidHeaderAndStatus[0] },
        { body: InvalidBody, semantics: ValidHeaderAndStatus[1] },
    ],
    [
        { body: ValidBody, semantics: ValidHeaderAndStatus[0] },
        { body: ValidBody, semantics: ValidHeaderAndStatus[1] },
        { body: ValidBody, semantics: ValidHeaderAndStatus[0] },
        { body: ValidBody, semantics: InvalidHeaderAndStatus[1] },
    ],
];

describe("Output validation functions: body", () => {
    (["PUT", "POST", "PATCH"] as MethodType[]).forEach((method) => {
        ValidHeaderAndStatus.forEach((element, index) => {
            (["POSITIVE"] as Cases[]).forEach((caseValue) => {
                test(`Valid body - ${method}-${caseValue}: ${index}`, () => {
                    const o = outputValidationFunctions[method][caseValue];

                    expect(o({ semantics: element, body: ValidBody })).toBe(
                        true
                    );

                    expect(o({ semantics: element, body: InvalidBody })).toBe(
                        false
                    );
                });
            });
        });

        ValidHeaderAndStatusAndBodyArrays.forEach((element, index) => {
            (["POSITIVE"] as Cases[]).forEach((caseValue) => {
                test(`Valid body - ${method}-${caseValue}: ${index}`, () => {
                    const o = outputValidationFunctions[method][caseValue];

                    expect(o(element)).toBe(true);
                });
            });
        });

        InvalidHeaderAndStatusAndBodyArrays.forEach((element, index) => {
            (["POSITIVE"] as Cases[]).forEach((caseValue) => {
                test(`Valid body - ${method}-${caseValue}: ${index}`, () => {
                    const o = outputValidationFunctions[method][caseValue];

                    expect(o(element)).toBe(false);
                });
            });
        });

        InvalidHeaderAndStatus.forEach((element, index) => {
            (["POSITIVE"] as Cases[]).forEach((caseValue) => {
                test(`Invalid body - ${method}-${caseValue}: ${index}`, () => {
                    const o = outputValidationFunctions[method][caseValue];

                    expect(o({ semantics: element, body: ValidBody })).toBe(
                        false
                    );
                    expect(o({ semantics: element, body: InvalidBody })).toBe(
                        false
                    );
                });
            });
        });
    });
});
