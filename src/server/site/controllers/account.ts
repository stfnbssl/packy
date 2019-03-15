import { Router, Request, Response } from 'express';
import * as passport from 'passport';
import { ControllerType, AppInitializerType } from '../../features/app/types';
import { auth0ApiCalls } from '../../features/auth0';

export class AccountController implements ControllerType {
    public path = '/account';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.get(`${this.path}/login`, passport.authenticate('auth0', {
            scope: 'openid email profile'
        }), (req, res) => {
            res.redirect('/');
        });
        this.router.get(`${this.path}/callback`, this.callback);
        this.router.get(`${this.path}/logout`, this.logout);
        this.router.get(`${this.path}/user`, initValues.auth0Secured(), this.user);
    }

    private callback = async (request: Request, response: Response, next: Function) => {
        passport.authenticate('auth0', (err, user, info) => {
            if (err) { return next(err); }
            if (!user) { return response.redirect(`${this.path}/login`); }
            request.logIn(user, async (err) => {
              if (err) { return next(err); }
              const full_user = await auth0ApiCalls.getUser(user.user_id);
              console.log('full_user', full_user);
              (request.session as any).github_accessToken = full_user.identities[0].access_token;
              let returnTo = `${this.path}/user`;
              if (request.session) {
                returnTo = request.session.returnTo;
                delete request.session.returnTo;
              }
              response.redirect(returnTo || `${this.path}/user`);
            });
        })(request, response, next);
    }

    private logout = async (request: Request, response: Response) => {
        request.logout();
        response.redirect('/');
    }

    private user = async (request: Request, response: Response) => {
        const { _raw, _json, ...user } = request.user;
        response.render('account/user.html.ittf', {
          user: user,
          userProfile: JSON.stringify(user, null, 2),
          title: 'Profile page'
        });
    }

}