import * as wizzi from 'wizzi';
import { FsJson } from 'wizzi-repo';

export type Filesystemstfnbssl = {
    wf: wizzi.stfnbssl;
}

export type Jsonstfnbssl = {
    wf: wizzi.stfnbssl;
    fsJson: FsJson;
}

export type GeneratedArtifact = {
    artifactContent: string;
    sourcePath: string;
    artifactGenerator: string;
}