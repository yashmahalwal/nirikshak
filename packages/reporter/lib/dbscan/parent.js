"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDBScanParallel = void 0;
var child_process_1 = __importDefault(require("child_process"));
var path_1 = __importDefault(require("path"));
var program = path_1.default.resolve(__dirname, "../../lib/dbscan", "child.js");
function runDBScanParallel(input) {
    return new Promise(function (resolve) {
        var child = child_process_1.default.spawn("node", [program], {
            stdio: ["ipc", "inherit", "inherit"],
        });
        child.on("message", function (message) {
            if (message === "Ready")
                child.send(input);
            else
                resolve(message);
        });
    });
}
exports.runDBScanParallel = runDBScanParallel;
//# sourceMappingURL=parent.js.map