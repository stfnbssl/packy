import { Application } from 'express';
import * as cors from 'cors';
import { MiddlewareType } from '../features/app/types';

export const CorsMiddleware: MiddlewareType = (app: Application) => {
    app.use(cors());
}
