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
import { packiTypes, packiDefaults, packiActions } from '../features/packi';
import { wizziTypes, wizziActions } from '../features/wizzi';
import { FileSystemEntry, TextFileEntry, AssetFileEntry } from '../features/filelist/types';
import { packiToEntryArray, entryArrayToPacki, mixPreviousAndGeneratedPackiFilesToEntryArray, entryArrayDiff } from '../features/packi/convertFileStructure';
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
  packiNames?: string[],
  currentPacki?: packiTypes.Packi,
  packiTemplateNames?: string[],
  ownedGitRepositories?: commonTypes.GitRepositoryMeta[],
  generatedArtifact?: wizziTypes.GeneratedArtifact;
  jobGeneratedArtifacts: packiTypes.PackiFiles;
  jobError: wizziTypes.JobError;
}

interface DispatchProps {
  dispatchLoggedOn: (user: appTypes.LoggedUser) => void;
  dispatchLoggedOff: () => void;
  dispatchInitPacki: (preferences: prefTypes.PreferencesType) => void;
  dispatchSelectPacki: (packiId: string) => void;
  dispatchSavePacki: (packiId: string, filesToSave: packiTypes.PackiFiles, packiEntryFiles: packiTypes.PackiFiles) => void;
  dispatchCreatePacki: (packiId: string, packiKind: string) => void;
  dispatchDeletePacki: (packiId: string) => void;
  dispatchGenerateArtifact: (fileName: string, files: packiTypes.PackiFiles) => void;
  dispatchExecuteJob: (files: packiTypes.PackiFiles) => void;
  dispatchSetTimedService: (name: string, onOff:boolean, payload?: any, frequence?: number) => void;
}

const mapStateToProps = (state: storeTypes.StoreState) : StateProps => ({
  loggedUser: state.app.loggedUser,
  currentPacki: state.packi.currentPacki,
  packiNames: state.packi.packiNames,
  packiTemplateNames: state.packi.packiTemplateNames,
  ownedGitRepositories: state.packi.ownedGitRepositories,
  generatedArtifact: state.wizzi.generatedArtifact,
  jobGeneratedArtifacts: state.wizzi.jobGeneratedArtifacts,
  jobError: state.wizzi.jobError,
});

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
  dispatchLoggedOn: (user: appTypes.LoggedUser) => {
    dispatch(appActions.updateLoggedUser(user));
  },
  dispatchLoggedOff: () => {
    dispatch(appActions.updateLoggedUser(null));
  },
  dispatchInitPacki: (preferences: prefTypes.PreferencesType) => {
    dispatch(packiActions.initPackiRequest({preferences}));
  },
  dispatchSelectPacki: (packiId: string) => {
    dispatch(packiActions.selectPackiRequest({id: packiId}));
  },
  dispatchSavePacki: (packiId: string, filesToSave: packiTypes.PackiFiles, packiEntryFiles: packiTypes.PackiFiles) => {
    dispatch(packiActions.savePackiRequest({
      id: packiId,
      filesToSave: filesToSave,
      packiEntryFiles: packiEntryFiles
    }));
  },
  dispatchCreatePacki: (packiId: string, packiKind: string) => {
    dispatch(packiActions.createPackiRequest({
      id: packiId,
      options: { data: packiKind}
    }));
  },
  dispatchDeletePacki: (packiId: string) => {
    dispatch(packiActions.deletePackiRequest({
      id: packiId,
    }));
  },
  dispatchGenerateArtifact: (filePath: string, files: packiTypes.PackiFiles) => {
    if (filePath.endsWith('.ittf') && !filePath.endsWith('wfjob.ittf')) {
      dispatch(wizziActions.generateArtifactRequest({filePath, files}));
    }
  },
  dispatchExecuteJob: (files: packiTypes.PackiFiles) => {
      dispatch(wizziActions.executeJobRequest({files}));
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
  packiStoreId?: string;
  packiSessionReady: boolean;
  isSavedOnce: boolean;
  saveHistory: packiTypes.SaveHistory;
  saveStatus: packiTypes.SaveStatus;
  params: Params;
  fileEntries: FileSystemEntry[];
  isWizziJobWaiting: boolean;
  lastJobfileEntries: FileSystemEntry[];
};

class App extends React.Component<Props, State> {

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.currentPacki && props.currentPacki.id !== state.packiStoreId) {
      const { files } = props.currentPacki;
      if (files) {
        const fileEntries = packiToEntryArray(files);
        console.log("App.getDerivedStateFromProps.Loaded packi", props.currentPacki.id);
        return {
          fileEntries,
          packiStoreId: props.currentPacki.id,
          isWizziJobWaiting: fileEntries.filter(e => e.item.path.endsWith('.wfjob.ittf')).length > 0 ? true : false,
          lastJobfileEntries: fileEntries,
        };
      }
    }
    if (props.jobGeneratedArtifacts && props.jobGeneratedArtifacts !== state.jobGeneratedArtifacts) {
      const notGenerated = entryArrayToPacki(state.fileEntries.filter(e=> !e.item.generated));
      console.log("App.getDerivedStateFromProps.notGenerated", notGenerated, 'jobGeneratedArtifacts', props.jobGeneratedArtifacts);
      return {
        fileEntries: mixPreviousAndGeneratedPackiFilesToEntryArray(notGenerated, props.jobGeneratedArtifacts),
        jobGeneratedArtifacts: props.jobGeneratedArtifacts,
      };
    }
    if (props.jobError !== state.jobError) {
      return {
        jobError: props.jobError,
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
      packiStoreId: undefined,
      packiSessionReady: false,
      // We don't have any UI for autosave in embed
      // In addition, enabling autosave in embed will disable autosave in editor when embed dialog is open
      isSavedOnce: false,
      saveHistory: props.currentPacki && props.currentPacki.history ? props.currentPacki.history : [],
      saveStatus: props.currentPacki && props.currentPacki.isDraft ? 'saved-draft' : params.id ? 'published' : 'changed',
      fileEntries: [],
      generatedArtifact: undefined,
      jobGeneratedArtifacts: undefined,
      jobError: undefined,
      isWizziJobWaiting: false,
      lastJobfileEntries: [],
      params,
    };
  }

  componentDidMount() {
    // Raven
    // Session worker
    this._initializePackiSession();
    // this.props.dispatchFetchPacki(packiDefaults.DEFAULT_PACKI_NAME);
    this.props.dispatchInitPacki(
      this.props.preferences
    );
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
      if (prevState.fileEntries.length > 0) {
        // console.log('componentDidUpdate.changed,_saveCode');
        // this._saveCode();
      }
      if (didIttfFilesChange) {
        this.setState({
          isWizziJobWaiting: true
        })
      }
    }
  }

  componentWillUnmount() {
    // close Session
    // close Session worker
  }

  _initializePackiSession = async () => {
    // lots of inits
    this.setState({
      packiSessionReady: true,
    });
  }

  _handleLoggedOn = async (user: appTypes.LoggedUser) => {
    this.props.dispatchLoggedOn(user);
    this.props.setPreferences({
      loggedUid: user.uid,
    });
  }

  _handleLoggedOff = async () => {
    this.props.dispatchLoggedOff();
    this.props.setPreferences({
      loggedUid: undefined,
    });
  }

  _handleSelectPacki = async (packiId: string) => {
    this.props.dispatchSelectPacki(packiId);
  }

  _handleCreatePacki = async (packiId: string, packiKind: string) => {
    this.props.dispatchCreatePacki(packiId, packiKind);
  }

  _handleDeletePacki = async (packiId: string) => {
    this.props.dispatchDeletePacki(packiId);
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
        let fileEntries = nextFileEntries;
        return { fileEntries };
      }, resolve)
    );
  };

  _handleEntrySelected = (entry: FileSystemEntry) => {
    console.log('containers.App._handleEntrySelected', this.props.preferences.autoGenSingleDoc, entry.item.path);
    if (this.props.preferences.autoGenSingleDoc) {
      if (entry.item.path.endsWith('.ittf') && entry.item.path.indexOf('/t/') < 0) {
        this.props.dispatchGenerateArtifact(
          entry.item.path,
          entryArrayToPacki(this.state.fileEntries.filter(e => e.item.path.endsWith('.ittf')))
        );
      }
    }
  }

  _generateArtifactNotDebounced = () => {
    const focusedEntry = this._findFocusedEntry(this.state.fileEntries);
    if (focusedEntry) {
      // TODO send only fileEntries of the same schema of focusedEntry + json schema
      this.props.dispatchGenerateArtifact(
        focusedEntry.item.path,
        entryArrayToPacki(this.state.fileEntries.filter(e => e.item.path.endsWith('.ittf')))
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
        // 20/4 entryArrayToPacki(this.state.fileEntries.filter(e => e.item.path.endsWith('.ittf')))
        entryArrayToPacki(this.state.fileEntries)
      );
    }
  }

  _executeJob = debounce(this._executeJobNotDebounced, 5000);

  _saveCodeNotDebounced = () => {
    this.props.dispatchSavePacki(
      this.state.packiStoreId as string,
      entryArrayToPacki(this.state.fileEntries.filter(e => !e.item.virtual && !e.item.generated)),
      entryArrayToPacki(this.state.fileEntries)
    );
  }

  _saveCode = debounce(this._saveCodeNotDebounced, 1000);

  render() {

    return (
      <MuiThemeProvider theme={THEME}>
        <EditorView
          params={this.state.params}
          userAgent={this.props.userAgent}
          loggedUser={this.props.loggedUser}
          currentPacki={this.props.currentPacki}
          generatedArtifact={this.props.generatedArtifact}
          saveHistory={this.state.saveHistory}
          saveStatus={this.state.saveStatus}
          creatorUsername={this.state.params.username}
          fileEntries={this.state.fileEntries}
          entry={this._findFocusedEntry(this.state.fileEntries)}
          isWizziJobWaiting={this.state.isWizziJobWaiting}
          jobError={this.state.jobError}
          onLoggedOn={this._handleLoggedOn}
          onLoggedOff={this._handleLoggedOff}
          onChangeCode={this._handleChangeCode}
          onFileEntriesChange={this._handleFileEntriesChange}
          onEntrySelected={this._handleEntrySelected}
          onSelectPacki={this._handleSelectPacki}
          onCreatePacki={this._handleCreatePacki}
          onDeletePacki={this._handleDeletePacki}
          onExecuteWizziJob={this._executeJobNotDebounced}
          onSaveCode={this._saveCode}
        />
      </MuiThemeProvider>
    );
  }
}

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withPreferences(App));