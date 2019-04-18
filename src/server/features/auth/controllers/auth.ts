import { Router, Request, Response } from 'express';
import { ControllerType, AppInitializerType } from '../../app/types';
import { GetAccountModel, AccountModelType } from '../mongo/account';
import {authenticate, jwtAuth, getLoggedUserFromAccount} from '../manager';
import { sendPromiseResult, sendSuccess } from '../../../utils/response';

interface AuthRequest extends Request {
    session: any;
}

export class AuthController implements ControllerType {
    public path = '/api/v1/auth';
    public router = Router();

    public initialize = (initValues: AppInitializerType) => {
        this.router.use(function (req: AuthRequest, res: Response, next: any) {
            if (req.query.socketId) {
              console.log('features.auth.controllers.auth.middleware.req.originalUrl,query', req.originalUrl, req.query);
              console.log('features.auth.controllers.auth.middleware.req.sessionID, session', req.sessionID, req.session);
              req.session.socketId = req.query.socketId;
              req.session.socketUserId = req.query.socketUserId;
            }
            next();
        });
        this.router.get(`/auth/github`, authenticate('github', {
            scope: [
                'user:email'
            ]
        }), this.githubConnect.bind(this));
        this.router.get(`/auth/github/callback`, authenticate('github', {
            failureRedirect: `${this.path}/account`
        }), this.githubConnectCallback.bind(this));
        this.router.get(`${this.path}/github/loggedin/:uid`,  this.getGithubLoggedIn);
    }
    private githubConnect(req: Request, res: Response) {
        // The request will be redirected to GitHub for authentication,
        // so this function will not be called.
    }
    private githubConnectCallback = async (req: AuthRequest, res: Response) => {
        // Successful authentication
        console.log('features.auth.controllers.auth.githubCallback.req.originalUrl,session.socketId,socketUserId', req.originalUrl, req.session.socketId, req.session.socketUserId);
        console.log('features.auth.controllers.auth.githubCallback.req.sessionID,session', req.sessionID, req.session);
        console.log('features.auth.controllers.auth.githubCallback.req.user', req.user);
        const io = req.app.get('io');
        const user = {
            id: req.user._id,
            uid: req.user.uid,
            username: req.user.username,
            displayName: req.user.displayName,
            picture: req.user.avatar_url
        };
        console.log('features.auth.controllers.auth.githubCallback.sending user via socket', 'github', req.session.socketId, req.user);
        io.in(req.session.socketId).emit('github', user);
        req.session.token = req.user.tokens[0];
        const AccountModel = GetAccountModel();
        const account = new AccountModel();
        account.domain = 'github.com';
        account.uid = req.user.uid;
        account.username = req.user.username;
        account.displayName = req.user.displayName;
        account.avatar_url = req.user.avatar_url;
        var t = {
            kind: req.user.tokens[0].kind, 
            token: req.user.tokens[0].token, 
            attributes: req.user.tokens[0].attributes
        };
        account.tokens.push(t);
        const result = await account.save();
        console.log('features.auth.controllers.auth.githubCallback.account.save.result', result);
        res.end();
    }
    private getGithubLoggedIn = async (req: AuthRequest, res: Response) => {
        const uid = req.params.uid;
        console.log('features.auth.controllers.auth.getGithubLoggedIn.uid', uid);
        const user = await getLoggedUserFromAccount(uid, 'github.com');
        sendSuccess(
            res,
            user
        );
    }
}