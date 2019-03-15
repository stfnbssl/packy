import { Application } from 'express';
import * as compression from 'compression';
import { MiddlewareType } from '../features/app/types';

export const CompressionMiddleware: MiddlewareType = (app: Application) => {
    app.use(compression());
}
