export default class DBScan<T> {
    private dataset;
    private epsilon;
    private minPts;
    private distance;
    private visited;
    private noise;
    private assigned;
    private clusters;
    constructor(dataset: T[], epsilon: number, minPts: number, distance: (a: T, b: T) => number);
    private regionQuery;
    private addToCluster;
    private expandCluster;
    run(): [T[][], T[]];
}
