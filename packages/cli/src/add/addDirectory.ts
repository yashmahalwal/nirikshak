import path from "path";
import fs from "fs-extra";

export default async function addDirectory(
    dir: string,
    rootDir: string,
    resourceName: string,
    appPath: string
): Promise<void> {
    const resultant = path.resolve(rootDir, dir);
    if (await fs.pathExists(resultant))
        throw new Error(`Directory ${dir} already exists`);
    await fs.ensureDir(resultant);

    await fs.copy(
        path.resolve(__dirname, "../../staticFiles/config.json"),
        path.resolve(resultant, "config.json")
    );

    await fs.copy(
        path.resolve(__dirname, "../../staticFiles/helpers"),
        path.resolve(resultant, "helpers.ts")
    );

    await fs.copy(
        path.resolve(__dirname, "../../staticFiles/resource.json"),
        path.resolve(resultant, "resource.json")
    );

    await fs.copy(
        path.resolve(__dirname, "../../staticFiles/endpoints.json"),
        path.resolve(resultant, "endpoints.json")
    );

    const app = path.resolve(appPath);
    const test = (
        await fs.readFile(path.resolve(__dirname, "../../staticFiles/test"))
    )
        .toString()
        .replace(/{{appPath}}|{{resource}}/g, (m) => {
            if (m[2] === "r") return resourceName;
            else return app;
        });

    await fs.writeFile(
        path.resolve(resultant, `${resourceName}.test.ts`),
        test
    );
}
