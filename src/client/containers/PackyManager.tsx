import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { storeTypes } from '../store';
import { appTypes, appActions } from '../features/app';
import { packyTypes, packyDefaults, packyActions } from '../features/packy';
import { commonTypes } from '../../common';
import PackyManager from '../components/Editor/PackyManager';
import Spinner from '../components/shared/Spinner';

interface StateProps {
    loggedUser?: appTypes.LoggedUser,
    packyNames?: string[],
    currentPacky?: packyTypes.Packy,
    packyTemplateNames?: string[],
    ownedGitRepositories?: commonTypes.GitRepositoryMeta[],
}

interface DispatchProps {
    dispatchFetchPackyList: () => void;
    dispatchSelectPacky: (packyId: string) => void;
    dispatchCreatePacky: (packyId: string, packyKind: string) => void;
    dispatchDeletePacky: (packyId: string) => void;
    dispatchFetchPackyTemplateList: () => void;
    dispatchFetchOwnedGitRepositories: (uid: string) => void;
    dispatchCloneGitRepository: (uid: string, owner: string, name: string, branch: string) => void;
    dispatchCommitGitRepository: (uid: string, owner: string, name: string, branch: string, files: packyTypes.PackyFiles) => void;
  }
  
  const mapStateToProps = (state: storeTypes.StoreState) : StateProps => ({
    loggedUser: state.app.loggedUser,
    packyNames: state.packy.packyNames,
    currentPacky: state.packy.currentPacky,
    packyTemplateNames: state.packy.packyTemplateNames,
    ownedGitRepositories: state.packy.ownedGitRepositories,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    dispatchFetchPackyList: () => {
      dispatch(packyActions.fetchPackyListRequest());
    },
    dispatchSelectPacky: (packyId: string) => {
      dispatch(packyActions.selectPackyRequest({id: packyId}));
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
    dispatchCloneGitRepository: (uid: string, owner: string, name: string, branch: string) => {
      dispatch(packyActions.cloneGitRepositoryRequest({
        uid: uid,
        owner: owner,
        name: name,
        branch: 'master', // TODO
      }));
    },
    dispatchCommitGitRepository: (uid: string, owner: string, name: string, branch: string, files: packyTypes.PackyFiles) => {
      dispatch(packyActions.commitGitRepositoryRequest({
        uid: uid,
        owner: owner,
        name: name,
        branch: 'master', // TODO
        files: files
      }));
    },
    dispatchFetchPackyTemplateList: () => {
      dispatch(packyActions.fetchPackyTemplateListRequest());
    },
    dispatchFetchOwnedGitRepositories: (uid: string) => {
      dispatch(packyActions.fetchOwnedGitRepositoriesRequest({
          uid
      }));
    },
});

type Props = StateProps & 
      DispatchProps & {
    onClose: ()=> void;
}

type State = StateProps & {
}

class PackyManagerContainer extends React.Component<Props, State> {

    componentDidMount() {
        this.props.dispatchFetchPackyList();
        this.props.dispatchFetchPackyTemplateList();
        this.props.dispatchFetchOwnedGitRepositories(
            this.props.loggedUser.uid
        );
    }  

    _handleSelectPacky = async (packyId: string) => {
        this.props.dispatchSelectPacky(packyId);
        this.props.onClose();
    }

    _handleCreatePacky = async (packyId: string, packyKind: string) => {
        this.props.dispatchCreatePacky(packyId, packyKind);
        this.props.onClose();
    }

    _handleDeletePacky = async (packyId: string) => {
        this.props.dispatchDeletePacky(packyId);
    }

    _handleCloneGitRepository = async (owner: string, name: string, branch: string) => {
        this.props.dispatchCloneGitRepository(this.props.loggedUser.uid, owner, name, branch);
        this.props.onClose();
    }

    render() {
        const {
            currentPacky, 
            packyNames, 
            packyTemplateNames, 
            ownedGitRepositories
        } = this.props;
        console.log('PackyManagerContainer.render.props', this.props);
        if (packyNames && packyTemplateNames && ownedGitRepositories) {
            return (
                <PackyManager 
                    currentPacky={currentPacky}
                    packyNames={packyNames}
                    packyTemplateNames={packyTemplateNames}
                    ownedGitRepositories={ownedGitRepositories}
                    onSelectPacky={this._handleSelectPacky}
                    onCreatePacky={this._handleCreatePacky}
                    onDeletePacky={this._handleDeletePacky}
                    onCloneGitRepository={this._handleCloneGitRepository}
                    onCommitGitRepository={()=> {throw new Error('PackyManager.onCommitGitRepository not Implemented yet');}}
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
) (PackyManagerContainer);
  