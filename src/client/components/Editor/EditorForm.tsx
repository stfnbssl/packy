import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';
import Select from 'react-select';
import { Form, withStatus, withValidation } from '../../features/form'
import { prefTypes, withThemeName } from '../../features/preferences';
import Button from '../shared/Button';
import LargeInput from '../shared/LargeInput';
import colors from '../../configs/colors';

export type FormField = {
    label?: string;
    type?: string;
    default?: string;
    options?: {label: string, value: string}[];
    // options?: any;
    onValidate?: (value: string)=> Error | null;
}

function validationOk(value: string): Error | null {
    return null;
}

type EditFormProps = {
    visible: boolean;
    title: string;
    action: string;
    fields: {
        [key: string]: FormField;
    };
    className?: string;
    onSubmit: (
        details: {
            [key: string]: string;
        }
    ) => void;
    onDismiss: () => void;
};

type Props = EditFormProps & {
    theme: prefTypes.ThemeName;
};

type State = {
    values?: {
        [key: string]: string;
    };
    visible: boolean;
};

function stateDefaultValues(fields: { [key: string]: FormField }): { [key: string]: string } {
    const ret: {[key: string]: string} = {}
    Object.keys(fields).map((k)=> {
        ret[k] = fields[k].default || '';
    });
    return ret;
}

// @ts-ignore
const FormButton = withStatus(Button);
// @ts-ignore
const ValidatedInput = withValidation(LargeInput);

class EditorForm extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props, state: State) {
      if (state.visible !== props.visible) {
        if (props.visible) {
          return {
            visible: props.visible,
            values: stateDefaultValues(props.fields),
          };
        } else {
          return { visible: props.visible };
        }
      }
      return null;
    }
    
    state = {
      visible: this.props.visible,
      values: stateDefaultValues(this.props.fields),
    };
    
    _handleSubmit = () => {
        this.props.onSubmit(this.state.values);
    };

    render() {
        const { visible, title, action, fields, theme, className, onDismiss } = this.props;
    
        return visible ?
            (<div>
                <div className={classnames(
                    css(styles.modal, theme === 'dark' ? styles.contentDark : styles.contentLight),
                    className
                )}>
                <div className={css(styles.title)}>{title}</div>
                <Form onSubmit={this._handleSubmit}>
                    {
                        Object.keys(fields).map((k,i) => {
                            const field = fields[k];
                            const Title = () => field.label ? (<h4 className={css(styles.subtitle)}>{field.label}</h4>) : null;
                            return field.type === 'text' ? (
                              <div key={i}>
                                  <Title />
                                  <ValidatedInput
                                      autoFocus
                                      value={this.state.values[k]}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                          this.setState({ values: { [k]: e.target.value} })
                                      }
                                      placeholder={field.label}
                                      validate={field.onValidate || validationOk}
                                  />
                              </div>) : field.type === 'select' ? (
                              <div key={i}>
                                <Title />
                                <Select 
                                  options={field.options} 
                                  onChange={(value) =>{
                                    console.log('onChange', k, value);
                                    this.setState({ values: { ...this.state.values,  [k]: (value as any).value as string} })
                                  }}
                                />
                              </div>
                              ) : null
                            }
                        )
                    }
                    <div className={css(styles.buttons)}>
                        <FormButton type="submit" large variant="secondary" loading={false}>
                            {action}
                        </FormButton>
                        <FormButton type="button" large variant="secondary" loading={false} onClick={onDismiss}>
                            Cancel
                        </FormButton>
                    </div>
                </Form>
                </div>
            </div>)
            : null
    }
}

export default withThemeName(EditorForm);

const styles = StyleSheet.create({
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
    subtitle: {
      fontSize: 16,
      fontWeight: 500,
      padding: 0,
      lineHeight: '22px',
      margin: '16px 0 6px 0',
    },
    buttons: {
      margin: '20px 0 0 0',
    },
    caption: {
      marginTop: 24,
      fontSize: '16px',
      lineHeight: '22px',
      textAlign: 'center',
    },
    link: {
      cursor: 'pointer',
      color: colors.primary,
      textDecoration: 'underline',
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        textAlign: 'center',
        borderRadius: 4,
        boxShadow: '0 1px 4px rgba(36, 44, 58, 0.3)',
      },
      close: {
        appearance: 'none',
        borderRadius: '1em',
        outline: 0,
        padding: 0,
        position: 'absolute',
        right: '-1em',
        top: '-1em',
        width: '2em',
        height: '2em',
        background: colors.background.dark,
        border: `2px solid ${colors.background.light}`,
        boxShadow: '0 1.5px 3px rgba(0, 0, 0, .16)',
        color: 'white',
        fontSize: '1em',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      contentLight: {
        backgroundColor: colors.content.light,
        color: colors.text.light,
      },
      contentDark: {
        backgroundColor: colors.content.dark,
        color: colors.text.dark,
        border: `1px solid ${colors.border}`,
      },
});
  
