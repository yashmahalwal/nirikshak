"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbscan_1 = __importDefault(require("./dbscan"));
var distanceFunction_1 = require("./distanceFunction");
process.on("message", function (message) {
    var dbscan = new dbscan_1.default(message.dataset, message.epsilon, message.minPoints, distanceFunction_1.distance);
    var _a = dbscan.run(), clusters = _a.clusters, noise = _a.noise;
    var response = {
        clusters: clusters,
        noise: noise,
    };
    process.send && process.send(response);
    process.exit();
});
if (process.send)
    process.send("Ready");
//# sourceMappingURL=child.js.map