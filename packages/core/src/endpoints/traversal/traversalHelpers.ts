import { ResourceInstance } from "../../resource/types/helper";
import { SchemaHelpers } from "../../common/types/helpers";
export interface TraversalHelperFunctions {
    (
        input: any,
        resourceInstance: ResourceInstance,
        helpers: SchemaHelpers,
        ...args: any[]
    ): boolean;
}

export type TraversalHelpers = Record<string, TraversalHelperFunctions>;
