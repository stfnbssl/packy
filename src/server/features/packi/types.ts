import { Document } from "mongoose";
import { commonTypes } from '../../../common';

export type PackiFiles = commonTypes.PackiFiles;

export type TemplateList = string[];

export type Template = {
    name: string;
    files: PackiFiles;
}

export type IUser = {
    userId: string;
    email: string;
    createdAt: Date;
    lastAccess: Date;
}

export interface IUserModel extends IUser, Document {}

export type IPacki = {
    userId: string;
    repoOwner: string;
    repoName: string;
    clonedAt: Date;
    lastCommitWhenCloned: string;
}

export interface IPackiModel extends IPacki, Document {}
