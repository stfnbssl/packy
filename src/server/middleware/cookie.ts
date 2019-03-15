import { Application, Request, Response, RequestHandler } from 'express';
import { MiddlewareType } from '../features/app/types';
import * as cookieParser from 'cookie-parser';

export const CookieMiddleware: MiddlewareType = (app: Application) => {
    app.use(cookieParser());
}