import {
    WithModifiers,
    BaseType,
    isWithModifiersBaseType,
    isWithModifiers,
    isBase,
} from "../../../../src/resource/types";

// Mods:
const InvalidModifiers: { [key: string]: any } = [
    {
        nullable: 12,
    },

    {
        nullable: false,
        plural: [["Plurals"]],
    },
    {
        nullable: null,
        plural: true,
        optional: true,
    },
    {
        nullable: 4213312,
        plural: true,
        optional: undefined,
    },
    {
        nullable: [],
        plural: [[]],
    },
];

const ValidModifiers: Omit<WithModifiers<any>, "type">[] = [
    {},
    {
        nullable: true,
    },

    {
        nullable: true,
        plural: true,
    },
    {
        nullable: true,
        plural: true,
        optional: true,
    },
    {
        nullable: true,
        plural: true,
        optional: false,
    },
    {
        nullable: true,
        plural: false,
    },
    {
        nullable: true,
        plural: false,
        optional: true,
    },
    {
        nullable: true,
        plural: false,
        optional: false,
    },
    {
        nullable: false,
    },
    {
        nullable: false,
        plural: true,
    },
    {
        nullable: false,
        plural: true,
        optional: true,
    },
    {
        nullable: false,
        plural: true,
        optional: false,
    },
    {
        nullable: false,
        plural: false,
    },
    {
        nullable: false,
        plural: false,
        optional: true,
    },
    {
        nullable: false,
        plural: false,
        optional: false,
    },
];

const ValidBaseTypes: BaseType[] = [
    "custom:loremFunction",
    "12",
    null,
    [null, "12", "faker:random.string"],
    {
        function: "faker:random.number",
        args: [{ min: 0, max: 1, precision: 0.1 }],
    },
    {
        function: "custom:random.number",
        args: [{ min: 0, max: 1, precision: 0.1 }],
    },
    {
        literals: null,
    },
    {
        literals: [
            12,
            13,
            "faker:random.number",
            {
                literals: [],
            },
        ],
    },
];

const ValidWithModifiers: WithModifiers<BaseType>[] = [];

ValidBaseTypes.forEach((baseType) =>
    ValidModifiers.forEach((mod) => {
        const o: WithModifiers<BaseType> = Object.create(mod);
        o.type = baseType;
        ValidWithModifiers.push(o);
    })
);

const InvalidBaseTypes = [
    undefined,
    [12, [true]],
    [undefined],
    { laterals: "customString" },
    { literals: [12, 13, [false]] },
    { literals: { literals: undefined } },
];

const InvalidWithModifiers: any[] = [];

InvalidModifiers.forEach((mods) => {
    ValidBaseTypes.forEach((base) => {
        const o = Object.create(mods);
        o.type = base;
        InvalidWithModifiers.push(o);
    });

    InvalidBaseTypes.forEach((base) => {
        const o = Object.create(mods);
        o.type = base;
        InvalidWithModifiers.push(o);
    });
});

ValidModifiers.forEach((mods) =>
    InvalidBaseTypes.forEach((base) => {
        const o = Object.create(mods);
        o.type = base;
        InvalidWithModifiers.push(o);
    })
);

describe("With modifiers: Base Type", () => {
    ValidWithModifiers.forEach((entry, index) =>
        test(`Valid base type with modifiers ${index}`, () => {
            expect(isWithModifiersBaseType(entry)).toBe(true);
            expect(isWithModifiers(entry)).toBe(true);
            expect(isBase(entry)).toBe(true);
        })
    );

    InvalidWithModifiers.forEach((entry, index) =>
        test(`Invalid base type with modifiers ${index}`, () => {
            expect(isWithModifiersBaseType(entry)).toBe(false);
            expect(isWithModifiers(entry)).toBe(false);
            expect(isBase(entry)).toBe(false);
        })
    );
});
