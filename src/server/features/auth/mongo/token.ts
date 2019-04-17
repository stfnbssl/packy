import { Schema, Model, model } from "mongoose";
import { ModelBuilderType } from "../../app/types";
import { ITokenModel } from "../types";

export const TokenSchema = new Schema({
    kind: {
        type: String
    }, 
    token: {
        type: String
    }, 
    attributes: {
        type: Map, 
        of: String
    }
});

export type TokenModelType = Model<ITokenModel>;
let tokenModel: TokenModelType;
export function GetTokenModel() {
    return tokenModel;
}
export const TokenModelBuilder: ModelBuilderType = {
    buildModel: () => {
        tokenModel = model('Token', TokenSchema)
    }
};