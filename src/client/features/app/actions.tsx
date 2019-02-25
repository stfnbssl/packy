import { createStandardAction } from 'typesafe-actions';
import { Viewer } from './types';
const UPDATE_VIEWER = '@@app/UPDATE_VIEWER';
const SPLIT_TESTING = '@@app/SPLIT_TESTING';
export const updateViewer = createStandardAction(UPDATE_VIEWER)<Viewer>();
export const splitTestSettings = createStandardAction(SPLIT_TESTING)<Viewer>();
