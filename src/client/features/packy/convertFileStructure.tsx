import { isEntryPoint } from '../filelist/fileUtilities';
import { FileSystemEntry, FileSystemEntryDiff } from '../filelist/types';
import { PackyFiles } from './types';

const getFolders = (path: string): string[] => {
  // TODO: change this to slice and join
  const pathSegments = path.split('/');
  if (pathSegments.length === 0) {
    return [];
  }
  const result = [];
  for (
    let pathIdx = 0;
    pathIdx < pathSegments.length - 1; // do not process the last element
    pathIdx++
  ) {
    result.push(pathSegments.slice(0, pathIdx + 1).join('/'));
  }
  return result;
};
                                                   
export const packyToEntryArray = (sourceFormat: PackyFiles): FileSystemEntry[] => {
  const fileSystem: FileSystemEntry[] = [];
  const foldersInFileSystem = new Set();
  for (const filename of Object.keys(sourceFormat).sort()) {
    for (const folder of getFolders(filename)) {
      if (!foldersInFileSystem.has(folder)) {
        fileSystem.push({
          item: {
            path: folder,
            type: 'folder',
          },
          state: {},
        });
        foldersInFileSystem.add(folder);
      }
    }

    const isEntry = isEntryPoint(filename);

    fileSystem.push(
      sourceFormat[filename].type === 'ASSET'
        ? {
            item: {
              path: filename,
              type: 'file',
              uri: sourceFormat[filename].contents,
              asset: true,
            },
            state: {},
          }
        : {
            item: {
              path: filename,
              type: 'file',
              content: sourceFormat[filename].contents,
              generated: sourceFormat[filename].generated,
            },
            state: {
              isOpen: isEntry,
              isSelected: isEntry,
              isFocused: isEntry,
            },
          }
    );
  }
  return fileSystem;
};

export const realAndGeneratedPackyToEntryArray = (real: PackyFiles, generated: PackyFiles): FileSystemEntry[] => {
  const packyFiles = Object.assign({}, real);
  Object.keys(generated).forEach(k=>{
    if (real[k]) {
      generated[k].bothRealAndGenerated = true;
    }
    packyFiles[k] = generated[k]
  });
  return packyToEntryArray(packyFiles);
}

export const entryArrayToPacky = (entryArray: FileSystemEntry[]): PackyFiles => {
  const sourceResult: PackyFiles = {};
  for (const { item } of entryArray) {
    if (item.type === 'file') {
      if (item.asset) {
        sourceResult[item.path] = {
          contents: item.uri,
          type: 'ASSET', // TODO: support for different types
        };
      } else {
        sourceResult[item.path] = {
          contents: (item as any).content,
          type: 'CODE', // TODO: support for different types
        };
      }
    }
  }
  return sourceResult;
};

export const entryArrayToObject = (entryArray: FileSystemEntry[]): { [key: string]: FileSystemEntry['item'] } => {
  const entriesObject: { [key: string]: FileSystemEntry['item'] } = entryArray.reduce(
    (acc: { [key: string]: FileSystemEntry['item'] }, { item }) => {
      acc[item.path] = item;
      return acc;
    },
    {}
  );
  return entriesObject;
}

export const entryArrayDiff = (a: FileSystemEntry[], b: FileSystemEntry[]): {[k: string] : FileSystemEntryDiff} => {
  const diff: {[k: string] : FileSystemEntryDiff} = {};
  a.forEach(entry => {
    console.log('-', entry.item.path)
    diff[entry.item.path] = { kind: '-', a: entry.item };
  });
  b.forEach(entry => {
    if (diff[entry.item.path]) {
      if (diff[entry.item.path].a === entry.item){
        console.log('delete', entry.item.path)
        delete diff[entry.item.path];
      } else {
        console.log('<>', entry.item.path)
        diff[entry.item.path].kind === '<>';
        diff[entry.item.path].b === entry.item;
      }
    } else {
      console.log('+', entry.item.path)
      diff[entry.item.path] = { kind: '+', b: entry.item };
    }
  });
  return diff;
}

