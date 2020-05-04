import path from "path";

export class PathJoiner {
  static instance: PathJoiner | null = null;
  private pathObject: Map<string, string> = new Map();

  constructor() {
    if (PathJoiner.instance) return PathJoiner.instance;
    // Add a cleanup util if there is excessive memory usage
  }

  join(...paths: [string, string]) {
    const p = paths.join(".");
    if (this.pathObject.has(p)) return this.pathObject.get(p)!;

    const val = path.join(...paths);
    this.pathObject.set(p, val);
    return val;
  }
}
