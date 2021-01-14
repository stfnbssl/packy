import * as React from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import EditorForm from './EditorForm'

const typeValues = ['one', 'two', 'three'];
export const validateName = (name: string) =>
    name
    ? /^[a-z_\-\d\s]+$/i.test(name)
        ? null
        : new Error('Name can only contain letters, numbers, space, hyphen (-) and underscore (_).')
    : new Error('Name cannot be empty.');

export const validateRequired = (value: any) => {
    console.log('validateRequired', value, value.length, typeof(value), value.length && value.length == 0, typeof(value) === 'undefined' || value == null || value.length == 0
    ? new Error('Required value')
    : null);
    return typeof(value) === 'undefined' || value == null || value.length == 0
        ? new Error('Required value')
        : null;
}

type Props = {
    classes: any;
}
function TestEditorForm(props: Props) {
    return (
        <div className={props.classes.container}>
        <EditorForm
            title="Create New Packi"
            action="Done"
            visible={true}
            onDismiss={ () => {
                alert('form dismissed');
            }}
            onSubmit={values => {
                alert(JSON.stringify(values));
            }}
            fields={{
                name: {type: 'text', label: 'Name', onValidate: validateName },
                kind: {type: 'select', label: 'Kind', onValidate: validateRequired, options: typeValues.map(name => {
                    return { label: name, value: name };
                })},
            }} />
        </div>
    )
}
const muiStyles =  (theme: Theme) => createStyles({
    container: {
        position: 'absolute',
        margin: 'auto',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        width: '400px',
        height: '500px',
        backgroundColor: '#ccc',
        borderRadius: '3px',        
    }, 
});
export default withStyles(muiStyles)(TestEditorForm);