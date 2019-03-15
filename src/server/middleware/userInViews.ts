import { Application, Request, Response, RequestHandler } from 'express';
import { MiddlewareType } from '../features/app/types';

/**
 * The purpose of this middleware is to have the `user`
 * object available for all views.
 *
 */
export const UserInViewMiddleware: MiddlewareType = (app: Application) => {
    app.use((req: Request, res: Response, next) => {
        res.locals.user = req.user;
        next();
    });
}