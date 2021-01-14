import { Schema, Model, model } from "mongoose";
import { ModelBuilderType } from "../../app/types";
import { IPackiModel } from "../types";

const PackiSchema: Schema<IPackiModel> = new Schema({
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
// controllers call PackiModel() when initialized, after buildModel() has benn called
export type PackiModelType = Model<IPackiModel>;
let packiModel: PackiModelType;
export function GetPackiModel() : PackiModelType {
    return packiModel;
}
export const PackiModelBuilder: ModelBuilderType = {
    buildModel: () => {
        packiModel = model<IPackiModel>("Packi", PackiSchema);
    }
}