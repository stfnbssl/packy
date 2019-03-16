type RequiredPackyFileAttributes = {
    contents: string;
    type: 'ASSET' | 'CODE';
    generated?: boolean;
    bothRealAndGenerated?: boolean;
};
  
export type PackyFiles = {
    [x: string]: RequiredPackyFileAttributes;
};

export type GitRepositoryMeta = {
    owner: string;
    name: string;
    description: string;
    branches: string[];
};
  
export type ClonedGitRepository = {
    owner: string;
    name: string;
    description: string;
    branch: string;
    commitHistory: any;
    files: PackyFiles;
};

  