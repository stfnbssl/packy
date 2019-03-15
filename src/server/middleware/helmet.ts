import { Application } from 'express';
import * as helmet from 'helmet';
import { MiddlewareType } from '../features/app/types';

export const HelmetMiddleware: MiddlewareType = (app: Application) => {
    app.use(helmet());
}
