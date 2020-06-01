import Graph from "graph-data-structure";
import { NodeName } from "./nodeTypes";

function traverseFromNode(
    graph: ReturnType<typeof Graph>,
    steps: number,
    root: NodeName
): NodeName[][] {
    if (!graph.nodes().includes(root))
        throw new Error(`Invalid node: ${root}. Does not exist in the graph`);
    if (steps < 1)
        throw new Error(`Invalid number of steps for traversal: ${steps}`);

    const neighbours = graph.adjacent(root);
    if (steps === 1 || !neighbours.length) return [[root]];

    const traversals: NodeName[][] = [];
    for (const neighbour of neighbours) {
        traverseFromNode(graph, steps - 1, neighbour).forEach((traversal) =>
            traversals.push([root, ...traversal])
        );
    }
    return traversals;
}

export function traverseGraph(
    graph: ReturnType<typeof Graph>,
    steps: number
): NodeName[][] {
    const traversal: NodeName[][] = [];

    const nodes = graph.nodes();
    for (const node of nodes)
        traversal.push(...traverseFromNode(graph, steps, node));

    return traversal;
}
