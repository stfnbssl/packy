import * as filelistTypes from './types';
import * as fileUtils from './fileUtilities';
import closeEntry from './actions/closeEntry';
import createEntryAtPath from './actions/createEntryAtPath';
import createNewEntry from './actions/createNewEntry';
import expandEntry from './actions/expandEntry';
import openEntry from './actions/openEntry';
import pasteEntry from './actions/pasteEntry';
import recursivelyCreateParents from './actions/recursivelyCreateParents';
import renameEntry from './actions/renameEntry';
import selectEntry from './actions/selectEntry';
import updateEntry from './actions/updateEntry';

const fileActions = {
    closeEntry,
    createEntryAtPath,
    createNewEntry,
    expandEntry,
    openEntry,
    pasteEntry,
    recursivelyCreateParents,
    renameEntry,
    selectEntry,
    updateEntry,
}

export { filelistTypes, fileActions, fileUtils }