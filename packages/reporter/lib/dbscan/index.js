"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbscan_1 = __importDefault(require("./dbscan"));
process.on("message", function (message) {
    var dbscan = new dbscan_1.default(message.dataset, message.epsilon, message.minPoints, function (a, b) {
        return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
    });
    var _a = __read(dbscan.run(), 2), clusters = _a[0], noise = _a[1];
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