import { Document } from "mongoose";
import { commonTypes } from '../../../common';

export type PackyFiles = commonTypes.PackyFiles;

export type TemplateList = string[];

export type Template = {
    name: string;
    files: PackyFiles;
}

export type IUser = {
    userId: string;
    email: string;
    createdAt: Date;
    lastAccess: Date;
}

export interface IUserModel extends IUser, Document {}

export type IPacky = {
    userId: string;
    repoOwner: string;
    repoName: string;
    clonedAt: Date;
    lastCommitWhenCloned: string;
}

export interface IPackyModel extends IPacky, Document {}
