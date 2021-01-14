import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { storeTypes } from '../store';
import { appTypes, appActions } from '../features/app';
import { packiTypes, packiDefaults, packiActions, packiConversions } from '../features/packi';
import { prefTypes, withPreferences } from '../features/preferences';
import { commonTypes } from '../../common';
import PackiManager from '../components/Editor/PackiManager';
import Spinner from '../components/shared/Spinner';

interface StateProps {
    loggedUser?: appTypes.LoggedUser,
    packiNames?: string[],
    currentPacki?: packiTypes.Packi,
    packiTemplateNames?: string[],
    ownedGitRepositories?: commonTypes.GitRepositoryMeta[],
}

interface DispatchProps {
    dispatchFetchPackiList: () => void; 
    dispatchSelectPacki: (packiId: string) => void;
    dispatchCreatePacki: (packiId: string, packiKind: string) => void;
    dispatchDeletePacki: (packiId: string) => void;
    dispatchFetchPackiTemplateList: () => void;
    dispatchFetchOwnedGitRepositories: (uid: string) => void;
    dispatchCloneGitRepository: (uid: string, owner: string, name: string, branch: string, ittfOnly: boolean) => void;
    dispatchCommitGitRepository: (uid: string, owner: string, name: string, branch: string, files: packiTypes.PackiFiles) => void;
    dispatchUploadPackiTemplate: (uid:string,  templateId: string, files: packiTypes.PackiFiles) => void;
  }
  
  const mapStateToProps = (state: storeTypes.StoreState) : StateProps => ({
    loggedUser: state.app.loggedUser,
    packiNames: state.packi.packiNames,
    currentPacki: state.packi.currentPacki,
    packiTemplateNames: state.packi.packiTemplateNames,
    ownedGitRepositories: state.packi.ownedGitRepositories,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    dispatchFetchPackiList: () => {
      dispatch(packiActions.fetchPackiListRequest());
    },
    dispatchSelectPacki: (packiId: string) => {
      dispatch(packiActions.selectPackiRequest({id: packiId}));
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
    dispatchCloneGitRepository: (uid: string, owner: string, name: string, branch: string, ittfOnly: boolean) => {
      dispatch(packiActions.cloneGitRepositoryRequest({
        uid: uid,
        owner: owner,
        name: name,
        branch: 'master', // TODO
        ittfOnly
      }));
    },
    dispatchCommitGitRepository: (uid: string, owner: string, name: string, branch: string, files: packiTypes.PackiFiles) => {
      dispatch(packiActions.commitGitRepositoryRequest({
        uid: uid,
        owner: owner,
        name: name,
        branch: 'master', // TODO
        files: files,
      }));
    },
    dispatchFetchPackiTemplateList: () => {
      dispatch(packiActions.fetchPackiTemplateListRequest());
    },
    dispatchFetchOwnedGitRepositories: (uid: string) => {
      dispatch(packiActions.fetchOwnedGitRepositoriesRequest({
          uid
      }));
    },
    dispatchUploadPackiTemplate: (uid:string,  templateId: string, files: packiTypes.PackiFiles) => {
        dispatch(packiActions.uploadPackiTemplateRequest({
          uid: uid,
          templateId: templateId,
          files: files,
        }));
      },
});

type Props = prefTypes.PreferencesContextType & 
  StateProps & 
  DispatchProps & {
  onClose: ()=> void;
}

type State = StateProps & {
}

class PackiManagerContainer extends React.Component<Props, State> {

    componentDidMount() {
      this.props.dispatchFetchPackiList();
      this.props.dispatchFetchPackiTemplateList();
      if (this.props.preferences.connectGithubRepos) {
        this.props.dispatchFetchOwnedGitRepositories(
            this.props.loggedUser.uid
        );
      }
    }  

    _handleSelectPacki = async (packiId: string) => {
        this.props.dispatchSelectPacki(packiId);
        this.props.onClose();
    }

    _handleCreatePacki = async (packiId: string, packiKind: string) => {
        this.props.dispatchCreatePacki(packiId, packiKind);
        this.props.onClose();
    }

    _handleDeletePacki = async (packiId: string) => {
        this.props.dispatchDeletePacki(packiId);
    }

    _handleCloneGitRepository = async (owner: string, name: string, branch: string, ittfOnly: boolean) => {
        this.props.dispatchCloneGitRepository(this.props.loggedUser.uid, owner, name, branch, ittfOnly);
        this.props.onClose();
    }

    _handleCommitGitRepository = async (owner: string, name: string, branch: string, virtualFiles: boolean) => {
      const files: packiTypes.PackiFiles = virtualFiles ? this.props.currentPacki.files : packiConversions.packiFilterIttf(this.props.currentPacki.files);
      console.log('PackiManager._handleCommitGitRepository.virtualFiles', Object.keys(this.props.currentPacki.files), virtualFiles, Object.keys(files));
      this.props.dispatchCommitGitRepository(
        this.props.loggedUser.uid,
        owner,
        name,
        branch,
        files
      );
      this.props.onClose();
    }

    _handleUploadPackiTemplate = async (templateId: string, virtualFiles: boolean) => {
        const files: packiTypes.PackiFiles = virtualFiles ? this.props.currentPacki.files : packiConversions.packiFilterIttf(this.props.currentPacki.files);
        console.log('PackiManager._handleCommitGitRepository.virtualFiles', Object.keys(this.props.currentPacki.files), virtualFiles, Object.keys(files));
        this.props.dispatchUploadPackiTemplate(
          this.props.loggedUser.uid,
          templateId,
          files
        );
        this.props.onClose();
    }
  
    render() {
        const {
            currentPacki, 
            packiNames, 
            packiTemplateNames, 
            ownedGitRepositories
        } = this.props;
        console.log('PackiManagerContainer.render.props', this.props);
        if (packiNames && packiTemplateNames /* STOPPED && ownedGitRepositories */) {
            return (
                <PackiManager 
                    currentPacki={currentPacki}
                    packiNames={packiNames || []}
                    packiTemplateNames={packiTemplateNames || []}
                    ownedGitRepositories={ownedGitRepositories || []}
                    onSelectPacki={this._handleSelectPacki}
                    onCreatePacki={this._handleCreatePacki}
                    onDeletePacki={this._handleDeletePacki}
                    onCloneGitRepository={this._handleCloneGitRepository}
                    onCommitGitRepository={this._handleCommitGitRepository}
                    onUploadPackiTemplate={this._handleUploadPackiTemplate}
                />
            );
        } else {
            return (<Spinner />)
        }
    }
} 
  
export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
) (withPreferences(PackiManagerContainer));
  