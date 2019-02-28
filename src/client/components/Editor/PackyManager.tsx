import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { prefTypes, withThemeName, prefColors } from '../../features/preferences';
import { packyValids } from '../../features/packy';
import Button from '../shared/Button';
import EditorForm from './EditorForm';

type PackyManagerProps = {
  packyNames: string[];
  packyTemplateNames: string[];
  onSelectPacky: (name: string) => void;
  onCreatePacky: (name: string, kind: string) => void;
};

type Props = PackyManagerProps & {
  theme: prefTypes.ThemeName;
};

type State = {
  isEditModalVisible: boolean;
}

class PackyManager extends React.PureComponent<Props, State> {

  state = {
    isEditModalVisible: false,
  }
  
  _handleDismissEditModal = () => {
    console.log('_handleDismissEditModal');
    this.setState({ isEditModalVisible: false });
  };
  
  _handleShowModal = () => {
    this.setState({ isEditModalVisible: true });
  };

  _handleCreatePacky = (name: string, kind: string) => {
    this.setState({ isEditModalVisible: false });
    alert('Create packy ' + name + ' of kind ' + kind);
    this.props.onCreatePacky(name, kind);
  };

  render() {
    const { packyNames, packyTemplateNames, onSelectPacky } = this.props;
    const { isEditModalVisible } = this.state;

    return (
      <div>
        { isEditModalVisible ? null : (
          <div>
            <div className={css(styles.title)}>Your Packies</div>
            <table className={css(styles.shortcutList)}>
              <tbody>
                {packyNames.map((name, i) => (
                  <tr key={i}>
                    <td className={css(styles.shortcutCell, styles.shortcutLabelCell)} onClick={()=>onSelectPacky(name)}>
                      <kbd className={css(styles.shortcutLabel)}>
                        <span>{name}</span>
                      </kbd>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={css(styles.buttons)}>
              <Button
                variant="accent"
                onClick={this._handleShowModal}
                className={css(styles.saveButton)}>
                Create new
              </Button>
            </div>
          </div>)
        }
        <EditorForm
            title="Create New Packy"
            action="Done"
            visible={isEditModalVisible}
            onDismiss={this._handleDismissEditModal}
            onSubmit={values => {
              alert(JSON.stringify(values));
              this._handleCreatePacky(values['name'], values['kind']);
              this._handleDismissEditModal();
            }}
            fields={{
              name: {type: 'text', label: 'Name', onValidate: packyValids.validatePackyName },
              kind: {type: 'select', label: 'Kind', options: packyTemplateNames.map((name)=> {
                return { label: name, value: name };
              })},
            }} />
      </div>
    );
  }
}

export default withThemeName(PackyManager);

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
