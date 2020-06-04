export interface Configuration {
    dir: string;
    resources: Array<string | { name: string; dir: string }>;
}

export interface CliArgs {
    configuration: Configuration;
}

type ProjectConfig = { displayName: string; testMatch: string[] };
export interface JestConfig {
    projects?: ProjectConfig[];
    setupFilesAfterEnv: string[];
}
