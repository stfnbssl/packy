import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppReduxState } from '../store/createStore';
import { appTypes } from '../features/app'
import { authTypes } from '../features/auth'
import { packyTypes, packyDefaults, packyActions } from '../features/packy'
import { FileSystemEntry, TextFileEntry, AssetFileEntry } from '../features/filelist/types'
import { packyToEntryArray, entryArrayToPacky } from '../features/packy/convertFileStructure'
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
}

interface DispatchProps {
  dispatchFetchPackyList: () => void;
  dispatchFetchPacky: (packyName: string) => void;
  dispatchSavePacky: (packyName: string, code: packyTypes.PackyFiles) => void;
  dispatchCreatePacky: (packyName: string, code: packyTypes.PackyFiles) => void;
}

const mapStateToProps = (state: AppReduxState) => ({
  viewer: state.app.viewer,
  packyNames: state.packy.packyNames,
  currentPacky: state.packy.currentPacky,
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
  dispatchCreatePacky: (packyName: string, code: packyTypes.PackyFiles) => {
    dispatch(packyActions.createPackyRequest({
      name: packyName,
      options: {
        name: packyName, 
        data: code
      }
    }));
  },
});

type Props = authTypes.AuthProps & StateProps & DispatchProps & {
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
        };
      }
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
    this.props.dispatchFetchPacky(packyDefaults.DEFAULT_PACKY_NAME);
  }  

  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.fileEntries === prevState.fileEntries) {
      return;
    }

    let didFilesChange = false;

    if (this.state.fileEntries.length !== prevState.fileEntries.length) {
      didFilesChange = true;
    } else {
      const items: { [key: string]: FileSystemEntry['item'] } = prevState.fileEntries.reduce(
        (acc: { [key: string]: FileSystemEntry['item'] }, { item }) => {
          acc[item.path] = item;
          return acc;
        },
        {}
      );

      didFilesChange = this.state.fileEntries.some(
        ({ item }) => !item.virtual && items[item.path] !== item
      );
    }

    if (didFilesChange) {
      if (this.state.sendCodeOnChangeEnabled) {
        this._sendCode();
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
    const packyFiles = packyDefaults.INITIAL_PACKY_KINDS[packyKind];
    this.props.dispatchCreatePacky(packyName, packyFiles);
  }

  _findFocusedEntry = (entries: FileSystemEntry[]): TextFileEntry | AssetFileEntry | undefined =>
    // @ts-ignore
    entries.find(({ item, state }) => item.type === 'file' && state.isFocused === true);

  _handleChangeCode = (content: string) =>
    this.setState((state: State) => ({
      saveStatus: 'changed',
      fileEntries: state.fileEntries.map(entry => {
        if (entry.item.type === 'file' && entry.state.isFocused) {
          return updateEntry(entry, { item: { content } });
        }
        return entry;
      }),
      // deviceError: undefined,
    }));

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

        return { fileEntries };
      }, resolve)
    );
  };

  _sendCodeNotDebounced = () => {
    // throw new Error("_sendCodeNotDebounced not implemented");
    this.props.dispatchSavePacky(
      this.state.packyStoreName as string,
      entryArrayToPacky(this.state.fileEntries.filter(e => !e.item.virtual))
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
              createdAt={this.props.packy ? this.props.packy.created : undefined}
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
              loadingMessage={this.state.packySessionState.loadingMessage}
              dependencies={this.state.packySessionState.dependencies}
              params={this.state.params}
              onSelectPacky={this._handleSelectPacky}
              onCreatePacky={this._handleCreatePacky}
              onSendCode={this._sendCodeNotDebounced}
              onFileEntriesChange={this._handleFileEntriesChange}
              onChangeCode={this._handleChangeCode}
              onSubmitMetadata={(details)=>mockFn.promise<void>(details)/*this._handleSubmitMetadata*/}
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

export default connect<StateProps, DispatchProps>(
  mapStateToProps, mapDispatchToProps
)(App/*withAuth(App)*/);


