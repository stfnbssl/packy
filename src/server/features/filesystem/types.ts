import { FileDef } from 'wizzi-utils';

export type FsDb = {
    getPackyTemplatesList: () => Promise<string[]>;
    getPackyTemplate: (name: string) => Promise<FileDef[]>;
    getStarterTemplate: () => Promise<FileDef[]>;
}