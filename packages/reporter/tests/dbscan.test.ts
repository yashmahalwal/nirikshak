import DBScan from "../src/dbscan/dbscan";

test("DB Scan", () => {
    const dataset: [number, number][] = [
        [1, 1],
        [0, 1],
        [1, 0],
        [10, 10],
        [10, 13],
        [13, 13],
        [54, 54],
        [55, 55],
        [89, 89],
        [57, 55],
    ];
    const dbscan = new DBScan(
        dataset,
        5,
        2,
        (a: [number, number], b: [number, number]) => {
            return Math.sqrt(
                (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
            );
        }
    );

    const { clusters, noise } = dbscan.run();
    expect(noise.length).toBe(1);
    expect(noise[0]).toBe(dataset[8]);
    expect(clusters.length).toBe(3);
    expect(clusters.some((e) => e.includes(dataset[8]))).toBe(false);
    expect(clusters[0]).toEqual([dataset[0], dataset[1], dataset[2]]);
    expect(clusters[1]).toEqual([dataset[3], dataset[4], dataset[5]]);
    expect(clusters[2]).toEqual([dataset[6], dataset[7], dataset[9]]);
});
