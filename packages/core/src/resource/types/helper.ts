import { CustomFunction, CustomFunctionType, isCustomFunction } from "../../common/types/custom";
import { Literal, isLiteral } from "../../common/types/literals";
import { FakerType, isFakerType } from "../../common/types/fakerTypes";
import { ResourceBase, isResourceBase } from ".";

// Helpers for resources
export interface ResourceHelpers {
    [key: string]: CustomFunction;
}

// Ultimately, a resource fields ends in Primitive type
// Ex: {age: 23}
// Ex: {address: [{zipCode: "370445"}, {zipCode: "121342"}], classes: [1,2,3,4,5]}
export type Primitives = Literal | Array<Primitives>;

// An instance is of the following type
export interface ResourceInstance {
    id: Exclude<Primitives, Array<any> | null | boolean>;
    [key: string]:
        | Primitives
        | Omit<ResourceInstance, "id">
        | Array<Omit<ResourceInstance, "id">>;
}

export function isPrimitives(input: any): input is Primitives {
    if (Array.isArray(input)) return input.every((i) => isPrimitives(i));
    return isLiteral(input);
}

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
export function isWithModifiers(
    input: any
): input is WithModifiers<BaseType> | WithModifiers<ResourceBase> {
    return isWithModifiersBaseType(input) || isWithModifiersResource(input);
}

// Selecting one from multiple choices
export type OneOfEntries =
    | {
          types: Array<BaseType | WithModifiers<BaseType>>;
      }
    | {
          fields: Array<ResourceBase | WithModifiers<ResourceBase>>;
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

    if (Array.isArray(input["fields"]) && !input["fields"].length) return false;
    if (Array.isArray(input["types"]) && !input["types"].length) return false;

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

