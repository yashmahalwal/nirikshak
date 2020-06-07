import childProcess from "child_process";
import path from "path";
import { ChildProcessOutput } from ".";

export interface ChildProcessInput<T> {
    dataset: T[];
    epsilon: number;
    minPoints: number;
}

const program = path.resolve(__dirname, "index.ts");
export function runDBScanParallel<T>(
    input: ChildProcessInput<T>
): Promise<ChildProcessOutput<T>> {
    return new Promise((resolve) => {
        const child = childProcess.spawn("npx", ["ts-node", program], {
            stdio: ["ipc", "inherit", "inherit"],
        });

        child.on("message", (message) => {
            if (message === "Ready") child.send(input);
            else resolve(message as ChildProcessOutput<T>);
        });
    });
}
