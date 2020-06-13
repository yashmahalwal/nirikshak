"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbscan_1 = __importDefault(require("./dbscan"));
const distanceFunction_1 = require("./distanceFunction");
const process_1 = __importDefault(require("process"));
process_1.default.on("message", (message) => {
    const dbscan = new dbscan_1.default(message.dataset, message.epsilon, message.minPoints, distanceFunction_1.distance);
    const response = dbscan.run();
    process_1.default.send && process_1.default.send(response);
    process_1.default.exit();
});
process_1.default.send && process_1.default.send("Ready");
//# sourceMappingURL=child.js.map