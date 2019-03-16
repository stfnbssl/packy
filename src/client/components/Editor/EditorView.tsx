import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { commonTypes } from '../../../common';
import { appTypes, Segment } from '../../features/app';
import { prefTypes, prefColors, withPreferences } from '../../features/preferences';
import { filelistTypes, fileActions, fileUtils } from '../../features/filelist'
import { packyTypes/*, packyDefaults*/ } from '../../features/packy';
import { wizziTypes } from '../../features/wizzi';
import FileList from '../filelist/FileList'
import KeybindingsManager from '../shared/KeybindingsManager'
import LazyLoad from '../shared/LazyLoad'
import ModalDialog from '../shared/ModalDialog'
import ProgressIndicator from '../shared/ProgressIndicator'
import ContentShell from '../Shell/ContentShell'
import LayoutShell from '../Shell/LayoutShell'
import EditorShell from '../Shell/EditorShell'
import AssetViewer from './AssetViewer';
import EditorPanels from './EditorPanels'
import EditorToolbar from './EditorToolbar'
import EditorFooter from './EditorFooter'
import NoFileSelected from './NoFileSelected'
import KeyboardShortcuts, { Shortcuts } from './KeyboardShortcuts';
import PackyManager from './PackyManager';
import PreviousSaves from './PreviousSaves';
import SimpleEditor from './SimpleEditor';
import mockFn from '../../mocks/functions'

const EDITOR_LOAD_FALLBACK_TIMEOUT = 3000;

type EditorProps = {
    packy?: packyTypes.Packy;
    createdAt: string | undefined;
    generatedArtifact?: wizziTypes.GeneratedArtifact;
    saveHistory: packyTypes.SaveHistory;
    saveStatus: packyTypes.SaveStatus;
    creatorUsername?: string;
    packyNames: string[];
    packyTemplateNames: string[];
    ownedGitRepositories: commonTypes.GitRepositoryMeta[];
    fileEntries: filelistTypes.FileSystemEntry[];
    entry: filelistTypes.TextFileEntry | filelistTypes.AssetFileEntry | undefined;
    name: string;
    description: string;
    dependencies?: {
      [name: string]: {
        version: string;
      };
    };
    params: {
      id?: string;
      // platform?: 'android' | 'ios';
    };
    // channel: string;
    isResolving: boolean;
    loadingMessage: string | undefined;
    sessionID: string | undefined;
    dependencyQueryParam: string | undefined;
    // initialSdkVersion: SDKVersion;
    // sdkVersion: SDKVersion;
    sendCodeOnChangeEnabled: boolean;
    isWizziJobWaiting: boolean;
    onSelectPacky: (packyName: string) => void;
    onCreatePacky: (packyName: string, packyKind: string) => void;
    onCloneGitRepository: (owner: string, name: string, branch: string) => void;
    onSendCode: () => void;
    onToggleSendCode: () => void;
    // onClearDeviceLogs: () => void;
    onFileEntriesChange: (entries: filelistTypes.FileSystemEntry[]) => Promise<void>;
    onChangeCode: (code: string) => void;
    onExecuteWizziJob: () => void;
    onSubmitMetadata: (
      details: {
        name: string;
        description: string;
      },
      draft?: boolean
    ) => Promise<void>;
    // onChangeSDKVersion: (sdkVersion: SDKVersion) => void;
    // onPublishAsync: (options: { allowedOnProfile?: boolean }) => Promise<void>;
    onDownloadAsync: () => Promise<void>;
    onSignIn: () => Promise<void>;
    uploadFileAsync: (file: File) => Promise<string>;
    syncDependenciesAsync: (
      modules: {
        [name: string]: string | undefined;
      },
      onError: (name: string, e: Error) => void
    ) => Promise<void>;
    // setDeviceId: (deviceId: string) => void;
    // deviceId: string | undefined;
    // wasUpgraded: boolean;
    autosaveEnabled: boolean;
    // query: QueryParams;
    userAgent: string;
}

export type Props = prefTypes.PreferencesContextType &
  EditorProps & {
    viewer?: appTypes.Viewer;
  };

type ModalName =
  // | PublishModals
  // | 'device-instructions'
  | 'packy-manager'
  // | 'embed'
  | 'edit-info'
  | 'shortcuts'
  | 'previous-saves';
type BannerName =
  | 'connected'
  | 'disconnected'
  | 'reconnect'
  | 'autosave-disabled'
  // | 'sdk-upgraded'
  // | 'embed-unavailable'
  // | 'export-unavailable'
  | 'slow-connection';

type State = {
  currentModal: ModalName | null;
  currentBanner: BannerName | null;
  loadedEditor: 'monaco' | 'simple' | null;
  isDownloading: boolean;
  isMarkdownPreview: boolean;
  // deviceLogsShown: boolean;
  // lintErrors: Annotation[];
  // shouldPreventRedirectWarning: boolean;
  previousEntry: filelistTypes.TextFileEntry | filelistTypes.AssetFileEntry | undefined;
};

// const BANNER_TIMEOUT_SHORT = 1500;
// const BANNER_TIMEOUT_LONG = 5000;

class EditorView extends React.Component<Props, State> {
    
    static getDerivedStateFromProps(props: Props, state: State) {
      if (props.entry !== state.previousEntry) {
        const { entry } = props;
        const { previousEntry } = state;
  
        let isMarkdownPreview = state.isMarkdownPreview;
  
        if (
          entry &&
          (!previousEntry || entry.item.path !== previousEntry.item.path) &&
          // When an empty markdown file is opened, switch to edit mode
          (entry.item.type === 'file' &&
            entry.item.path.endsWith('.md') &&
            !entry.item.asset &&
            !entry.item.content)
        ) {
          isMarkdownPreview = false;
        }
  
        return {
          isMarkdownPreview,
          previousEntry: entry,
        };
      }
  
      return null;
    }
  
    state = {
      loadedEditor: null,
      currentModal: null,
      currentBanner: null,
      isDownloading: false,
      isMarkdownPreview: true,
      // deviceLogsShown: false,
      // lintErrors: [],
      // shouldPreventRedirectWarning: false,
      previousEntry: undefined,
    };

    componentDidMount() {
      if (this.props.preferences.timedJobRunning) {
        

      }
    }

    _handleDismissEditModal = () => {
      Segment.getInstance().logEvent('DISMISSED_AUTH_MODAL', {
        currentModal: this.state.currentModal,
      });
      this.setState({ currentModal: null });
    };
  
    _handleShowTitleDescriptionModal = () => {
      this.setState({ currentModal: 'edit-info' });
    };
  
    _handleShowPackyManager = () => {
      this.setState({ currentModal: 'packy-manager' });
    };

    /*
    _handleShowDeviceInstructions = () => {
      Segment.getInstance().logEvent('REQUESTED_QR_CODE');
      this.setState({ currentModal: 'device-instructions' });
    };
  
    _handleShowAuthModal = () => {
      this.setState({ currentModal: 'auth' });
    };
    */
  
    _handleShowShortcuts = () => {
      console.log("_handleShowShortcuts");
      this.setState({ currentModal: 'shortcuts' });
    };
  
    _handleShowPreviousSaves = () => {
      this.setState({ currentModal: 'previous-saves' });
    };
  
    _handleHideModal = () => {
      this.setState({ currentModal: null });
    };
  
    _handleShowModal = (name: any) => {
      this.setState({ currentModal: name });
    };
  
    /*
    _handleShowEmbedCode = () => {
      if (!this.props.params.id) {
        this._showBanner('embed-unavailable', BANNER_TIMEOUT_LONG);
        return;
      }
  
      Segment.getInstance().logEvent('REQUESTED_EMBED');
  
      this.setState({ currentModal: 'embed' });
    };
    */
  
    _handleSelectPacky = (name: any) => {
      this._handleDismissEditModal();
      this.props.onSelectPacky && this.props.onSelectPacky(name);
    };

    _handleCreatePacky = (name: string, kind: string) => {
      this._handleDismissEditModal();
      this.props.onCreatePacky && this.props.onCreatePacky(name, kind);
    };

    _handleCloneGitRepository = (owner: string, name: string, branch: string) => {
      this._handleDismissEditModal();
      this.props.onCloneGitRepository && this.props.onCloneGitRepository(owner, name, branch);
    };

    _handleOpenPath = (path: string): Promise<void> =>
      this.props.onFileEntriesChange(fileActions.openEntry(this.props.fileEntries, path, true));
  
    _handleRemoveFile = (path: string) => {
      const entry = this.props.fileEntries.find(({ item }) => item.path === path);
  
      if (entry && entry.item.type === 'folder') {
        this.props.fileEntries.forEach(({ item }) => {
          if (fileUtils.isInsideFolder(item.path, path)) {
            this._EditorComponent && this._EditorComponent.removePath(item.path);
          }
        });
      } else {
        this._EditorComponent && this._EditorComponent.removePath(path);
      }
    };
  
    _handleRenameFile = (oldPath: string, newPath: string) => {
      const entry = this.props.fileEntries.find(({ item }) => item.path === oldPath);
  
      if (entry && entry.item.type === 'folder') {
        this.props.fileEntries.forEach(({ item }) => {
          if (fileUtils.isInsideFolder(item.path, oldPath)) {
            const renamedPath = fileUtils.changeParentPath(item.path, oldPath, newPath);
  
            this._EditorComponent && this._EditorComponent.renamePath(item.path, renamedPath);
          }
        });
      } else {
        this._EditorComponent && this._EditorComponent.renamePath(oldPath, newPath);
      }
    };

    _EditorComponent: any;

    _showErrorPanel = () =>
      this.props.setPreferences({
        panelType: 'errors',
      });
  
    /*
      _showDeviceLogs = () =>
      this.props.setPreferences({
        panelType: 'logs',
      });
    */
  
    _togglePanels = () =>
      this.props.setPreferences({
        panelsShown: !this.props.preferences.panelsShown,
      });
  
    _toggleFileTree = () =>
      this.props.setPreferences({
        fileTreeShown: !this.props.preferences.fileTreeShown,
      });
  
    /*
      _changeConnectionMethod = (deviceConnectionMethod: ConnectionMethod) =>
      this.props.setPreferences({ deviceConnectionMethod });
  
    _toggleDevicePreview = () =>
      this.props.setPreferences({
        devicePreviewShown: !this.props.preferences.devicePreviewShown,
      });
  
    _toggleEditorMode = () =>
      this.props.setPreferences({
        editorMode: this.props.preferences.editorMode === 'vim' ? 'normal' : 'vim',
      });
  
    _changeDevicePreviewPlatform = (platform: 'ios' | 'android') =>
      this.props.setPreferences({
        devicePreviewPlatform: platform,
      });
    */
  
    _toggleTheme = () =>
      this.props.setPreferences({
        theme: this.props.preferences.theme === 'light' ? 'dark' : 'light',
      });
  
    _toggleMarkdownPreview = () =>
      this.setState(state => ({ isMarkdownPreview: !state.isMarkdownPreview }));
  
    /*
      _preventRedirectWarning = () =>
      this.setState({
        shouldPreventRedirectWarning: true,
      });
  
    _allowRedirectWarning = () =>
      this.setState({
        shouldPreventRedirectWarning: false,
      });
    */
    _toggleTimedJob = () =>
      this.props.setPreferences({
        timedJobRunning: !this.props.preferences.timedJobRunning,
    });

    render() {
      const { currentModal/*, currentBanner*/, isDownloading/*, lintErrors*/ } = this.state;

      const {
        // channel,
        packyNames,
        packyTemplateNames,
        ownedGitRepositories,
        entry,
        // params,
        createdAt,
        generatedArtifact,
        saveHistory,
        saveStatus,
        viewer,
        loadingMessage,
        // sendCodeOnChangeEnabled,
        // sdkVersion,
        // connectedDevices,
        // deviceLogs,
        // deviceError,
        isWizziJobWaiting,
        onSendCode,
        onExecuteWizziJob,
        // onClearDeviceLogs,
        // onToggleSendCode,
        // uploadFileAsync,
        preferences,
        // name,
        description,
      } = this.props;

      console.log('EditorView', generatedArtifact);
  
      // const annotations: Annotation[] = [];
  
      /*
      if (deviceError) {
        annotations.push(convertErrorToAnnotation(deviceError));
      }
      annotations.push(...lintErrors);
      */
  
      //const hasPackyId = !!params.id;
      //const metadataName = isIntentionallyNamed(name) ? packyDefaults.DEFAULT_METADATA_NAME : name;
      /*
      const metadataName = name == packyDefaults.DEFAULT_PACKY_NAME ? packyDefaults.DEFAULT_METADATA_NAME : name;
      const metadataDescription =
        description === packyDefaults.DEFAULT_DESCRIPTION
          ? hasPackyId
            ? packyDefaults.DEFAULT_METADATA_DESCRIPTION_SAVED
            : packyDefaults.DEFAULT_METADATA_DESCRIPTION_EMPTY
          : description;*/
  
      const {fileEntries} = this.props;
      if (fileEntries.length == 0) {
        // return (<h1>loading ...</h1>)
      }

      return (
        <ContentShell>
          {this.state.loadedEditor ? null : <ProgressIndicator />}
          {/*<PageMetadata name={metadataName} description={metadataDescription} params={params} />*/}
          <React.Fragment>
            <KeybindingsManager
              bindings={Shortcuts}
              onTrigger={type => {
                const commands: { [key: string]: (() => void) | null } = {
                  /*
                  save:
                    saveStatus === 'published'
                      ? null
                      : this.props.isResolving
                      ? null
                      : onPublishAsync,*/
                  tree: this._toggleFileTree,
                  panels: this._togglePanels,
                  // format: this._prettier,
                  shortcuts: this._handleShowShortcuts,
                  update: onSendCode,
                };

                const fn = commands[type];

                if (fn) {
                  fn();
                }
              }}
            />
            <EditorToolbar
              name={name}
              description={description}
              createdAt={createdAt}
              saveHistory={saveHistory}
              saveStatus={saveStatus}
              viewer={viewer}
              isDownloading={isDownloading}
              isResolving={this.props.isResolving}
              isEditModalVisible={currentModal === 'edit-info'}
              isAuthModalVisible={currentModal === 'auth'}
              isWizziJobWaiting={isWizziJobWaiting}
              onShowPreviousSaves={this._handleShowPreviousSaves}
              onShowEditModal={this._handleShowTitleDescriptionModal}
              onDismissEditModal={this._handleDismissEditModal}
              onSubmitMetadata={this.props.onSubmitMetadata}
              // onShowAuthModal={this._handleShowAuthModal}
              // onDismissAuthModal={this._handleHideModal}
              onExecuteWizziJob={onExecuteWizziJob}
              onShowPackyManager={this._handleShowPackyManager}
              // onShowQRCode={this._handleShowDeviceInstructions}
              // onShowEmbedCode={this._handleShowEmbedCode}
              // onDownloadCode={handleDownloadCode}
              // onPublishAsync={onPublishAsync}

              creatorUsername={this.props.creatorUsername}
            />
            <div className={css(styles.editorAreaOuterWrapper)}>
            <div className={css(styles.editorAreaOuter)}>
              <LayoutShell>
              <FileList 
                entries={fileEntries}
                visible={true}
                onEntriesChange={this.props.onFileEntriesChange}
                onRemoveFile={(path: string) => path}
                onRenameFile={(oldPath: string, newPath: string) => { oldPath && newPath }}
                uploadFileAsync={(file: File) =>  mockFn.promise<string>(file)}
                onDownloadCode={() => mockFn.promise<void>()}
                hasSnackId={false}
                saveStatus={'changed'}
                // sdkVersion: SDKVersion;
                // theme={'light'}
                preventRedirectWarning={() => null}
                >
              </FileList>
              {/* Don't load it conditionally since we need the _EditorComponent object to be available */}
              <LazyLoad
                load={(): Promise<typeof import('./MonacoEditor')> => {
                  let timeout: any;

                  const MonacoEditorPromise = import(/* webpackPreload: true */ './MonacoEditor').then(
                    editor => ({ editor, type: 'monaco' })
                  );

                  // Fallback to simple editor if monaco editor takes too long to load
                  /*
                  const SimpleEditorPromise = new Promise((resolve, reject) => {
                    timeout = setTimeout(() => {
                      //this._showBanner('slow-connection', BANNER_TIMEOUT_LONG);

                      import('./SimpleEditor').then(resolve, reject);
                    }, EDITOR_LOAD_FALLBACK_TIMEOUT);
                  }).then(editor => ({ editor, type: 'simple' }));
                  */

                  /*return Promise.race([
                    MonacoEditorPromise.catch(() => SimpleEditorPromise),
                    SimpleEditorPromise,
                  ])*/return MonacoEditorPromise.then(({ editor, type }: any) => {
                    this.setState({ loadedEditor: type });

                    clearTimeout(timeout);

                    return editor;
                  }).catch(err=>{ console.log(err); alert('Failed to load Monaco Editor. See console error.')});
                }}>
                {({ loaded, data: Comp }) => {
                  this._EditorComponent = Comp;

                  if (entry && entry.item.type === 'file') {
                    if (entry.item.asset) {
                      return <AssetViewer entry={(entry as any) as filelistTypes.AssetFileEntry} />;
                    }

                    const { content } = entry.item;
                    // const isMarkdown = entry.item.path.endsWith('.md');
                  
                    if (loaded && Comp) {
                      return (
                        <React.Fragment>
                          <Comp
                            dependencies={{}/*this.props.dependencies*/}
                            //sdkVersion={sdkVersion}
                            entries={fileEntries/*this.props.fileEntries*/}
                            autoFocus={!entry.state.isCreating}
                            annotations={[]/*annotations*/}
                            path={entry.item.path}
                            value={content}
                            // mode={preferences.editorMode}
                            onValueChange={this.props.onChangeCode}
                            onOpenPath={this._handleOpenPath}
                          />
                        </React.Fragment>
                      );
                    }
                  } else {
                    return <NoFileSelected />;
                  }
                  return <EditorShell />;
                }}
              </LazyLoad>
              { generatedArtifact ? (
                <SimpleEditor
                    path=""
                    value={generatedArtifact.artifactContent}
                    onValueChange={()=>null}
                    lineNumbers="on"
                  />) : null }
              </LayoutShell>
              {preferences.panelsShown ? (
                      <EditorPanels
                        //annotations={annotations}
                        //deviceLogs={deviceLogs}
                        onShowErrorPanel={this._showErrorPanel}
                        // onShowDeviceLogs={this._showDeviceLogs}
                        onTogglePanels={this._togglePanels}
                        //onClearDeviceLogs={onClearDeviceLogs}
                        panelType={preferences.panelType}
                      />
                    ) : null}

            </div>
            </div>
            <EditorFooter
              loadingMessage={loadingMessage}
              // annotations={annotations}
              // connectedDevices={connectedDevices}
              fileTreeShown={preferences.fileTreeShown}
              // devicePreviewShown={preferences.devicePreviewShown}
              panelsShown={preferences.panelsShown}
              // editorMode={preferences.editorMode}
              // sendCodeOnChangeEnabled={sendCodeOnChangeEnabled}
              // sdkVersion={sdkVersion}
              timedJobRunning={preferences.timedJobRunning}
              // onSendCode={onSendCode}
              onToggleTheme={this._toggleTheme}
              onTogglePanels={this._togglePanels}
              onToggleFileTree={this._toggleFileTree}
              // onToggleDevicePreview={this._toggleDevicePreview}
              // onToggleSendCode={onToggleSendCode}
              /*onToggleVimMode={
                this.state.loadedEditor === 'monaco' ? this._toggleEditorMode : undefined
              }*/
              // onChangeSDKVersion={this.props.onChangeSDKVersion}
              onShowShortcuts={this._handleShowShortcuts}
              // onPrettifyCode={this._prettier}
              onToggleTimedJob={this._toggleTimedJob}
              theme={this.props.preferences.theme}
            />
            <ModalDialog
              visible={currentModal === 'packy-manager'}
              onDismiss={this._handleHideModal}>
              <PackyManager 
                packyNames={packyNames}
                packyTemplateNames={packyTemplateNames}
                ownedGitRepositories={ownedGitRepositories}
                onSelectPacky={this._handleSelectPacky}
                onCreatePacky={this._handleCreatePacky}
                onCloneGitRepository={this._handleCloneGitRepository}
              />
            </ModalDialog>
            <ModalDialog
              visible={currentModal === 'previous-saves'}
              title="Previous saves"
              onDismiss={this._handleHideModal}>
              <PreviousSaves saveHistory={saveHistory} />
            </ModalDialog>
            <ModalDialog
              visible={currentModal === 'shortcuts'}
              onDismiss={this._handleHideModal}>
              <KeyboardShortcuts />
            </ModalDialog>
        </React.Fragment>
        </ContentShell>
      ) 
    }
}

export default withPreferences(
  connect((state: any) => ({
    viewer: state.app.viewer,
  }))(EditorView)
);

const c = prefColors.c;
const styles = StyleSheet.create({
  editorAreaOuter: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
    minHeight: 0,
  },

  editorAreaOuterWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minHeight: 0,
    minWidth: 0,
  },

  embedModal: {
    minWidth: 0,
    minHeight: 0,
    maxWidth: 'calc(100% - 48px)',
    maxHeight: 'calc(100% - 48px)',
  },

  previewToggle: {
    appearance: 'none',
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 32,
    padding: 12,
    height: 48,
    width: 48,
    border: 0,
    borderRadius: '50%',
    backgroundColor: c('accent'),
    color: c('accent-text'),
    outline: 0,

    ':focus-visible': {
      outline: 'auto',
    },
  },

  previewToggleIcon: {
    fill: 'currentColor',
    verticalAlign: -1,
  },
});


