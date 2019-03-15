import { Application, Request, Response, RequestHandler, CookieOptions } from 'express';
import { MiddlewareType } from '../features/app/types';
import * as session from 'express-session';
import * as mongoSessionStore from 'connect-mongo';
import * as mongoose from 'mongoose';
import { config } from '../features/config';

export const SessionMiddleware: MiddlewareType = (app: Application) => {
    const MongoStore = mongoSessionStore(session);
    const cookieOptions: CookieOptions = {
        // serve secure cookies, requires https
        secure: app.get('env') === 'production' ? true : false,
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
    }
    const sessionOptions: session.SessionOptions = {
        name: 'packy-backend.sid',
        secret: config.sessionSecret,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 14 * 24 * 60 * 60, // save session 14 days
          }),
        cookie: cookieOptions,
        resave: false,
        saveUninitialized: false
    };
    /*
    if (!dev) {
        server.set('trust proxy', 1); // trust first proxy
    }
    */
    app.use(session(sessionOptions));
}