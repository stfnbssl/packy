export type GeneratedArtifact = {
    artifactContent?: string;
    sourcePath: string;
    artifactGenerator: string;
    errorMessage?: string;
    errorLines?: string[];
    errorStack?: string;
    errorName?: string;
    isError?: boolean;
}