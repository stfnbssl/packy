import React from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
    visible: boolean;
    className?: string;
    classes: any;
    title?: string;
    children: React.ReactNode;
    autoSize?: boolean;
    onDismiss: () => void;
};

function MuiModalDialog(props: Props) {
    return (
        <Dialog
            open={props.visible}
            className={props.className}
            onClose={props.onDismiss}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {props.onDismiss ? (
            <button
                className={props.classes.close}
                onClick={props.onDismiss}
                data-test-id="modal-close">
                ✕
            </button>
            ) : null}
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
        </Dialog>
    );
}

const muiStyles =  (theme: Theme) => createStyles({
    close: {
        appearance: 'none',
        borderRadius: '1em',
        outline: 0,
        padding: 0,
        position: 'absolute',
        right: '.5em',
        top: '.5em',
        width: '2em',
        height: '2em',
        background: theme.palette.primary.dark,
        border: `2px solid ${theme.palette.primary.light}`,
        boxShadow: '0 1.5px 3px rgba(0, 0, 0, .16)',
        color: 'white',
        fontSize: '1em',
        fontWeight: 'bold',
        textAlign: 'center',
      },
});
export default withStyles(muiStyles)(MuiModalDialog);