import { FakerType, isFakerType } from "./fakerTypes";
import { Literal, isLiteral } from "./literals";
import { CustomFunctionType, isCustomFunction } from "./custom";

// Base type: Simple literals that a resource field can have
export type BaseType =
    | FakerType
    | CustomFunctionType
    | Literal
    | Array<BaseType>;

// Validation for the same
export function isBaseType(input: any): input is BaseType {
    if (Array.isArray(input)) return input.every((entry) => isBaseType(entry));

    // Ordering is important
    return isFakerType(input) || isCustomFunction(input) || isLiteral(input);
}

// Higher order type: Adding modifiers to a resource field entry
// A resource base field can be: Base Type or another Resource base
// You can add nullable, plural or optional here
// Ex: {type: "faker:random.words", nullable: true}
// Ex: {field: {name: "custom:myName"}, plural: true}
export type WithModifiers<
    T extends BaseType | ResourceBase
> = (T extends BaseType
    ? {
          type: BaseType;
      }
    : {
          field: ResourceBase;
      }) & { plural?: boolean; nullable?: boolean; optional?: boolean };

// Checking the validity of the modifier fields of the HOT
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

// type guard: WithModifiers<ResourceBase>
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

// type guard: WithModifies<BaseType>
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

// type guard: WithModifiers<BaseType> or WithModifiers<ResourceBase>
// Infers from input
export function isWithModifiers<T extends any = any>(
    input: T
): input is T extends WithModifiers<infer U> ? U : T {
    return isWithModifiersBaseType(input) || isWithModifiersResource(input);
}

// Selecting one from multiple choices
export type OneOfEntries =
    | {
          fields?: Array<ResourceBase | WithModifiers<ResourceBase>>;
          types: Array<BaseType | WithModifiers<BaseType>>;
      }
    | {
          fields: Array<ResourceBase | WithModifiers<ResourceBase>>;
          types?: Array<BaseType | WithModifiers<BaseType>>;
      }
    | {
          fields: Array<ResourceBase | WithModifiers<ResourceBase>>;
          types: Array<BaseType | WithModifiers<BaseType>>;
      };

//   type guard: OneOfEntries
export function isOneOfEntries(input: any): input is OneOfEntries {
    if (!input || typeof input !== "object") return false;
    if (!Array.isArray(input["fields"]) && !Array.isArray(input["types"]))
        return false;

    let value = true;
    value =
        value &&
        (Array.isArray(input["types"])
            ? input["types"].every(
                  (entry) => isBaseType(entry) || isWithModifiersBaseType(entry)
              )
            : true);

    value =
        value &&
        (Array.isArray(input["fields"])
            ? input["fields"].every(
                  (entry) =>
                      isResourceBase(entry) || isWithModifiersResource(entry)
              )
            : true);

    return value;
}

// type guard: ResourceBase
export function isResourceBase(input: any): input is ResourceBase {
    if (!input || typeof input != "object" || Array.isArray(input))
        return false;
    return Object.keys(input).every(
        (key) =>
            isBaseType(input[key]) ||
            isWithModifiersBaseType(input[key]) ||
            isWithModifiersResource(input[key]) ||
            isOneOfEntries(input[key]) ||
            isResourceBase(input[key])
    );
}

// A basic key value pair
export interface ResourceBase {
    [key: string]:
        | BaseType
        | WithModifiers<BaseType>
        | WithModifiers<ResourceBase>
        | OneOfEntries
        // Check for resource base at last as it matches any key
        | ResourceBase;
}

// A resource schema is a resource base along with an identifier field
export interface Resource extends ResourceBase {
    identifier: string | number;
}

// type guard: isResource
export function isResource(input: any): input is Resource {
    if (!input || typeof input !== "object") return false;

    return (
        (typeof input["identifier"] === "string" ||
            typeof input["identifier"] === "number") &&
        isResourceBase(input)
    );
}
