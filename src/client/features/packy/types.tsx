// import { persist } from 'web-worker-proxy';
import { commonTypes } from '../../../common'

export type PackyFiles = commonTypes.PackyFiles;
export type GitRepositoryMeta = commonTypes.GitRepositoryMeta;
export type ClonedGitRepository = commonTypes.ClonedGitRepository;

export type Packy = {
  id: string;
  // created: string;
  files?: PackyFiles;
  /*
  manifest?: {
    name: string;
    description: string;
    // sdkVersion?: SDKVersion;
  };
  */
  dependencies?: {
    [key: string]: string;
  };
  history?: SaveHistory;
  isDraft?: boolean;
  localPackyData: LocalPackyData;
};

export type PackyTemplate = {
  id: string;
  files: PackyFiles;
  dependencies?: {
    [key: string]: string;
  };
};

export type PackyFilesOrKind = PackyFiles | string;
export type CreatePackyOptions = {
    data: PackyFilesOrKind
}
  
export type SaveStatus = 'changed' | 'saving-draft' | 'saved-draft' | 'publishing' | 'published';

export type SaveHistory = Array<{
  id: string;
  savedAt: string;
  isDraft?: boolean;
}>;

/*
export type PackySessionState = {
    name: string;
    description: string;
    files: PackyFiles;
    dependencies: { [key: string]: { version: string } };
    // sdkVersion: SDKVersion;
    isSaved: boolean;
    isResolving: boolean;
    loadingMessage: string | undefined;
};
*/

type Listener = ReturnType<typeof Object/*persist*/>;

// TODO should be an external type?
export type PackySessionOptions = {
    files: {
      [x: string]: {
        contents: string;
        type: 'ASSET' | 'CODE';
      };
    };
    // sdkVersion?: SDKVersion;
    verbose?: boolean;
    sessionId?: string;
    host?: string;
    sessionSecret?: string;
    packyId?: string;
    name?: string;
    description?: string;
    dependencies?: { [key: string]: { version: string } };
    authorizationToken?: string;
    disableDevSession?: boolean;
    user: { idToken?: string | null; sessionSecret?: string | null };
    // deviceId?: string | null;
};

/*
export type PackySessionProxy = {
    create: (options: PackySessionOptions) => Promise<void>;
    session: {
      // expoApiUrl: string;
      packygerUrl: string;
      packygerCloudfrontUrl: string;
      host: string;
      startAsync: () => Promise<void>;
      saveAsync: (options: {
        isDraft?: boolean;
      }) => Promise<{
        id: string;
      }>;
      uploadAssetAsync: (asset: File) => Promise<string>;
      syncDependenciesAsync: (
        modules: {
          [name: string]: string | undefined;
        },
        callback: Listener
      ) => Promise<void>;
      sendCodeAsync: (payload: PackyFiles) => Promise<void>;
      // setSdkVersion: (version: SDKVersion) => Promise<void>;
      setUser: (user: { sessionSecret: string | undefined }) => Promise<void>;
      setName: (name: string) => Promise<void>;
      setDescription: (description: string) => Promise<void>;
      // setDeviceId: (id: string) => Promise<void>;
      getState: () => Promise<PackySessionState>;
      // getChannel: () => Promise<string>;
    };
    addStateListener: (listener: Listener) => Promise<void>;
    addPresenceListener: (listener: Listener) => Promise<void>;
    addErrorListener: (listener: Listener) => Promise<void>;
    addLogListener: (listener: Listener) => Promise<void>;
    setDependencyErrorListener: (listener: Listener) => Promise<void>;
};
*/

export type LocalPackyData = {
  origin: string,
  id: string,
  owner?: string,
  repoName?: string,
  branch?: string,
  description?: string;
  localCreatedAt: number,
  githubCreatedAt: number,
  lastCommitAt: number,
}