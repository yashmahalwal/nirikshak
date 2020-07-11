"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DBScan {
    constructor(dataset, epsilon, minPts, distance) {
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
    regionQuery(id) {
        const neighbours = new Set();
        for (const point of this.dataset) {
            const distance = this.distance(point, id);
            if (distance < this.epsilon)
                neighbours.add(point);
        }
        return neighbours;
    }
    addToCluster(id, cluster) {
        cluster.push(id);
        this.assigned.set(id, true);
    }
    expandCluster(cluster, neighbours) {
        for (const neighbour of neighbours) {
            if (!this.visited.get(neighbour)) {
                this.visited.set(neighbour, true);
                const neighboursOfNeighbour = this.regionQuery(neighbour);
                if (neighboursOfNeighbour.size >= this.minPts)
                    for (const entry of neighboursOfNeighbour)
                        neighbours.add(entry);
            }
            if (!this.assigned.get(neighbour))
                this.addToCluster(neighbour, cluster);
        }
    }
    run() {
        for (const point of this.dataset)
            if (!this.visited.get(point)) {
                // Visit the point if not visited
                this.visited.set(point, true);
                const neighbours = this.regionQuery(point);
                if (neighbours.size < this.minPts)
                    this.noise.push(point);
                else {
                    const cluster = [];
                    this.clusters.push(cluster);
                    this.addToCluster(point, cluster);
                    this.expandCluster(cluster, neighbours);
                }
            }
        return { clusters: this.clusters, noise: this.noise };
    }
}
exports.default = DBScan;
//# sourceMappingURL=dbscan.js.map