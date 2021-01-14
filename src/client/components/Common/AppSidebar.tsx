import React from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ViewListIcon from '@material-ui/icons/ViewList';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import {Layout} from './Constants';

const FilesLink = props => <Link to="/" {...props} />
const DocLink = props => <Link to="/getting-started/usage" {...props} />
const TestEditorFormLink = props => <Link to="/test/editorform" {...props} />

type Props = {
    classes: any;
};

function AppSidebar(props: Props) {
    return (
        <Drawer variant="permanent" classes={{paper: props.classes.drawerPaper}}>
          <List>
            <ListItem disableGutters={true}>
                <Tooltip title="View files list">
                  <IconButton component={FilesLink} classes={{root: props.classes.iconButton}}>
                    <ViewListIcon />
                  </IconButton>
                </Tooltip>
            </ListItem>
            <ListItem disableGutters={true}>
                <Tooltip title="View packi guide">
                  <IconButton component={DocLink} classes={{root: props.classes.iconButton}}>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
            </ListItem>
            <ListItem disableGutters={true}>
                <Tooltip title="Test edit form">
                  <IconButton component={TestEditorFormLink} classes={{root: props.classes.iconButton}}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
            </ListItem>
          </List>
        </Drawer>
    )
}

const muiStyles =  (theme: Theme) => createStyles({
    drawerPaper: {
        top: 0, // 'auto'
        width: `${Layout.MainDrawerWidth}px`,
    }, 
    iconButton: {
        padding: '10px',
    }, 
});
export default withStyles(muiStyles)(AppSidebar);
