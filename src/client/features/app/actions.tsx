import { createStandardAction } from 'typesafe-actions';
import { Viewer } from './types';
const UPDATE_VIEWER = '@@app/UPDATE_VIEWER';
export const updateViewer = createStandardAction(UPDATE_VIEWER)<Viewer>();
