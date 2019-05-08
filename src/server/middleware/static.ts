import * as path from 'path';
import { Application, static as expressStatic } from 'express';
import { MiddlewareType } from '../features/app/types';

export const StaticFilesMiddleware: MiddlewareType = (app: Application) => {
    console.log('StaticFilesMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', '..', 'static'))
    app.use('/static', expressStatic(path.resolve(__dirname, '..', '..', '..', 'static')));
    // simply browse ittfs when IttfDocumentsMiddleware is not used
    // app.use('/ittf', expressStatic(path.resolve(__dirname, '..', '..', '..', 'ittf')));
}