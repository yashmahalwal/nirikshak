import figlet from "figlet";
declare const figletPromise: (message: string, options?: figlet.Options | undefined) => Promise<string>;
export default figletPromise;
