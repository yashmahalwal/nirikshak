import { ResourceString } from "../types/resourceString";
import { ResourceInstance} from "../../resource/types/helper";
import _ from "lodash";
import { Primitives } from "../../common/types/helpers";
export function getFromResource(
    resourceString: ResourceString,
    instance: ResourceInstance
):
    | Primitives
    | Omit<ResourceInstance, "id">
    | Array<Omit<ResourceInstance, "id">> {
    const path = resourceString.slice(9);
    if (!_.has(instance, path))
        throw new Error(`Invalid resource instance path: ${path}`);
    return _.get(instance, resourceString.slice(9));
}
