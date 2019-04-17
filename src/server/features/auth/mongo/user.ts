import { Schema, Model, model } from "mongoose";
import { ModelBuilderType } from "../../app/types";
import { IUserModel } from "../types";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserSchema = new Schema({
    userName: {
        type: String
    }, 
    realName: {
        type: String
    }, 
    email: {
        type: String
    }, 
    hash: {
        type: String
    }, 
    salt: {
        type: String
    }
}, {
    collection: 'users'
});
UserSchema.methods.setPassword = function(password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    console.log('features.auth.mongo.user.setPassword.salt,hash', this.salt, this.hash);
};
UserSchema.methods.validatePassword = function(password: string): boolean {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    console.log('features.auth.mongo.user.validatePassword.hash,this.hash', hash, this.hash);
    return this.hash === hash;
};
UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
            email: this.email, 
            id: this._id, 
            exp: parseInt(String(expirationDate.getTime() / 1000), 10)
        }, 'secret');
};
UserSchema.methods.toAuthJSON = function() {
    return {
            _id: this._id, 
            email: this.email, 
            token: this.generateJWT()
        };
};

export type UserModelType = Model<IUserModel>;
let userModel: UserModelType;
export function GetUserModel(): UserModelType {
    return userModel;
}
export const UserModelBuilder: ModelBuilderType = {
    buildModel: () => {
        userModel = model<IUserModel>("User", UserSchema);
    }
};
