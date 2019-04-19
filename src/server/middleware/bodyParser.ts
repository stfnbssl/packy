import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MiddlewareType } from '../features/app/types';

export const BodyParserMiddleware: MiddlewareType = (app: Application) => {
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));        
}
