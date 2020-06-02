import { Description, MethodType, Cases } from "../types";
import { NodeMap, serializeNodeName } from "./nodeTypes";

export function generateNodes(description: Description): NodeMap {
    const nodeMap: NodeMap = new Map();
    for (const method in description) {
        const entry = description[method as MethodType];
        const methodArr = Array.isArray(entry) ? entry : [entry];

        for (let i = 0; i < methodArr.length; i++) {
            const methodEntry = methodArr[i];
            for (const caseValue in methodEntry?.output) {
                const caseArr = Array.isArray(methodEntry?.output[caseValue])
                    ? methodEntry?.output[caseValue]
                    : [methodEntry?.output[caseValue]];
                for (let j = 0; j < caseArr.length; j++) {
                    nodeMap.set(
                        serializeNodeName(
                            method as MethodType,
                            i,
                            methodEntry!.url,
                            caseValue as Cases,
                            j
                        ),
                        {
                            input: methodEntry!.input,
                            url: methodEntry!.url,
                            output: caseArr[j],
                        }
                    );
                }
            }
        }
    }

    return nodeMap;
}
