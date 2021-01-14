import { FileDef } from 'wizzi-utils';
import { packiTypes} from '../packi'

export type FsDbResult = {
    writtenCount?: number;
    deletedCount?: number;
}

export type FsDb = {
    getPackiTemplatesList: () => Promise<string[]>;
    getPackiTemplate: (name: string) => Promise<FileDef[]>;
    getStarterTemplate: () => Promise<FileDef[]>;
    savePackiTemplate: (id: string, files: packiTypes.PackiFiles) => Promise<FsDbResult>;
}