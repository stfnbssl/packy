import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { prefTypes, withThemeName } from '../../features/preferences';
import { appTypes } from '../../features/app';
import { packyTypes } from '../../features/packy';
import Button from '../shared/Button';
import ToolbarShell from '../Shell/ToolbarShell';
import PackybarTitleShell from '../Shell/PackybarTitleShell';
import ToolbarTitleShell from '../Shell/ToolbarTitleShell';
import IconButton from '../shared/IconButton';
import EditorTitle from './EditorTitle';
import EditorImportTitle from './EditorImportTitle';
// import SearchButton from './Search/SearchButton';
// import UserMenu from './UserMenu';
// import ModalAuthentication from './Auth/ModalAuthentication';

type State = {
  isLoggingIn: boolean;
};

type Props = {
  currentPacky: packyTypes.Packy;
  saveStatus: packyTypes.SaveStatus;
  saveHistory: packyTypes.SaveHistory;
  viewer: appTypes.Viewer | undefined;
  isDownloading: boolean;
  // isResolving: boolean;
  isAuthModalVisible: boolean;
  isEditModalVisible: boolean;
  isWizziJobWaiting: boolean;
  /*
  onSubmitMetadata: (
    details: {
      name: string;
      description: string;
    },
    draft?: boolean
  ) => Promise<void>;
  */
  onShowPreviousSaves: () => void;
  onShowEditModal: () => void;
  onDismissEditModal: () => void;
  // onShowAuthModal: () => void;
  // onDismissAuthModal: () => void;
  onExecuteWizziJob: () => void;
  onShowPackyManager: () => void;
  onShowGithubCommit: () => void;
  onShowGithubCreate: () => void;
  creatorUsername?: string;
  theme: prefTypes.ThemeName;
};

class EditorToolbar extends React.PureComponent<Props, State> {
  state = {
    isLoggingIn: false,
  };

  /*
  _handleShowAuthModal = () => {
    this.setState({ isLoggingIn: true });
    this.props.onShowAuthModal();
  };

  _handleDismissAuthModal = () => {
    this.setState({ isLoggingIn: false });
    this.props.onDismissAuthModal();
  };
  */

  render() {
    const {
      currentPacky,
      saveHistory,
      saveStatus,
      viewer,
      isDownloading,
      // isResolving,
      isEditModalVisible,
      // isAuthModalVisible,
      isWizziJobWaiting,
      // onSubmitMetadata,
      onShowPreviousSaves,
      onShowEditModal,
      onDismissEditModal,
      // onDownloadCode,
      onExecuteWizziJob,
      onShowPackyManager,
      onShowGithubCommit,
      onShowGithubCreate,
      // onPublishAsync,
      creatorUsername,
      theme,
    } = this.props;

    // console.log('EditorToolbar.currentPacky', currentPacky);
    const isPublishing = saveStatus === 'publishing';
    const isPublished = saveStatus === 'published';

    return (
      <ToolbarShell>
        <ToolbarTitleShell>
          <div className={css(styles.logoBox)}>
            <h1>PACKY</h1>
          </div>
          {/*<img
            src={
              theme === 'dark'
                ? require('../../assets/packy-icon-dark.svg')
                : require('../../assets/packy-icon.svg')
            }
            alt="Snack"
            className={css(styles.logo)}
          />*/}
          { currentPacky && currentPacky.localPackyData && currentPacky.localPackyData.owner ? (
              <div className={css(styles.titleBox)}>
                <h2>{currentPacky.localPackyData.owner} / {currentPacky.localPackyData.repoName}</h2>
              </div>
          ) : currentPacky && currentPacky.localPackyData ? (
              <div className={css(styles.titleBox)}>
                <h2>{currentPacky.localPackyData.id}</h2>
              </div>
          ) : null}
          {/*creatorUsername !== 'git' || !name || !description ? (
            <EditorTitle
              // name={name}
              // description={description}
              createdAt={createdAt}
              saveHistory={saveHistory}
              saveStatus={saveStatus}
              viewer={viewer}
              // onLogInClick={this._handleShowAuthModal}
              isEditModalVisible={isEditModalVisible}
              onSubmitMetadata={onSubmitMetadata}
              onShowPreviousSaves={onShowPreviousSaves}
              onShowEditModal={onShowEditModal}
              onDismissEditModal={onDismissEditModal}
            />
          ) : (
            <EditorImportTitle name={name} description={description} />
          )*/}
        </ToolbarTitleShell>
        <div className={css(styles.buttons)}>
          {/*<SearchButton />
          {/* fill="#1DAEFF", fill="#1D94DD"*/}
          <IconButton title="Manage Packies" label="Packies" onClick={onShowPackyManager}>
            <svg width="32px" height="32px" viewBox="0 0 256 413" version="1.1" preserveAspectRatio="xMidYMid">
              <g>
                <polyline points="0.356848485 50.5963636 135.493818 127.861818 135.493818 412.696727 0.356848485 335.446788"></polyline>
                <path d="M202.395152,83.8918788 L55.5054545,0.187636364 L55.5054545,58.3151515 L155.392,115.379879 L155.392,289.80897 L202.402909,316.518303 C231.493818,333.119515 255.309576,323.174303 255.309576,294.409212 L255.309576,166.41697 C255.309576,137.636364 231.493818,100.500848 202.402909,83.8918788"></path>
              </g>
            </svg>          
          </IconButton>
          {/*<IconButton
            title="Export to expo-cli"
            label="Export"
            // onClick={onDownloadCode}
            disabled={isDownloading || isPublishing}>
            <svg width="24px" height="16px" viewBox="0 0 24 16">
              <g transform="translate(-5976.000000, -4236.000000)">
                <path
                  transform="translate(5976.000000, 4236.000000)"
                  d="M19.3501,6.05005 C18.6499,2.6001 15.6499,0 12,0 C9.1001,0 6.6001,1.6499 5.3501,4.05005 C2.3501,4.3501 0,6.8999 0,10 C0,13.2998 2.69995,16 6,16 L19,16 C21.75,16 24,13.75 24,11 C24,8.3501 21.9502,6.19995 19.3501,6.05005 L19.3501,6.05005 Z M10.4,8.6 L10.4,4.8 L13.6,4.8 L13.6,8.6 L17,8.6 L12,13.6 L7,8.6 L10.4,8.6 L10.4,8.6 Z"
                />
              </g>
            </svg>
          </IconButton>*/}
          { currentPacky && currentPacky.localPackyData && currentPacky.localPackyData.owner ? (
            <IconButton title="Git commit" label="Commit" onClick={onShowGithubCommit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#181616" d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"/>
              </svg>
            </IconButton>
          ) : null }
          { currentPacky && currentPacky.localPackyData && !currentPacky.localPackyData.owner ? (
            <IconButton title="Git create" label="Create" onClick={onShowGithubCreate}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#181616" d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"/>
              </svg>
            </IconButton>
          ) : null }
          <IconButton 
            title="Gen" 
            label="Gen" 
            disabled={!isWizziJobWaiting}
            onClick={onExecuteWizziJob}>
            <svg width="16px" height="20px" viewBox="0 0 16 20">
              <polygon points="0 0 0 20 16 10" />
            </svg>
          </IconButton>
          {/*<UserMenu onLogInClick={this._handleShowAuthModal} />
          <ModalAuthentication
            visible={this.state.isLoggingIn && isAuthModalVisible}
            onDismiss={this._handleDismissAuthModal}
            onComplete={this._handleDismissAuthModal}
          />*/}
        </div>
      </ToolbarShell>
    );
  }
}

export default withThemeName(EditorToolbar);

const styles = StyleSheet.create({
  logo: {
    width: 36,
    height: 'auto',
    margin: '0 .5em 0 .75em',
  },

  logoBox: {
    padding: '20px',
  },

  titleBox: {
    padding: '20px',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 5,
  },

  saveButton: {
    minWidth: 100,
  },
  execWizziJobButton: {
    minWidth: 100,
  },
});
