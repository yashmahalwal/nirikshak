"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DBScan = /** @class */ (function () {
    function DBScan(dataset, epsilon, minPts, distance) {
        this.dataset = dataset;
        this.epsilon = epsilon;
        this.minPts = minPts;
        this.distance = distance;
        this.visited = new Map();
        this.noise = [];
        this.assigned = new Map();
        this.clusters = [];
        return;
    }
    DBScan.prototype.regionQuery = function (id) {
        var e_1, _a;
        var neighbours = new Set();
        try {
            for (var _b = __values(this.dataset), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                var distance = this.distance(point, id);
                if (distance < this.epsilon)
                    neighbours.add(point);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return neighbours;
    };
    DBScan.prototype.addToCluster = function (id, cluster) {
        cluster.push(id);
        this.assigned.set(id, true);
    };
    DBScan.prototype.expandCluster = function (cluster, neighbours) {
        var e_2, _a;
        try {
            for (var neighbours_1 = __values(neighbours), neighbours_1_1 = neighbours_1.next(); !neighbours_1_1.done; neighbours_1_1 = neighbours_1.next()) {
                var neighbour = neighbours_1_1.value;
                if (!this.visited.get(neighbour)) {
                    this.visited.set(neighbour, true);
                    var neighboursOfNeighbour = this.regionQuery(neighbour);
                    if (neighboursOfNeighbour.size >= this.minPts)
                        neighbours = new Set(__spread(neighbours, neighboursOfNeighbour));
                }
                if (!this.assigned.get(neighbour))
                    this.addToCluster(neighbour, cluster);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (neighbours_1_1 && !neighbours_1_1.done && (_a = neighbours_1.return)) _a.call(neighbours_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    DBScan.prototype.run = function () {
        var e_3, _a;
        try {
            for (var _b = __values(this.dataset), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                if (!this.visited.get(point)) {
                    // Visit the point if not visited
                    this.visited.set(point, true);
                    var neighbours = this.regionQuery(point);
                    if (neighbours.size < this.minPts)
                        this.noise.push(point);
                    else {
                        var cluster = [];
                        this.clusters.push(cluster);
                        this.addToCluster(point, cluster);
                        this.expandCluster(cluster, neighbours);
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return { clusters: this.clusters, noise: this.noise };
    };
    return DBScan;
}());
exports.default = DBScan;
//# sourceMappingURL=dbscan.js.map