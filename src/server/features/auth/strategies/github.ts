import { Request } from 'express';
import { Strategy } from 'passport-github2';
import { GetUserModel, UserModelType } from '../mongo/user';
import { GetAccountModel, AccountModelType } from '../mongo/account';
import { config } from '../../config';

interface AuthRequest extends Request {
    session: any;
}

// let userModel: UserModelType;
let accountModel: AccountModelType;

export function createStrategy() {
    // userModel = GetUserModel();
    accountModel = GetAccountModel();
    console.log('features.auth.strategies.github.createStrategy');
    return new Strategy({
            clientID: config.GithubClientID, 
            clientSecret: config.GithubClientSecret, 
            callbackURL: config.GithubCallbackURL, 
            passReqToCallback: true
        }, function(req: AuthRequest, accessToken: string, refreshToken: string, profile: any, done: any) {
            console.log('features.auth.strategies.github.req.session.socketId,socketUserId', req.session.socketId, req.session.socketUserId);
            console.log('features.auth.strategies.github.req.sessionID,session', req.sessionID, req.session);
            console.log('features.auth.strategies.github.req.user', req.user);
            console.log('features.auth.strategies.github.accessToken.refreshToken', accessToken, refreshToken);
            console.log('features.auth.strategies.github.profile', profile);
            var account = new accountModel();
            account.domain = 'github.com';
            account.uid = profile.id;
            account.username = profile.username;
            account.displayName = profile.displayName;
            account.avatar_url = profile._json.avatar_url;
            var t = {
                kind: 'oauth', 
                token: accessToken, 
                attributes: {
                    refreshToken: refreshToken
                }
            };
            account.tokens.push(t);
            return done(null, account);
        });
}
