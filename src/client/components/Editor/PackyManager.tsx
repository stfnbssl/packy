import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

import { commonTypes } from '../../../common';
import { prefTypes, withThemeName, prefColors } from '../../features/preferences';
import { packyTypes, packyValids } from '../../features/packy';

import Button from '../shared/Button';
import EditorForm from '../../features/form/EditorForm';

type PackyManagerProps = {
  classes: any;
  currentPacky: packyTypes.Packy;
  packyNames: string[];
  packyTemplateNames: string[];
  ownedGitRepositories: commonTypes.GitRepositoryMeta[];
  onSelectPacky: (id: string) => void;
  onDeletePacky: (id: string) => void;
  onCreatePacky: (id: string, kind: string) => void;
  onCloneGitRepository: (owner: string, name: string, branch: string, ittfOnly: boolean) => void;
  onCommitGitRepository: (owner: string, name: string, branch: string, virtualFiles: boolean) => void;
  onUploadPackyTemplate: (templateId: string, virtualFiles: boolean) => void;
};

type Props = PackyManagerProps & {
  theme: prefTypes.ThemeName;
};

type modalKind = 'create' | 'clone' | 'commit' | 'saveTemplate' | 'none'; 

type State = {
  modalVisible: modalKind;
}

class PackyManager extends React.PureComponent<Props, State> {

  state = {
    modalVisible: 'none' as modalKind,
  }
  
  _handleDismissModal = () => {
    console.log('_handleDismissModal');
    this.setState({ modalVisible: 'none' });
  };
  
  _handleShowModal = (kind: modalKind) => {
    this.setState({ modalVisible: kind });
  };

  _handleCreatePacky = (name: string, kind: string) => {
    this._handleDismissModal();
    // alert('Create packy ' + name + ' of kind ' + kind);
    this.props.onCreatePacky(name, kind);
  };

  _handleClonePacky = (id: string, branch: string, ittfOnly: boolean) => {
    this._handleDismissModal();
    // alert('Clone package ' + id + ' branch ' + branch);
    this.props.onCloneGitRepository(id.split('_')[0], id.split('_')[1], branch, ittfOnly);
  };

  _handleCommitPacky = (id: string, branch: string, virtualFiles: boolean) => {
    this._handleDismissModal();
    alert('Commit package ' + id + ' branch ' + branch);
    this.props.onCommitGitRepository(id.split('_')[0], id.split('_')[1], branch, virtualFiles);
  };

  _handleUploadPackyTemplate = (templateId: string, virtualFiles: boolean) => {
    this._handleDismissModal();
    alert('Save packy template ' + templateId);
    this.props.onUploadPackyTemplate(templateId, virtualFiles);
  };

  render() {
    const { 
      classes,
      currentPacky,
      packyNames, 
      packyTemplateNames, 
      ownedGitRepositories, 
      onSelectPacky, 
      onDeletePacky,
    } = this.props;
    const { modalVisible } = this.state;
    const gitBranchesTODO = ['master'];

    return (
      <div>
        { modalVisible !== 'none' ? null : (
          <div>
            <div className={css(styles.buttons)}>
              <Fab
                variant="extended" 
                onClick={()=>this._handleShowModal('create')}
                className={classes.fabButton}>
                Create new
              </Fab>
              <Fab
                variant="extended" 
                onClick={()=>this._handleShowModal('clone')}
                className={classes.fabButton}>
                Git clone
              </Fab>
              <Fab
                variant="extended" 
                onClick={()=>this._handleShowModal('commit')}
                className={classes.fabButton}>
                Git commit/push
              </Fab>
              <Fab
                variant="extended" 
                onClick={()=>this._handleShowModal('saveTemplate')}
                className={classes.fabButton}>
                Upload template
              </Fab>
            </div>
            <div className={css(styles.title)}>Your Packies</div>
            <List dense={true}>
              {packyNames.map((name, i) => (
                  <ListItem key={i} button>
                    <ListItemText
                      primary={name}
                      onClick={()=>onSelectPacky(name)}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={()=>onDeletePacky(name)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  ))}
              </List>            
          </div>)
        }
        <EditorForm
            title="Create New Packy"
            action="Confirm"
            visible={modalVisible==='create'}
            onDismiss={this._handleDismissModal}
            onSubmit={values => {
              // alert(JSON.stringify(values));
              this._handleCreatePacky(values['name'], values['kind']);
            }}
            fields={{
              name: {type: 'text', label: 'Name', onValidate: packyValids.validatePackyName },
              kind: {type: 'select', label: 'Kind', options: packyTemplateNames.map((name)=> {
                return { label: name, value: name };
              })},
            }} />
        <EditorForm
            title="Clone git package"
            action="Confirm"
            visible={modalVisible==='clone'}
            onDismiss={this._handleDismissModal}
            onSubmit={(values: {[k: string]: any}) => {
              // alert(JSON.stringify(values));
              this._handleClonePacky(values['id'], values['branch'], values['ittfOnly']);
            }}
            fields={{
              id: {type: 'select', label: 'Package', options: ownedGitRepositories.map((item)=> {
                return { label: `${item.owner}_${item.name}`, value: `${item.owner}_${item.name}` };
              })},
              branch: {type: 'select', label: 'Branch', options: gitBranchesTODO.map((name)=> {
                return { label: name, value: name };
              })},
              ittfOnly: {type: 'checkbox', label: 'Clone ittf only', default: true },
            }} />
        {currentPacky && (
          <EditorForm
              title="Commit/push git package"
              action="Confirm"
              visible={modalVisible==='commit'}
              onDismiss={this._handleDismissModal}
              onSubmit={(values: {[k: string]: any}) => {
                // alert(JSON.stringify(values));
                this._handleCommitPacky(`${values['owner']}_${values['repoName']}`, values['branch'], values['virtualFiles']);
              }} 
              fields={{
                owner: {type: 'text', label: 'Owner', default:currentPacky.localPackyData.owner, onValidate: packyValids.validatePackyName },
                repoName: {type: 'text', label: 'Repo', default: currentPacky.localPackyData.repoName,  onValidate: packyValids.validatePackyName },
                branch: {type: 'text', label: 'Branch', default: currentPacky.localPackyData.branch, onValidate: packyValids.validatePackyName },
                virtualFiles: {type: 'checkbox', label: 'Virtual files', default: true },
              }} />
        )}
        {currentPacky && (
          <EditorForm
              title="Save packy template"
              action="Confirm"
              visible={modalVisible==='saveTemplate'}
              onDismiss={this._handleDismissModal}
              onSubmit={(values: {[k: string]: any}) => {
                // alert(JSON.stringify(values));
                this._handleUploadPackyTemplate(values['templateId'], values['virtualFiles']);
              }} 
              fields={{
                templateId: {type: 'text', label: 'Template id', default:currentPacky.localPackyData.id, onValidate: packyValids.validatePackyName },
                virtualFiles: {type: 'checkbox', label: 'Virtual files', default: true },
              }} />
        )}
      </div>
    );
  }
}

const c = prefColors.c;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    fontFamily: 'var(--font-monospace)',
    fontSize: 13,
    minHeight: 16,
    margin: '4px 0',
  },
  title: {
    height: 72,
    fontSize: 24,
    width: '100%',
    lineHeight: '24px',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 0 rgba(36, 44, 58, 0.1)',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 5,
    marginTop: '6px',
    borderTop: '1px black solid',
  },
  shortcutList: {
    fontSize: '1.2em',
    tableLayout: 'fixed',
  },
  shortcutCell: {
    padding: '6px 8px',
    color: c('primary'),
    background: 'white',
    ':hover': {
      background: c('primary'),
      color: 'white',
    },
  },
  shortcutLabelCell: {
    textAlign: 'right',
  },
  shortcutDescriptionCell: {
    textAlign: 'left',
  },
  shortcutLabel: {
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    padding: 0,
    display: 'inline-block',
  },

  saveButton: {
    minWidth: 100,
  },

});

const muiStyles =  (theme: Theme) => createStyles({
  fabButton: {
    margin: theme.spacing.unit,
  }, 
});

const StyledComp = withStyles(muiStyles)(PackyManager);
export default withThemeName(StyledComp);
