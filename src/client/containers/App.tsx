import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { storeTypes } from '../store';
import { getEventServiceInstance } from '../services';
import { appTypes } from '../features/app'
import { authTypes } from '../features/auth'
import { commonTypes } from '../../common';
import { prefTypes, withPreferences } from '../features/preferences';
import { packyTypes, packyDefaults, packyActions } from '../features/packy'
import { wizziTypes, wizziActions } from '../features/wizzi'
import { FileSystemEntry, TextFileEntry, AssetFileEntry } from '../features/filelist/types'
import { packyToEntryArray, entryArrayToPacky, realAndGeneratedPackyToEntryArray, entryArrayDiff } from '../features/packy/convertFileStructure'
import updateEntry from '../features/filelist/actions/updateEntry';
import debounce from 'lodash/debounce';
import { isPackageJson } from '../features/filelist/fileUtilities';
import LazyLoad from '../components/shared/LazyLoad'
import AppShell from '../components/Shell/AppShell'
import mockFn from '../mocks/functions'
import { SSL_OP_MSIE_SSLV2_RSA_PADDING } from 'constants';

// TODO: App container specific or App feature ?
type Params = {
  id?: string;
  // sdkVersion?: SDKVersion;
  username?: string;
  projectName?: string;
};

interface StateProps {
  viewer?: appTypes.Viewer,
  packyNames?: string[],
  currentPacky?: packyTypes.Packy,
  packyTemplateNames?: string[],
  currentPackyTemplate?: packyTypes.PackyTemplate,
  ownedGitRepositories?: commonTypes.GitRepositoryMeta[],
  clonedGitRepository?: commonTypes.ClonedGitRepository,
  generatedArtifact?: wizziTypes.GeneratedArtifact;
  jobGeneratedArtifacts: packyTypes.PackyFiles;
}

interface DispatchProps {
  dispatchFetchPackyList: () => void;
  dispatchFetchPacky: (packyName: string) => void;
  dispatchSavePacky: (packyName: string, code: packyTypes.PackyFiles) => void;
  dispatchCreatePacky: (packyName: string, packyKind: string) => void;
  dispatchCloneGitRepository: (owner: string, name: string, branch: string) => void;
  dispatchFetchPackyTemplateList: () => void;
  dispatchFetchPackyTemplate: (packyName: string) => void;
  dispatchFetchOwnedGitRepositories: () => void;
  dispatchGenerateArtifact: (fileName: string, code: packyTypes.PackyFiles) => void;
  dispatchExecuteJob: (code: packyTypes.PackyFiles) => void;
  dispatchSetTimedService: (name: string, onOff:boolean, payload?: any, frequence?: number) => void;
}

const mapStateToProps = (state: storeTypes.StoreState) => ({
  viewer: state.app.viewer,
  packyNames: state.packy.packyNames,
  currentPacky: state.packy.currentPacky,
  packyTemplateNames: state.packy.packyTemplateNames,
  currentPackyTemplate: state.packy.currentPackyTemplate,
  ownedGitRepositories: state.packy.ownedGitRepositories,
  clonedGitRepository: state.packy.clonedGitRepository,
  generatedArtifact: state.wizzi.generatedArtifact,
  jobGeneratedArtifacts: state.wizzi.jobGeneratedArtifacts,
});

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
  dispatchFetchPackyList: () => {
    dispatch(packyActions.fetchPackyListRequest());
  },
  dispatchFetchPacky: (packyName: string) => {
    dispatch(packyActions.fetchPackyRequest({name: packyName}));
  },
  dispatchSavePacky: (packyName: string, code: packyTypes.PackyFiles) => {
    dispatch(packyActions.savePackyRequest({
      packy: {
        id: packyName,
        created: 'unavailable',
        code: code
      }
    }));
  },
  dispatchCreatePacky: (packyName: string, packyKind: string) => {
    dispatch(packyActions.createPackyRequest({
      name: packyName,
      options: { data: packyKind}
    }));
  },
  dispatchCloneGitRepository: (owner: string, name: string, branch: string) => {
    dispatch(packyActions.cloneGitRepositoryRequest({
      owner: owner,
      name: name,
      branch: 'master', // TODO
    }));
  },
  dispatchFetchPackyTemplateList: () => {
    dispatch(packyActions.fetchPackyTemplateListRequest());
  },
  dispatchFetchPackyTemplate: (packyName: string) => {
    dispatch(packyActions.fetchPackyTemplateRequest({name: packyName}));
  },
  dispatchFetchOwnedGitRepositories: () => {
    dispatch(packyActions.fetchOwnedGitRepositoriesRequest());
  },
  dispatchGenerateArtifact: (filePath: string, code: packyTypes.PackyFiles) => {
    if (filePath.endsWith('.ittf') && !filePath.endsWith('wfjob.ittf')) {
      dispatch(wizziActions.generateArtifactRequest({filePath: filePath, files:code}));
    }
  },
  dispatchExecuteJob: (code: packyTypes.PackyFiles) => {
      dispatch(wizziActions.executeJobRequest({files:code}));
  },
  dispatchSetTimedService: (name: string, onOff:boolean, payload?: any, frequence?: number) => {
    dispatch(wizziActions.setTimedService({
      serviceName: name,
      onOff: onOff,
      payload: payload,
      frequence: frequence
    }));
  }
});

type Props = authTypes.AuthProps & 
      prefTypes.PreferencesContextType & 
      StateProps & 
      DispatchProps & {
  packy?: packyTypes.Packy;
  // from router
  history: {
    push: (props: { pathname: string; search: string }) => void;
  };
  // from router
  match: {
    params: Params;
  };
  // from router
  location: {
    search: string;
  };
  // calculated by App with 'query-string' parse
  query: appTypes.QueryParams;
  // from dom navigatori in index.tsx
  userAgent: string;
  // isEmbedded?: boolean;
};

type State = StateProps & {
  packyStoreName?: string;
  packySessionState: packyTypes.PackySessionState;
  packySessionReady: boolean;
  // channel: string;
  // deviceId: string;
  sendCodeOnChangeEnabled: boolean;
  autosaveEnabled: boolean;
  isSavedOnce: boolean;
  saveHistory: packyTypes.SaveHistory;
  saveStatus: packyTypes.SaveStatus;
  params: Params;
  fileEntries: FileSystemEntry[];
  isWizziJobWaiting: boolean;
  lastJobfileEntries: FileSystemEntry[];
  // connectedDevices: Device[];
  // deviceError: DeviceError | undefined;
  // deviceLogs: DeviceLog[];
  // isPreview: boolean;
  // wasUpgraded: boolean;
  // initialSdkVersion: SDKVersion;
};

/*
type SaveOptions = {
  isDraft?: boolean;
  allowedOnProfile?: boolean;
};
*/

class App extends React.Component<Props, State> {

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.currentPacky && props.currentPacky.id !== state.packyStoreName) {
      const { code } = props.currentPacky;
      if (code) {
        const fileEntries = packyToEntryArray(code);
        console.log("App.getDerivedStateFromProps.Loaded packy", props.currentPacky.id);
        return {
          fileEntries,
          packyStoreName: props.currentPacky.id,
          isWizziJobWaiting: fileEntries.filter(e => e.item.path.endsWith('.wfjob.ittf')).length > 0 ? true : false,
          lastJobfileEntries: fileEntries,
        };
      }
    }
    if (props.clonedGitRepository && props.clonedGitRepository.name !== state.packyStoreName) {
      const { files } = props.clonedGitRepository;
      if (files) {
        const fileEntries = packyToEntryArray(files);
        console.log("App.getDerivedStateFromProps.Loaded packy", props.clonedGitRepository.name);
        return {
          fileEntries,
          packyStoreName: props.clonedGitRepository.name,
          isWizziJobWaiting: fileEntries.filter(e => e.item.path.endsWith('.wfjob.ittf')).length > 0 ? true : false,
          lastJobfileEntries: fileEntries,
        };
      }
    }
    if (props.jobGeneratedArtifacts !== state.jobGeneratedArtifacts) {
      const notGenerated = entryArrayToPacky(state.fileEntries.filter(e=> !e.item.generated));
      console.log("App.getDerivedStateFromProps.notGenerated", notGenerated, 'jobGeneratedArtifacts', props.jobGeneratedArtifacts);
      return {
        fileEntries: realAndGeneratedPackyToEntryArray(notGenerated, props.jobGeneratedArtifacts),
        jobGeneratedArtifacts: props.jobGeneratedArtifacts,
      };
    }
    return null;
  }

  constructor(props: Props) {
    super(props);

    const usingDefaultCode = !(
      (props.packy && props.packy.code) ||
      (props.query && props.query.code)
    );

    let code: packyTypes.PackyFiles | string =
      props.packy && props.packy.code ? props.packy.code : packyDefaults.INITIAL_CODE;

    let name = packyDefaults.DEFAULT_PACKY_NAME /*getPackyName()*/;
    let description = packyDefaults.DEFAULT_DESCRIPTION;
    // TODO(satya164): is this correct? we don't match for sdkVersion in the router
    // let sdkVersion = props.match.params.sdkVersion || DEFAULT_SDK_VERSION;
    let dependencies = usingDefaultCode ? packyDefaults.INITIAL_DEPENDENCIES : {};

    if (props.packy && props.packy.dependencies) {
      dependencies = props.packy.dependencies;
    }

    if (props.packy && props.packy.manifest) {
      const { manifest } = props.packy;
      name = manifest.name;
      description = manifest.description;
      // sdkVersion = manifest.sdkVersion || sdkVersion;
    }

    if (props.query) {
      name = props.query.name || name;
      description = props.query.description || description;
      // sdkVersion = props.query.sdkVersion || sdkVersion;
      code = props.query.code || code;
    }

    // const initialSdkVersion = sdkVersion;

    // let wasUpgraded = false;

    /*
    if (!versions.hasOwnProperty(sdkVersion)) {
      sdkVersion = FALLBACK_SDK_VERSION;
      wasUpgraded = true;
    }
    */

    if (typeof code === 'string') {
      // Code is from SDK version below 21.0.0 without multiple files support
      // Or came from embed parameters which is a string
      // Upgrade code to new format with multiple entries
      code = {
        'App.js': { contents: code, type: 'CODE' },
      };
    }

    /*
    const isPreview = !!(
      isMobile(this.props.userAgent) &&
      (props.match.params.id || props.match.params.projectName) &&
      !props.isEmbedded
    );
    */

    const fileEntries = packyToEntryArray(code);

    const params: Params = {
      // platform: props.query.platform,
      // sdkVersion: props.query.sdkVersion,
      ...(!props.match.params.id && props.match.params.username && props.match.params.projectName
        ? { id: `@${props.match.params.username}/${props.match.params.projectName}` }
        : null),
    };

    // Create an initial packy session state from the data we have
    // After the worker is created, it'll be replaced with uptodate data
    const packySessionState: packyTypes.PackySessionState = {
      name,
      description,
      files: code,
      dependencies,
      // sdkVersion,
      isSaved: Boolean(params.id),
      isResolving: false,
      loadingMessage: undefined,
    };

    this.state = {
      packyStoreName: undefined,
      packySessionState,
      packySessionReady: false,
      sendCodeOnChangeEnabled: true,
      // We don't have any UI for autosave in embed
      // In addition, enabling autosave in embed will disable autosave in editor when embed dialog is open
      autosaveEnabled: true /*!this.props.isEmbedded*/,
      isSavedOnce: false,
      saveHistory: props.packy && props.packy.history ? props.packy.history : [],
      saveStatus:
        props.packy && props.packy.isDraft ? 'saved-draft' : params.id ? 'published' : 'changed',
      fileEntries: fileEntries /*[...fileEntries, this._getPackageJson(packySessionState)]*/,
      generatedArtifact: undefined,
      jobGeneratedArtifacts: {},
      isWizziJobWaiting: fileEntries.filter(e => e.item.path.endsWith('.wfjob.ittf')).length > 0 ? true : false,
      lastJobfileEntries: fileEntries,
      // connectedDevices: [],
      // deviceLogs: [],
      // deviceError: undefined,
      // channel: '',
      // deviceId: '',
      // isPreview,
      params,
      // wasUpgraded,
      // initialSdkVersion,
    };
  }

  componentDidMount() {
    // Raven
    // Session worker
    this._initializePackySession();
    this.props.dispatchFetchPackyList();
    // this.props.dispatchFetchPacky(packyDefaults.DEFAULT_PACKY_NAME);
    this.props.dispatchFetchPackyTemplateList();
    this.props.dispatchFetchOwnedGitRepositories();
    if (this.props.preferences.timedJobRunning) {
      this.props.dispatchSetTimedService(
        'EXECUTE_JOB', true, this.state.fileEntries, 3000
      )
    }
    getEventServiceInstance().on('EXECUTE_JOB', (payload: any) => {
      // this.props.dispatchExecuteJob();
    });
  }  

  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.fileEntries === prevState.fileEntries) {
      return;
    }
    
    let diff = entryArrayDiff(prevState.fileEntries, this.state.fileEntries);
    
    let didFilesChange = false;

    Object.keys(diff).forEach(k => {
      console.log('componentDidUpdate.changed', k, diff[k].kind);
      if (diff[k].kind === '+' || diff[k].kind === '-') {
        didFilesChange = true;
      } else {
        if (diff[k].b && (diff[k].b as FileSystemEntry['item']).virtual) {
            didFilesChange = true;
        } 
      }
    });
    
    diff = entryArrayDiff(prevState.fileEntries, this.state.lastJobfileEntries);
    let didIttfFilesChange = false;
    Object.keys(diff).forEach(k => {
      console.log('componentDidUpdate.changed', k, diff[k].kind);
      if (k.endsWith('.ittf')) {
        didIttfFilesChange = true;
      }
    });

    if (didFilesChange) {
      if (this.state.sendCodeOnChangeEnabled) {
        this._sendCode();
      }
      if (didIttfFilesChange) {
        // this._generateArtifact();
        // this._executeJob();
        this.setState({
          isWizziJobWaiting: true
        })
      }
      this._handleSaveDraft();
    }
  }

  componentWillUnmount() {
    // close Session
    // close Session worker
  }

  _initializePackySession = async () => {
    // lots of inits
    this.setState({
      // channel,
      // snackSessionState: sessionState,
      packySessionReady: true,
    });
  }

  _handleSelectPacky = async (packyName: string) => {
    this.props.dispatchFetchPacky(packyName);
  }

  _handleCreatePacky = async (packyName: string, packyKind: string) => {
    // const packyFiles = packyDefaults.INITIAL_PACKY_KINDS[packyKind];
    this.props.dispatchCreatePacky(packyName, packyKind);
  }
  _handleCloneGitRepository = async (owner: string, name: string, branch: string) => {
    this.props.dispatchCloneGitRepository(owner, name, branch);
  }

  _findFocusedEntry = (entries: FileSystemEntry[]): TextFileEntry | AssetFileEntry | undefined =>
    // @ts-ignore
    entries.find(({ item, state }) => item.type === 'file' && state.isFocused === true);

  _handleChangeCode = (content: string) => {
    let focusedEntry: FileSystemEntry;
    this.setState((state: State) => {
      return {
        saveStatus: 'changed',
        fileEntries: state.fileEntries.map(entry => {
          if (entry.item.type === 'file' && entry.state.isFocused) {
            focusedEntry = entry;
            return updateEntry(entry, { item: { content } });
          }
          return entry;
        })
      // deviceError: undefined,
      };
    }, () => {
      if (focusedEntry.item.path.endsWith('.ittf')) {
        this._generateArtifact();
        // this._executeJob();
      }
    });
  }
  
  _handleFileEntriesChange = (nextFileEntries: FileSystemEntry[]): Promise<void> => {
    return new Promise(resolve =>
      this.setState(state => {
        const previousFocusedEntry = this._findFocusedEntry(state.fileEntries);
        const nextFocusedEntry = this._findFocusedEntry(nextFileEntries);

        let fileEntries = nextFileEntries;

        if (
          // Don't update package.json if we're resolving
          !state.packySessionState.isResolving &&
          // Update package.json when it's focused again instead of everytime deps change
          // This avoids changing it while you're still editing the file
          nextFocusedEntry &&
          isPackageJson(nextFocusedEntry.item.path) &&
          (previousFocusedEntry ? !isPackageJson(previousFocusedEntry.item.path) : true)
        ) {
          fileEntries = fileEntries.map(entry =>
            /* isPackageJson(entry.item.path)
              ? updateEntry(this._getPackageJson(state.packySessionState), {
                  // @ts-ignore
                  state: entry.state,
                })
              :*/ entry
          );
        }

        if (nextFocusedEntry) {
          //??? this._generateArtifact();
        }

        return { fileEntries };
      }, resolve)
    );
  };

  _generateArtifactNotDebounced = () => {
    const focusedEntry = this._findFocusedEntry(this.state.fileEntries);
    if (focusedEntry) {
      // TODO send only fileEntries of the same schema of focusedEntry
      this.props.dispatchGenerateArtifact(
        focusedEntry.item.path,
        entryArrayToPacky(this.state.fileEntries.filter(e => e.item.path.endsWith('.ittf')))
      );
    }
  }

  _generateArtifact = debounce(this._generateArtifactNotDebounced, 1000);

  _executeJobNotDebounced = () => {
    const jobEntries = this.state.fileEntries.filter(e => e.item.path.endsWith('.wfjob.ittf'));
    if (jobEntries.length > 0) {
      this.setState({
        lastJobfileEntries: this.state.fileEntries,
        isWizziJobWaiting: false
      });
      this.props.dispatchExecuteJob(
        entryArrayToPacky(this.state.fileEntries.filter(e => e.item.path.endsWith('.ittf')))
      );
    }
  }

  _executeJob = debounce(this._executeJobNotDebounced, 5000);

  _sendCodeNotDebounced = () => {
    // throw new Error("_sendCodeNotDebounced not implemented");
    this.props.dispatchSavePacky(
      this.state.packyStoreName as string,
      entryArrayToPacky(this.state.fileEntries.filter(e => !e.item.virtual && !e.item.generated))
    );
    /*
    this._packy.session.sendCodeAsync(
      // map state.fileEntries to the correct type before sending to snackSession
      entryArrayToPacky(this.state.fileEntries.filter(e => !e.item.virtual))
    );
    */
  }

  _sendCode = debounce(this._sendCodeNotDebounced, 1000);

  _handleSaveDraftNotDebounced = () => {
    if (this.props.viewer) {
      // We can save draft only if the user is logged in
      throw new Error("_handleSaveDraftNotDebounced not implemented");
      // this._saveSnack({ isDraft: true, allowedOnProfile: true });
    }
  };

  _handleSaveDraft = debounce(this._handleSaveDraftNotDebounced, 3000);

  
  render() {
    const title =
      this.props.packy && this.props.packy.manifest ? this.props.packy.manifest.name : null;

      console.log('App container', this.props.generatedArtifact);

    /*
      if (this.state.isPreview) {
      return (
        <AppDetails
          name={this.state.packySessionState.name}
          description={this.state.packySessionState.description}
          channel={this.state.channel}
          packyId={this.state.params.id}
          sdkVersion={this.state.packySessionState.sdkVersion}
          onOpenEditor={this._handleOpenEditor}
          userAgent={this.props.userAgent}
        />
      );
    }
    */
    return (
      <LazyLoad
        load={() => {
          /*if (this.props.isEmbedded) {
            return import('./EmbeddedEditorView');
          }*/
          return import('../components/Editor/EditorView');
        }}>
        {({ loaded, data: Comp }) =>
          loaded && Comp && this.state.packySessionReady ? (
            <Comp
              packy={this.props.packy}
              packyNames={this.props.packyNames || []}
              packyTemplateNames={this.props.packyTemplateNames || []}
              ownedGitRepositories={this.props.ownedGitRepositories || []}
              createdAt={this.props.packy ? this.props.packy.created : undefined}
              generatedArtifact={this.props.generatedArtifact}
              autosaveEnabled={this.state.autosaveEnabled}
              sendCodeOnChangeEnabled={this.state.sendCodeOnChangeEnabled}
              saveHistory={this.state.saveHistory}
              saveStatus={this.state.saveStatus}
              creatorUsername={this.state.params.username}
              fileEntries={this.state.fileEntries}
              entry={this._findFocusedEntry(this.state.fileEntries)}
              // channel={this.state.channel}
              name={this.state.packySessionState.name}
              description={this.state.packySessionState.description}
              // initialSdkVersion={this.state.initialSdkVersion}
              dependencyQueryParam={this.props.query.dependencies}
              // sdkVersion={this.state.packySessionState.sdkVersion}
              isResolving={this.state.packySessionState.isResolving}
              isWizziJobWaiting={this.state.isWizziJobWaiting}
              loadingMessage={this.state.packySessionState.loadingMessage}
              dependencies={this.state.packySessionState.dependencies}
              params={this.state.params}
              onSelectPacky={this._handleSelectPacky}
              onCreatePacky={this._handleCreatePacky}
              onCloneGitRepository={this._handleCloneGitRepository}
              onSendCode={this._sendCodeNotDebounced}
              onFileEntriesChange={this._handleFileEntriesChange}
              onChangeCode={this._handleChangeCode}
              onSubmitMetadata={(details)=>mockFn.promise<void>(details)/*this._handleSubmitMetadata*/}
              onExecuteWizziJob={this._executeJobNotDebounced}
              // onChangeSDKVersion={this._handleChangeSDKVersion}
              // onClearDeviceLogs={this._handleClearDeviceLogs}
              // onPublishAsync={this._handlePublishAsync}
              onSignIn={()=>mockFn.promise<void>()/*this._updateUser*/}
              onDownloadAsync={()=>mockFn.promise<void>()/*this._handleDownloadAsync*/}
              onToggleSendCode={()=>mockFn.func<void>()/*this._handleToggleSendCode*/}
              uploadFileAsync={(file)=>mockFn.promise<string>(file)/*this._uploadAssetAsync*/}
              syncDependenciesAsync={()=>mockFn.promise<void>()/*this._syncDependenciesAsync*/}
              // setDeviceId={this._setDeviceId}
              // deviceId={this.state.deviceId}
              // connectedDevices={this.state.connectedDevices}
              // deviceError={this.state.deviceError}
              // deviceLogs={this.state.deviceLogs}
              sessionID={this.props.query.session_id}
              // query={this.props.query}
              // wasUpgraded={this.state.wasUpgraded}
              userAgent={this.props.userAgent}
            />
          ) : /* this.props.isEmbedded ? (
            <EmbeddedShell />
          ) :*/ (
            <AppShell title={title} />
          )
        }
      </LazyLoad>
    );
  }
}

export default connect<storeTypes.StoreState, DispatchProps>(
  mapStateToProps, mapDispatchToProps
)(withPreferences(App/*withAuth(App)*/));


