import { Schema, Model, model } from "mongoose";
import { ModelBuilderType } from "../../app/types";
import { IPackyModel } from "../types";
import { UserModel } from "./user";

const PackySchema: Schema<IPackyModel> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',     
    },
    repoOwner: String,
    repoName: String,
    clonedAt: Date,
    lastCommitWhenCloned: String,
});

// mongoose models creation is centralized
// mongodb calls buildModel() when starting, after connection has been established
// controllers call PackyModel() when initialized, after buildModel() has benn called
export type PackyModelType = Model<IPackyModel>;
let packyModel: PackyModelType;
export function PackyModel() : PackyModelType {
    return packyModel;
}
export const PackyModelBuilder: ModelBuilderType = {
    buildModel: () => {
        packyModel = model<IPackyModel>("Packy", PackySchema);
    }
}