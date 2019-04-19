import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { prefTypes, prefColors, withPreferences } from '../../features/preferences';
import ToggleSwitch from '../shared/ToggleSwitch';
import LoadingText from '../shared/LoadingText';
import FooterShell from '../Shell/FooterShell';
// import SDKVersionSwitcher from './SDKVersionSwitcher';
// import FooterButton from '../shared/FooterButton';
import MenuButton from '../shared/MenuButton';
import IconButton from '../shared/IconButton';
import colors from '../../configs/colors';
// import { Annotation } from '../utils/convertErrorToAnnotation';
// import { SDKVersion } from '../configs/sdk';
import { Shortcuts } from './KeyboardShortcuts';
import ShortcutLabel from '../shared/ShortcutLabel';

export type Props = prefTypes.PreferencesContextType & {
  // loadingMessage: string | undefined;
  // annotations: Annotation[];
  loggedUid: string;
  autoGenSingleDoc: boolean;
  autoExecJob: boolean;
  connectGithubRepos: boolean;
  trustLocalStorage: boolean;
  fileTreeShown: boolean;
  panelsShown: boolean;
  // sdkVersion: SDKVersion;
  onToggleTheme: () => void;
  onTogglePanels: () => void;
  onToggleFileTree: () => void;
  // onChangeSDKVersion: (sdkVersion: SDKVersion) => void;
  onShowShortcuts: () => void;
  // onPrettifyCode: () => void;
  theme: string;
};

function Footer(props: Props) {
  const {
    // loadingMessage,
    // annotations,
    loggedUid,
    autoGenSingleDoc,
    autoExecJob,
    connectGithubRepos,
    trustLocalStorage,
    fileTreeShown,
    panelsShown,
    // sdkVersion,
    onToggleTheme,
    onTogglePanels,
    onToggleFileTree,
    // onChangeSDKVersion,
    onShowShortcuts,
    // onPrettifyCode,
    theme,
  } = props;

  const _toggleAutoGenSingleDoc = () =>
    props.setPreferences({
      autoGenSingleDoc: !props.preferences.autoGenSingleDoc,
    });

  const _toggleAutoExecJob = () =>
    props.setPreferences({
      autoExecJob: !props.preferences.autoExecJob,
    });

  const _toggleTrustLocalStorage = () =>
    props.setPreferences({
      trustLocalStorage: !props.preferences.trustLocalStorage,
    });

  const _toggleConnectGithubRepos = () =>
    props.setPreferences({
      connectGithubRepos: !props.preferences.connectGithubRepos,
    });

    const _toggleFileTree = () =>
    props.setPreferences({
      fileTreeShown: !props.preferences.fileTreeShown,
    });

  const _toggleTheme = () =>
    props.setPreferences({
      theme: props.preferences.theme === 'light' ? 'dark' : 'light',
    });

  const isErrorFatal = false/*annotations.some(a => a.severity > 3)*/;
  const isLoading = false; /*Boolean(loadingMessage);*/

  return (
    <FooterShell type={isErrorFatal && !isLoading ? 'error' : isLoading ? 'loading' : null}>
      <div className={css(styles.left)}>
        {isLoading ? (
          <LoadingText className={css(styles.loadingText)}>{/*loadingMessage*/}</LoadingText>
        ) : null /*(
          <button
            onClick={onTogglePanels}
            className={css(
              styles.statusText,
              annotations.length
                ? isErrorFatal
                  ? styles.errorTextFatal
                  : styles.errorText
                : styles.successText
            )}>
            {annotations.length
              ? `${annotations[0].source}: ${annotations[0].message.split('\n')[0]}` +
                (annotations.length > 1 ? ` (+${annotations.length - 1} more)` : '')
              : 'No errors'}
          </button>
            )*/}
      </div>
      {/*<FooterButton icon={require('../assets/prettify-icon.png')} onClick={onPrettifyCode}>
        <span className={css(styles.buttonLabel)}>Prettier</span>
          </FooterButton>*/}
      <MenuButton
        icon={require('../../assets/settings-icon.png')}
        label={<span className={css(styles.buttonLabel)}>Auth</span>}
        content={
          <React.Fragment>
            <div style={{paddingLeft: '15px'}}>Logged uid: {loggedUid}</div>
            <ToggleSwitch checked={trustLocalStorage} onChange={_toggleTrustLocalStorage} label="Trust local storage" />
            <ToggleSwitch checked={connectGithubRepos} onChange={_toggleConnectGithubRepos} label="Github repos connect" />
          </React.Fragment>
        } />
      <MenuButton
        icon={require('../../assets/settings-icon.png')}
        label={<span className={css(styles.buttonLabel)}>Wizzi</span>}
        content={
          <React.Fragment>
            <ToggleSwitch checked={autoGenSingleDoc} onChange={_toggleAutoGenSingleDoc} label="Auto gen single doc" />
            <ToggleSwitch checked={autoExecJob} onChange={_toggleAutoExecJob} label="Auto exec job" />
          </React.Fragment>
        } />
      <MenuButton
        icon={require('../../assets/settings-icon.png')}
        label={<span className={css(styles.buttonLabel)}>Editor</span>}
        content={
          <React.Fragment>
            <div className={css(styles.buttonItem, styles.buttonItemEditorPane)}>
              <IconButton
                title="Show keyboard shortcuts"
                label="Shortcuts"
                onClick={onShowShortcuts}>
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                  <path d="M3,0 L15,0 C16.6568542,-3.04359188e-16 18,1.34314575 18,3 L18,15 C18,16.6568542 16.6568542,18 15,18 L3,18 C1.34314575,18 -2.46162913e-15,16.6568542 -2.66453526e-15,15 L-1.77635684e-15,3 C-1.97926296e-15,1.34314575 1.34314575,-5.83819232e-16 3,-8.8817842e-16 Z M7.41949521,8.19170984 L7.41949521,5 L6,5 L6,13 L7.41949521,13 L7.41949521,9.68911917 L7.71192341,9.44041451 L11.0992167,13 L13,13 L8.7232376,8.62176166 L12.975631,5 L11.0809399,5 L7.41949521,8.19170984 Z" />
                </svg>
              </IconButton>
              <ShortcutLabel combo={Shortcuts.shortcuts.combo} />
            </div>
            <ToggleSwitch checked={fileTreeShown} onChange={_toggleFileTree} label="Files" />
            <ToggleSwitch checked={panelsShown} onChange={onTogglePanels} label="Panel" />
            <ToggleSwitch checked={theme !== 'light'} onChange={_toggleTheme} label="Dark theme" />
          </React.Fragment>
        }
      />
      {/*<SDKVersionSwitcher sdkVersion={sdkVersion} onChange={onChangeSDKVersion} />*/}
    </FooterShell>
  );
}

const c = prefColors.c;
const styles = StyleSheet.create({
  left: {
    display: 'flex',
    alignItems: 'stretch',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
  },

  loadingText: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '.5em',
  },

  statusText: {
    border: 0,
    outline: 0,
    margin: 0,
    appearance: 'none',
    backgroundColor: 'transparent',
    backgroundSize: 16,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '1em center',
    display: 'inline-block',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '.25em .5em .25em 3em',
    minWidth: 200,
    width: '100%',
    textAlign: 'left',
  },

  successText: {
    backgroundImage: `url(${require('../../assets/checkmark.png')})`,
  },

  errorText: {
    backgroundImage: `url(${require('../../assets/cross-red.png')})`,
    color: colors.error,
  },

  errorTextFatal: {
    backgroundImage: `url(${require('../../assets/cross-light.png')})`,
  },

  devicesCount: {
    position: 'absolute',
    top: 4,
    right: 6,
    height: 20,
    minWidth: 20,
    borderRadius: '50%',
    backgroundColor: c('text'),
    color: c('background'),
    opacity: 0.5,
  },

  devicePane: {
    padding: '0 16px',
  },

  devicePaneItem: {
    margin: '0 -16px',
  },

  deviceLabel: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    padding: '8px 0',
  },

  deviceIcon: {
    height: 16,
    width: 16,
    marginRight: 8,
    fill: 'currentColor',
  },

  noDevicesMessage: {
    whiteSpace: 'nowrap',
    margin: 8,
  },

  buttonLabel: {
    display: 'none',

    '@media (min-width: 720px)': {
      display: 'inline',
    },
  },

  buttonItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonItemEditorPane: {
    margin: '-8px 12px 0 12px',
  },

  buttonItemDevicePane: {
    margin: -4,
  },

  title: {
    margin: '16px 0 8px',
  },
});

export default withPreferences(Footer);
