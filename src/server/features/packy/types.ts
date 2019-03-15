import { Document } from "mongoose";

type RequiredPackyFileAttributes = {
    contents: string;
    type: 'ASSET' | 'CODE';
    generated?: true;
};
  
export type PackyFiles = {
    [x: string]: RequiredPackyFileAttributes;
};

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