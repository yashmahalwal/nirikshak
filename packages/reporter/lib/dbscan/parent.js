"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDBScanParallel = void 0;
const path_1 = __importDefault(require("path"));
const dbscan_1 = __importDefault(require("./dbscan"));
const distanceFunction_1 = require("./distanceFunction");
const program = path_1.default.resolve(__dirname, "../../lib/dbscan", "child.js");
function runDBScanParallel(input) {
    return new Promise((resolve) => {
        const dbscan = new dbscan_1.default(input.dataset, input.epsilon, input.minPoints, distanceFunction_1.distance);
        const response = dbscan.run();
        resolve(response);
        // const child = childProcess.fork(program, [], {
        //     stdio: ["inherit", "inherit", "inherit", "ipc"],
        // });
        // child.on("message", (message) => {
        //     if (message === "Ready") child.send(input);
        //     else resolve(message as ChildProcessOutput<T>);
        // });
    });
}
exports.runDBScanParallel = runDBScanParallel;
//# sourceMappingURL=parent.js.map