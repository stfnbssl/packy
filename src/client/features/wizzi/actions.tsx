import { createStandardAction } from 'typesafe-actions';
import { storeTypes } from '../../store';
import { packyTypes } from '../packy';
import { GeneratedArtifact } from './types';

const GENERATE_ARTIFACT_REQUEST = '@@wizzi/GENERATE_ARTIFACT_REQUEST';
const GENERATE_ARTIFACT_SUCCESS = '@@wizzi/GENERATE_ARTIFACT_SUCCESS';
const GENERATE_ARTIFACT_ERROR = '@@wizzi/GENERATE_ARTIFACT_ERROR';

export interface ArtifactRequestPayload  {
    filePath: string;
    files: packyTypes.PackyFiles;
};

export interface ArtifactResponsePayload extends storeTypes.ResponsePayload {
    generatedArtifact: GeneratedArtifact;
};

export const generateArtifactRequest = createStandardAction(GENERATE_ARTIFACT_REQUEST)<ArtifactRequestPayload>();
export const generateArtifactSuccess = createStandardAction(GENERATE_ARTIFACT_SUCCESS)<ArtifactResponsePayload>();
export const generateArtifactError = createStandardAction(GENERATE_ARTIFACT_ERROR)<any>();
