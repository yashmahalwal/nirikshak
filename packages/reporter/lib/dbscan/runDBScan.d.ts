import { ChildProcessOutput } from ".";
export interface ChildProcessInput<T> {
    dataset: T[];
    epsilon: number;
    minPoints: number;
}
export declare function runDBScanParallel<T>(input: ChildProcessInput<T>): Promise<ChildProcessOutput<T>>;
