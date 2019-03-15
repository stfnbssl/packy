import { Application, Request, Response, RequestHandler } from 'express';
import { MiddlewareType } from '../features/app/types';

export const LoggerMiddleware: MiddlewareType = (app: Application) => {
    app.use((request: Request, response: Response, next) => {
        console.log(`${request.method} ${request.path}`);
        next();
    });
}
