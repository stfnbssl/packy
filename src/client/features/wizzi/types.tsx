export type GeneratedArtifact = {
    artifactContent?: string;
    sourcePath: string;
    artifactGenerator: string;
    errorMessage?: string;
    errorLines?: string[];
    errorStack?: string;
    errorName?: string;
    errorInfo?: {[k: string]: any};
    isError?: boolean;
}

export interface WizziError {
    errorName?: string;
    errorMessage?: string;
    errorStack?: string;
}

export interface ArtifactError extends WizziError {
    errorLines?: string[];
}

export interface JobError extends WizziError {
    errorInfo?: {[k: string]: any};
}