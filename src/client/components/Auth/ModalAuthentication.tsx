import * as React from 'react';
import { authTypes } from '../../features/auth';
import { appTypes } from '../../features/app';
import ModalDialog from '../shared/MuiModalDialog';
import SocialLogin from './SocialLogin';

type Props = authTypes.AuthProps & {
  visible: boolean;
  onDismiss: () => void;
  onComplete: () => void;
};

type State = {
  error: boolean;
};

class ModalAuthentication extends React.Component<Props, State> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.visible && this.props.loggedUser !== prevProps.loggedUser) {
      this.props.onComplete();
    }
  }
  render() {
    return (
      <ModalDialog
        visible={this.props.visible}
        onDismiss={this.props.onDismiss}
        title={this.props.loggedUser ? 'Your profile' : "Log in to Packi"}>
        <SocialLogin 
          loggedUser={this.props.loggedUser} 
          onLoggedOn={this.props.onLoggedOn} 
          onLoggedOff={this.props.onLoggedOff}  />
      </ModalDialog>
    );
  }
}

export default ModalAuthentication;