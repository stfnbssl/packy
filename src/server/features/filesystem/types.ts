import { FileDef } from 'wizzi-utils';
import { packyTypes} from '../packy'

export type FsDbResult = {
    writtenCount?: number;
    deletedCount?: number;
}

export type FsDb = {
    getPackyTemplatesList: () => Promise<string[]>;
    getPackyTemplate: (name: string) => Promise<FileDef[]>;
    getStarterTemplate: () => Promise<FileDef[]>;
    savePackyTemplate: (id: string, files: packyTypes.PackyFiles) => Promise<FsDbResult>;
}