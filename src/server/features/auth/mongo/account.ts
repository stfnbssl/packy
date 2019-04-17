import { Schema, Model, model } from "mongoose";
import { ModelBuilderType } from "../../app/types";
import { IAccountModel } from "../types";
import { TokenSchema } from "./token";

const AccountSchema = new Schema({
    domain: {
        type: String
    }, 
    uid: {
        type: String
    }, 
    username: {
        type: String
    }, 
    displayName: {
        type: String
    }, 
    avatar_url: {
        type: String
    }, 
    tokens: [TokenSchema]
});

export type AccountModelType = Model<IAccountModel>;
let accountModel: AccountModelType;
export function GetAccountModel(): AccountModelType {
    return accountModel;
}
export const AccountModelBuilder: ModelBuilderType = {
    buildModel: () => {
        accountModel = model<IAccountModel>('Account', AccountSchema)
    }
};