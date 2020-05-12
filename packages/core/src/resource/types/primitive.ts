export type LiteralBase = string | number | null | boolean;

export function isLiteralBase(input: any): input is LiteralBase {
    const c = typeof input;
    switch (c) {
        case "number":
        case "string":
        case "boolean":
            return true;
        default:
            return input === null;
    }
}

export type NakedLiteral = LiteralBase | LiteralBase[];

export function isNakedLiteral(input: any): input is NakedLiteral {
    if (Array.isArray(input)) {
        return input.every((val) => isLiteralBase(val));
    } else return isLiteralBase(input);
}

export interface LiteralObject {
    literals: LiteralBase | Array<LiteralBase | LiteralObject>;
}

export function isLiteralObject(input: any): input is LiteralObject {
    if (!input || typeof input !== "object") return false;

    if ("literals" in input && Array.isArray(input["literals"])) {
        return input["literals"].every(
            (val) => isNakedLiteral(val) || isLiteralObject(val)
        );
    }
    return false;
}

export type Literal = NakedLiteral | LiteralObject;

export function isLiteral(input: any) {
    return isNakedLiteral(input) || isLiteralObject(input);
}

export function normalizeLiteral(input: Literal): LiteralObject {
    if (isLiteralObject(input)) return input;

    return {
        literals: input,
    };
}
