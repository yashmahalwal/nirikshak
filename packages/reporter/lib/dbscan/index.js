"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbscan_1 = __importDefault(require("./dbscan"));
process.on("message", function (message) {
    var dbscan = new dbscan_1.default(message.dataset, message.epsilon, message.minPoints, function (a, b) {
        return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
    });
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
//# sourceMappingURL=index.js.map