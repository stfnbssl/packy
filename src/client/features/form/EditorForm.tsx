import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import classnames from 'classnames';
import { Form, withStatus, withValidation } from './index'
import { prefTypes, withThemeName } from '../preferences';
// import Button from '../shared/Button';
import LargeInput from '../../components/shared/LargeInput';
import colors from '../../configs/colors';
import { SelectionDirection } from 'monaco-editor';

export type FormField = {
    label?: string;
    helperText?: string;
    type?: string;
    default?: string;
    defaultOption?: {label: string, value: string};
    options?: {label: string, value: string}[];
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
  classes: any;
  theme: prefTypes.ThemeName;
};

type State = {
    values?: {
        [key: string]: any;
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

function optionsSelected(options: {label: string, value: string}[], value: string): any {
    const selected = options.find(option=>option.value === value);
    return selected ? selected.value : undefined;
}


// @ts-ignore
const SubmitButton = withStatus(Fab);
// @ts-ignore
const ValidatedInput = withValidation(TextField);

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
        const { classes, visible, title, action, fields, theme, className, onDismiss } = this.props;
        console.log('EditForm.state.values', this.state.values);
    
        return visible ?
            (<div className={classes.container}>
                <div className={classnames(
                    css(styles.modal, theme === 'dark' ? styles.contentDark : styles.contentLight),
                    className
                )}>
                <div className={classes.title}>
                  <Typography variant="h6">{title}</Typography>
                </div>
                <Form onSubmit={this._handleSubmit}>
                    {
                        Object.keys(fields).map((k,i) => {
                            const field = fields[k];
                            const value = this.state.values[k];
                            return field.type === 'text' ? (
                              <div key={i} className={classes.fieldContainer}>
                                  <ValidatedInput
                                      autoFocus
                                      className={classes.textField}
                                      margin="normal"
                                      label={field.label}
                                      value={value}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                          this.setState({ values: { ...this.state.values,  [k]: e.target.value} })
                                      }
                                      placeholder={field.label}
                                      validate={field.onValidate || validationOk}
                                  />
                              </div>) : field.type === 'select' ? (
                              <div key={i} className={classes.fieldContainer}>
                                <ValidatedInput        
                                  select
                                  className={classes.textField}
                                  label={field.label}
                                  SelectProps={{
                                    MenuProps: {
                                      className: classes.menu,
                                    },
                                  }}
                                  helperText={field.helperText}
                                  margin="normal"
                                  value={value}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    console.log('onChange', k, e.target.value);
                                    this.setState({ values: { ...this.state.values,  [k]: e.target.value} });
                                  }}
                                  placeholder={field.label}
                                  validate={field.onValidate || validationOk}
                                >
                                  {field.options.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </ValidatedInput>                                
                              </div>
                              ) : null
                            }
                        )
                    }
                    <div className={css(styles.buttons)}>
                        <div className={classes.button}><SubmitButton type="submit" color="primary" variant="extended">
                            {action}
                        </SubmitButton></div>
                        <div className={classes.button}><Fab type="button" color="secondary" variant="extended" onClick={onDismiss}>
                            Cancel
                        </Fab></div>
                    </div>
                </Form>
                </div>
            </div>)
            : null
    }
}

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
      display: 'flex',
      justifyContent: 'space-around'
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
        textAlign: 'start',
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

const muiStyles =  (theme: Theme) => createStyles({
  container: {
    padding: '20px',
  },
  title: {
    padding: '10px',
    boxShadow: '0 1px 0 rgba(36, 44, 58, 0.1)',
  },
  fieldContainer: {
    padding: '10px',
  },
  button: {
    padding: '5px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },  
});
export default withStyles(muiStyles)(withThemeName(EditorForm));
  
