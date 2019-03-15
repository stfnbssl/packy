import { Request, Response } from 'express';

/**
 * This is an example middleware that checks if the user is logged in.
 *
 * If the user is not logged in, it stores the requested url in `returnTo` attribute
 * and then redirects to `/account/login`.
 *
 */
export default function getSecured () {
    console.log('getSecured called');
    return function secured(req: Request, res: Response, next: Function) {
        console.log('secured called', req.user);
        if (req.user) { return next(); }
        (req.session as any).returnTo = req.originalUrl;
        res.redirect('/account/login');
    };
};
  