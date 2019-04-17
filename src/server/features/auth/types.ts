import { Document } from "mongoose";

export type IUser = {
    userName: string;
    realName: string;
    email: string;
    hash: string;
    salt: string;
    createdAt: Date;
    lastAccess: Date;
    setPassword(password: string): void;
    validatePassword(password: string): boolean;
    generateJWT(): any;
}
export interface IUserModel extends IUser, Document {}

export type IToken = {
    kind: string;
    token: string;
    attributes: {[k: string]: string};
}
export interface ITokenModel extends IToken, Document {}

export type IAccount = {
    domain: string;
    uid: string;
    username: string;
    displayName: string;
    avatar_url: string;
    tokens: [IToken]
}
export interface IAccountModel extends IAccount, Document {}