import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { storeTypes } from '../store';
import { getEventServiceInstance } from '../services';
import { appTypes, appActions } from '../features/app';
import { authTypes } from '../features/auth';
import { commonTypes } from '../../common';
import { prefTypes, withPreferences } from '../features/preferences';
import { packyTypes, packyDefaults, packyActions } from '../features/packy';
import { wizziTypes, wizziActions } from '../features/wizzi';
import { FileSystemEntry, TextFileEntry, AssetFileEntry } from '../features/filelist/types';
import { packyToEntryArray, entryArrayToPacky, realAndGeneratedPackyToEntryArray, entryArrayDiff } from '../features/packy/convertFileStructure';
import updateEntry from '../features/filelist/actions/updateEntry';
import debounce from 'lodash/debounce';
import EditorView from '../components/Editor/EditorView';
import THEME from '../styles/muiTheme';

// TODO: App container specific or app feature ?
type Params = {
  id?: string;
  username?: string;
  repoName?: string;
};

interface StateProps {
  loggedUser?: appTypes.LoggedUser,
  packyNames?: string[],
  currentPacky?: packyTypes.Packy,
  packyTemplateNames?: string[],
  ownedGitRepositories?: commonTypes.GitRepositoryMeta[],
  generatedArtifact?: wizziTypes.GeneratedArtifact;
  jobGeneratedArtifacts: packyTypes.PackyFiles;
}

interface DispatchProps {
  dispatchLoggedOn: (user: appTypes.LoggedUser) => void;
  dispatchLoggedOff: () => void;
  dispatchInitPacky: () => void;
  dispatchSelectPacky: (packyId: string) => void;
  dispatchSavePacky: (packyId: string, code: packyTypes.PackyFiles) => void;
  dispatchCreatePacky: (packyId: string, packyKind: string) => void;
  dispatchDeletePacky: (packyId: string) => void;
  dispatchGenerateArtifact: (fileName: string, files: packyTypes.PackyFiles) => void;
  dispatchExecuteJob: (files: packyTypes.PackyFiles) => void;
  dispatchSetTimedService: (name: string, onOff:boolean, payload?: any, frequence?: number) => void;
}

const mapStateToProps = (state: storeTypes.StoreState) : StateProps => ({
  loggedUser: state.app.loggedUser,
  currentPacky: state.packy.currentPacky,
  packyNames: state.packy.packyNames,
  packyTemplateNames: state.packy.packyTemplateNames,
  ownedGitRepositories: state.packy.ownedGitRepositories,
  generatedArtifact: state.wizzi.generatedArtifact,
  jobGeneratedArtifacts: state.wizzi.jobGeneratedArtifacts,
});

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
  dispatchLoggedOn: (user: appTypes.LoggedUser) => {
    dispatch(appActions.updateLoggedUser(user));
  },
  dispatchLoggedOff: () => {
    dispatch(appActions.updateLoggedUser(null));
  },
  dispatchInitPacky: () => {
    dispatch(packyActions.initPackyRequest());
  },
  dispatchSelectPacky: (packyId: string) => {
    dispatch(packyActions.selectPackyRequest({id: packyId}));
  },
  dispatchSavePacky: (packyId: string, files: packyTypes.PackyFiles) => {
    dispatch(packyActions.savePackyRequest({
      id: packyId,
      files: files
    }));
  },
  dispatchCreatePacky: (packyId: string, packyKind: string) => {
    dispatch(packyActions.createPackyRequest({
      id: packyId,
      options: { data: packyKind}
    }));
  },
  dispatchDeletePacky: (packyId: string) => {
    dispatch(packyActions.deletePackyRequest({
      id: packyId,
    }));
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
  // from dom navigatori in index.tsx
  userAgent: string;
};

type State = StateProps & {
  packyStoreId?: string;
  packySessionReady: boolean;
  sendCodeOnChangeEnabled: boolean;
  autosaveEnabled: boolean;
  isSavedOnce: boolean;
  saveHistory: packyTypes.SaveHistory;
  saveStatus: packyTypes.SaveStatus;
  params: Params;
  fileEntries: FileSystemEntry[];
  isWizziJobWaiting: boolean;
  lastJobfileEntries: FileSystemEntry[];
};

class App extends React.Component<Props, State> {

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.currentPacky && props.currentPacky.id !== state.packyStoreId) {
      const { files } = props.currentPacky;
      if (files) {
        const fileEntries = packyToEntryArray(files);
        console.log("App.getDerivedStateFromProps.Loaded packy", props.currentPacky.id);
        return {
          fileEntries,
          packyStoreId: props.currentPacky.id,
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

    const params: Params = {
      ...(!props.match.params.id && props.match.params.username && props.match.params.repoName
        ? { id: `@${props.match.params.username}/${props.match.params.repoName}` }
        : null),
    };

    this.state = {
      packyStoreId: undefined,
      packySessionReady: false,
      sendCodeOnChangeEnabled: true,
      // We don't have any UI for autosave in embed
      // In addition, enabling autosave in embed will disable autosave in editor when embed dialog is open
      autosaveEnabled: true /*!this.props.isEmbedded*/,
      isSavedOnce: false,
      saveHistory: props.currentPacky && props.currentPacky.history ? props.currentPacky.history : [],
      saveStatus: props.currentPacky && props.currentPacky.isDraft ? 'saved-draft' : params.id ? 'published' : 'changed',
      fileEntries: [],
      generatedArtifact: undefined,
      jobGeneratedArtifacts: {},
      isWizziJobWaiting: false,
      lastJobfileEntries: [],
      params,
    };
  }

  componentDidMount() {
    // Raven
    // Session worker
    this._initializePackySession();
    // this.props.dispatchFetchPacky(packyDefaults.DEFAULT_PACKY_NAME);
    this.props.dispatchInitPacky();
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
      // console.log('componentDidUpdate.changed', k, diff[k].kind);
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
      // console.log('componentDidUpdate.changed', k, diff[k].kind);
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

  _handleLoggedOn = async (user: appTypes.LoggedUser) => {
    this.props.dispatchLoggedOn(user);
  }

  _handleLoggedOff = async () => {
    this.props.dispatchLoggedOff();
  }

  _handleSelectPacky = async (packyId: string) => {
    this.props.dispatchSelectPacky(packyId);
  }

  _handleCreatePacky = async (packyId: string, packyKind: string) => {
    this.props.dispatchCreatePacky(packyId, packyKind);
  }

  _handleDeletePacky = async (packyId: string) => {
    this.props.dispatchDeletePacky(packyId);
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
      };
    }, () => {
      if (focusedEntry.item.path.endsWith('.ittf')) {
        this._generateArtifact();
      }
    });
  }
  
  _handleFileEntriesChange = (nextFileEntries: FileSystemEntry[]): Promise<void> => {
    return new Promise(resolve =>
      this.setState(state => {
        // const previousFocusedEntry = this._findFocusedEntry(state.fileEntries);
        // const nextFocusedEntry = this._findFocusedEntry(nextFileEntries);
        let fileEntries = nextFileEntries;
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
      this.state.packyStoreId as string,
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
    if (this.props.loggedUser) {
      // We can save draft only if the user is logged in
      throw new Error("_handleSaveDraftNotDebounced not implemented");
      // this._savePacky({ isDraft: true, allowedOnProfile: true });
    }
  };

  _handleSaveDraft = debounce(this._handleSaveDraftNotDebounced, 3000);

  
  render() {
    const title =
      this.props.currentPacky && this.props.currentPacky.localPackyData ? this.props.currentPacky.localPackyData.repoName : null;

    // console.log('App.currentPacky', this.props.currentPacky);
    // console.log('App container', this.props.generatedArtifact);

    return (
      <MuiThemeProvider theme={THEME}>
        <EditorView
          params={this.state.params}
          userAgent={this.props.userAgent}
          loggedUser={this.props.loggedUser}
          currentPacky={this.props.currentPacky}
          packyNames={this.props.packyNames || []}
          packyTemplateNames={this.props.packyTemplateNames || []}
          ownedGitRepositories={this.props.ownedGitRepositories || []}
          generatedArtifact={this.props.generatedArtifact}
          autosaveEnabled={this.state.autosaveEnabled}
          sendCodeOnChangeEnabled={this.state.sendCodeOnChangeEnabled}
          saveHistory={this.state.saveHistory}
          saveStatus={this.state.saveStatus}
          creatorUsername={this.state.params.username}
          fileEntries={this.state.fileEntries}
          entry={this._findFocusedEntry(this.state.fileEntries)}
          isWizziJobWaiting={this.state.isWizziJobWaiting}
          // loadingMessage={this.state.packySessionState.loadingMessage}
          // dependencies={this.state.packySessionState.dependencies}
          onLoggedOn={this._handleLoggedOn}
          onLoggedOff={this._handleLoggedOff}
          onSelectPacky={this._handleSelectPacky}
          onCreatePacky={this._handleCreatePacky}
          onDeletePacky={this._handleDeletePacky}
          onSendCode={this._sendCodeNotDebounced}
          onFileEntriesChange={this._handleFileEntriesChange}
          onChangeCode={this._handleChangeCode}
          onExecuteWizziJob={this._executeJobNotDebounced}
        />
      </MuiThemeProvider>
    );
  }
}

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withPreferences(App));
