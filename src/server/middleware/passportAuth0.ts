import { Application, Request, Response, RequestHandler, CookieOptions } from 'express';
import { MiddlewareType } from '../features/app/types';
import * as passport from 'passport';
import { Strategy as Auth0Strategy } from 'passport-auth0';
import { config } from '../features/config';
 
// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
    {
        domain: config.Auth0Domain,
        clientID: config.Auth0PackyClientId,
        clientSecret: config.Auth0PackyClientSecret,
        callbackURL: config.Auth0PackyCallbackUrl
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

export const PassportAuth0Middleware: MiddlewareType = (app: Application) => {
    passport.use(strategy);
    // You can use this section to keep a smaller payload
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    app.use(passport.initialize());
    app.use(passport.session());
}