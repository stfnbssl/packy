import { Schema, Model, model} from "mongoose";
import { ModelBuilderType } from "../../app/types";
import { IUserModel } from "../types";

const UserSchema: Schema<IUserModel> = new Schema({
    email: {
        type: String,
    },
    nickname: String,
    social_user_id: String,
    createdAt: Date,
    lastAccess: Date,
    packies: [{ type: Schema.Types.ObjectId, ref: 'Packy' }]
});

// mongoose models creation is centralized
// mongodb calls buildModel() when starting, after connection has been established
// controllers call UserModel() when initialized, after buildModel() has benn called
export type UserModelType_stop = Model<IUserModel>;
let userModel: UserModelType_stop;
export function GetUserModel_stop() : UserModelType_stop {
    return userModel;
}
export const UserModelBuilder: ModelBuilderType = {
    buildModel: () => {
        userModel = model<IUserModel>("User", UserSchema);
    }
}