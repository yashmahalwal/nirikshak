import { FakerType, isValidFaker } from "./fakerTypes";
import { Literal, isLiteral } from "./primitive";
import { Custom, isCustomFunction } from "./custom";

export type BaseType = FakerType | Custom | Literal;

export function isBaseType(input: any): input is BaseType {
    return isValidFaker(input) || isCustomFunction(input) || isLiteral(input);
}

export type WithModifiers<
    T extends BaseType | ResourceBase
> = (T extends BaseType
    ? {
          type: BaseType;
      }
    : {
          field: ResourceBase;
      }) & { plural?: boolean; nullable?: boolean; optional?: boolean };

function checkModifiers(
    input: WithModifiers<ResourceBase | BaseType>
): boolean {
    let value = true;
    void (
        "nullable" in input &&
        (value = value && typeof input["nullable"] === "boolean")
    );
    void (
        "optional" in input &&
        (value = value && typeof input["optional"] === "boolean")
    );
    void (
        "plural" in input &&
        (value = value && typeof input["plural"] === "boolean")
    );

    return value;
}

export function isWithModifiersResource(
    input: any
): input is WithModifiers<ResourceBase> {
    if (!input || typeof input != "object") return false;

    if (!checkModifiers(input)) return false;

    if ("field" in input) {
        return isResourceBase(input["field"]);
    }
    return false;
}

export function isWithModifiersBaseType(
    input: any
): input is WithModifiers<BaseType> {
    if (!input || typeof input != "object") return false;

    if (!checkModifiers(input)) return false;

    if ("type" in input) {
        return isBaseType(input["type"]);
    }
    return false;
}

export function isWithModifiers<T extends any = any>(
    input: T
): input is T extends WithModifiers<infer U> ? U : T {
    return isWithModifiersBaseType(input) || isWithModifiersResource(input);
}

export type Base = BaseType | WithModifiers<BaseType>;

export function isBase(input: any): input is Base {
    return isBaseType(input) || isWithModifiersBaseType(input);
}

export type WithOneof<
    T extends Base | ResourceBase | WithModifiers<ResourceBase>
> = (T extends Base
    ? {
          types: Base[];
      }
    : { fields: T[] }) & { oneof: true };

export function isWithOneof<T extends any = any>(
    input: any
): input is T extends WithOneof<infer U> ? U : T {
    if (!input || typeof input != "object" || input["oneof"] !== true)
        return false;

    if (Array.isArray(input["types"])) {
        return input["types"].every((entry) => isBase(entry));
    }

    if (Array.isArray(input["fields"])) {
        return input["fields"].every(
            (entry) => isWithModifiersResource(input) || isResourceBase(entry)
        );
    }

    return false;
}

export function isResourceBase(input: any): input is ResourceBase {
    if (!input || typeof input != "object" || Array.isArray(input))
        return false;
    return Object.values(input).every(
        (entry) =>
            isBase(entry) ||
            isWithModifiersResource(entry) ||
            isWithOneof(entry) ||
            isResourceBase(entry)
    );
}

export interface ResourceBase {
    [key: string]:
        | Base
        | WithModifiers<ResourceBase>
        | WithOneof<Base | ResourceBase | WithModifiers<ResourceBase>>
        | ResourceBase;
}

export interface Resource extends ResourceBase {
    identifier: string;
}

export function isResource(input: any): input is Resource {
    if (!input || typeof input !== "object") return false;

    return (
        typeof input["identifier"] === "string" &&
        isResourceBase(input)
    );
}
