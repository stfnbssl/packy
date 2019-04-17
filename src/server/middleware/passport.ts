import { Application } from 'express';
import { authManager } from '../features/auth';

export const PassportMiddleware = (app: Application) => {
    const passport = authManager.getPassport();
    app.use(passport.initialize());
    app.use(passport.session());
};
