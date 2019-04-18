import * as passport from 'passport';
const jwt = require('express-jwt');
import { GetUserModel } from './mongo/user';
import { GetAccountModel, AccountModelType } from './mongo/account';
import { createStrategy as createLocalStrategy } from './strategies/local';
import { createStrategy as createGithubStrategy} from './strategies/github';
import { resolve } from 'path';
import { rejects } from 'assert';
let initialized = false;
function initPassport() {
    const userModel = GetUserModel();
    passport.use(createLocalStrategy());
    passport.use(createGithubStrategy());
    passport.serializeUser(function(user: { id: string }, done) {
        console.log('features.auth.manager.serializeUser.user', user);
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        console.log('features.auth.manager.deserializeUser.id', id);
        userModel.findById(id, function(err, user) {
            console.log('features.auth.manager.deserializeUser.err, user', err, user);
            done(err, user || false);
        });
    });
    initialized = true;
}
function getTokenFromHeaders(req: any) {
    const {
        headers: {
            authorization
        }
    } = req;
    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
}
export function getPassport() {
    if (initialized == false) {
        initPassport();
    }
    return passport;
}
export function authenticate(strategyName: string, options: passport.AuthenticateOptions, callback?: any) {
    return passport.authenticate(strategyName, options, callback);
}
export async function getAccessTokenFromAccount(uid: string, domain: string): Promise<string> {
    const AccountModel = GetAccountModel();
    return new Promise((resolve, reject) => {
        AccountModel.findOne({
            uid, domain
        }, (err, account) => {
            if (err) {return reject(err);}
            if (account) {
                return resolve(account.tokens[0].token);
            } else {
                return reject('Token not found');
            }
        });
    })
}
export async function getLoggedUserFromAccount(uid: string, domain: string): Promise<any> {
    const AccountModel = GetAccountModel();
    return new Promise((resolve, reject) => {
        AccountModel.findOne({
            uid, domain
        }, (err, account) => {
            if (err) {return reject(err);}
            if (account) {
                return resolve({
                    _id: 'Unavailable',
                    uid: uid,
                    username: account.username,
                    displayName: account.displayName,
                    picture: account.avatar_url
                });
            } else {
                return reject('Account not found');
            }
        });
    })
}
export const jwtAuth = {
    required: jwt({
        secret: 'secret', 
        userProperty: 'payload', 
        getToken: getTokenFromHeaders
    }), 
    optional: jwt({
        secret: 'secret', 
        userProperty: 'payload', 
        getToken: getTokenFromHeaders, 
        credentialsRequired: false
    })
};