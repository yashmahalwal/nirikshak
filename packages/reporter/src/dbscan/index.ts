import { ChildProcessInput } from "./runDBScan";
import DBScan from "./dbscan";

export interface ChildProcessOutput<T> {
    clusters: T[][];
    noise: T[];
}

process.on("message", (message: ChildProcessInput<[number, number]>) => {
    const dbscan = new DBScan(
        message.dataset,
        message.epsilon,
        message.minPoints,
        (a: [number, number], b: [number, number]) => {
            return Math.sqrt(
                (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
            );
        }
    );

    const {clusters, noise} = dbscan.run();

    const response: ChildProcessOutput<[number, number]> = {
        clusters,
        noise,
    };
    process.send && process.send(response);
    process.exit();
});

if (process.send) process.send("Ready");
