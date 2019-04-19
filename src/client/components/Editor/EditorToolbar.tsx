import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { prefTypes, withThemeName } from '../../features/preferences';
import { authTypes } from '../../features/auth';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CreateIcon from '@material-ui/icons/Create';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ExtensionIcon from '@material-ui/icons/Extension';
import GithubIcon from '../../styles/svgIcons/Github';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ViewListIcon from '@material-ui/icons/ViewList';
import HelpIcon from '@material-ui/icons/Help';
import { appTypes } from '../../features/app';
import { packyTypes } from '../../features/packy';
//import Button from '../shared/Button';
import ToolbarShell from '../Shell/ToolbarShell';
import PackybarTitleShell from '../Shell/PackybarTitleShell';
import ToolbarTitleShell from '../Shell/ToolbarTitleShell';
import IconButton2 from '../shared/IconButton';
import AppSidebar from '../Common/AppSidebar'
import EditorTitle from './EditorTitle';
import EditorImportTitle from './EditorImportTitle';
// import SearchButton from './Search/SearchButton';
// import UserMenu from './UserMenu';
import ModalAuthentication from '../Auth/ModalAuthentication';
import {Layout} from '../Common/Constants';

type State = {
  isLoggingIn: boolean;
};

type Props = authTypes.AuthProps & {
  classes: any;
  currentPacky: packyTypes.Packy;
  saveStatus: packyTypes.SaveStatus;
  saveHistory: packyTypes.SaveHistory;
  loggedUser: appTypes.LoggedUser | undefined;
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
  onShowAuthModal: () => void;
  onDismissAuthModal: () => void;
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

  _handleShowAuthModal = () => {
    this.setState({ isLoggingIn: true });
    this.props.onShowAuthModal();
  };

  _handleDismissAuthModal = () => {
    this.setState({ isLoggingIn: false });
    this.props.onDismissAuthModal();
  };

  render() {
    const {
      classes,
      creatorUsername,
      theme,
      currentPacky,
      saveHistory,
      saveStatus,
      loggedUser,
      isDownloading,
      // isResolving,
      isEditModalVisible,
      isAuthModalVisible,
      isWizziJobWaiting,
      onLoggedOn,
      onLoggedOff,
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
    } = this.props;

    // console.log('EditorToolbar.currentPacky', currentPacky);
    const isPublishing = saveStatus === 'publishing';
    const isPublished = saveStatus === 'published';

    return (
      <React.Fragment>{/*<ToolbarShell>*/}
        <AppBar className={classes.appBar} position="static">
            <Toolbar>
                <Typography variant="h4" color="inherit" className={classes.grow}>PACKY</Typography>
                { loggedUser && currentPacky && currentPacky.localPackyData && currentPacky.localPackyData.owner ? (
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                      {currentPacky.localPackyData.owner} / {currentPacky.localPackyData.repoName}
                    </Typography>
                  ) : loggedUser && currentPacky && currentPacky.localPackyData ? (
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                      {currentPacky.localPackyData.id}
                    </Typography>
                  ) : null}
                { loggedUser ? (
                  <Button variant="contained" size="small" className={classes.buttonIcon} onClick={onShowPackyManager}>
                    Manage Packies
                    <ExtensionIcon className={classes.rightIcon} />
                  </Button> ) : null }
                { false && loggedUser && currentPacky && currentPacky.localPackyData && currentPacky.localPackyData.owner ? (
                  <React.Fragment>
                  <Divider />
                  <Button variant="contained" size="small" className={classes.buttonIcon} onClick={onShowGithubCommit}>
                    Commit
                    <CloudUploadIcon className={classes.rightIcon} />
                  </Button>
                  </React.Fragment>
                ) : null }
                { loggedUser && currentPacky && currentPacky.localPackyData && !currentPacky.localPackyData.owner ? (
                  <React.Fragment>
                  <Divider />
                  <Button variant="contained" size="small" className={classes.buttonIcon} onClick={onShowGithubCreate}>
                    Create
                    <CreateIcon className={classes.rightIcon} />
                  </Button>
                  </React.Fragment>
                ) : null }
                {/*<SearchButton />
                {/* fill="#1DAEFF", fill="#1D94DD"*/}
                {/*<UserMenu onLogInClick={this._handleShowAuthModal} />*/}
                <Tooltip title={'View on github'} enterDelay={300}>
                    <IconButton
                      // edge="end"
                      component="a"
                      color="inherit"
                      href="https://github.com/stfnbssl/packy"
                      aria-label={'View on github'}
                      data-ga-event-category="AppBar"
                      data-ga-event-action="github"
                    >
                      <GithubIcon />
                    </IconButton>
                </Tooltip>                
                { loggedUser ? (
                  <React.Fragment>
                    <Divider />
                    <Button variant="contained" size="small" disabled={!isWizziJobWaiting} className={classes.buttonIcon} onClick={onExecuteWizziJob}>
                      Gen
                      <PlayArrowIcon className={classes.rightIcon} />
                    </Button>
                      <Button color="inherit" onClick={this._handleShowAuthModal}>
                        <Avatar alt={loggedUser.displayName} src={loggedUser.picture} className={classes.avatar} />
                      </Button>
                  </React.Fragment>
                ) : (
                  <Button color="inherit" onClick={this._handleShowAuthModal}>Login</Button>
                )}
            </Toolbar>
        </AppBar>
        <AppSidebar />
        <ModalAuthentication
            visible={this.state.isLoggingIn && isAuthModalVisible}
            loggedUser={loggedUser}
            onLoggedOn={onLoggedOn}
            onLoggedOff={onLoggedOff}
            onDismiss={this._handleDismissAuthModal}
            onComplete={this._handleDismissAuthModal}
          />
      {/*</ToolbarShell>*/}</React.Fragment>
    );
  }
}

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

const muiStyles =  (theme: Theme) => createStyles({
  root: {
    flexGrow: 1
  }, 
  appBar: {
    zIndex: theme.zIndex.drawer + 1,  
    marginLeft: `${Layout.MainDrawerWidth}px`,
    width: `calc(100% - ${Layout.MainDrawerWidth}px)`,
  },
  grow: {
    flexGrow: 1
  }, 
  menuButton: {
    marginLeft: -12, 
    marginRight: 20
  }, 
  buttonIcon: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },  
  avatar: {
    margin: 10,
  },  
});

const ThemedToolbar = withThemeName(EditorToolbar);

export default withStyles(muiStyles)(ThemedToolbar);