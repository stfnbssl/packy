import * as React from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ViewListIcon from '@material-ui/icons/ViewList';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import SimpleEditor from './SimpleEditor';
import IFramePage from '../shared/IFramePage';
import MarkdownElement from '../../docs/MarkdownElement';

type ViewKindType = 
    | 'generated' 
    | 'mtree' 
    | 'debug' 
    | 'browser';

type Props = {
    classes: any;
    generatedContent: string;
    generatedSourcePath: string;
}

type State = {
    view: ViewKindType | null;
}

class GeneratedView extends React.Component<Props, State> {
    state = {
        view: 'generated' as ViewKindType,
    }
    
    _handleGenerated = () =>
        this.setState({view: 'generated'});
    _handleMTree = () =>
        this.setState({view: 'mtree'});
    _handleDebug = () =>
        this.setState({view: 'debug'});
    _handleBrowser = () =>
        this.setState({view: 'browser'});

    render() {
        const {classes} = this.props;
        const {view} = this.state;
        return (
            <div className={classes.container}>
                {view === 'generated' && (
                    <div className={classes.editor}>
                    <SimpleEditor
                        path=""
                        value={this.props.generatedContent}
                        onValueChange={()=>null}
                        lineNumbers="on"
                    />
                    </div>
                )}
                {view === 'browser' && (
                    <div className={classes.editor}>
                    {(this.props.generatedSourcePath.endsWith('.html.ittf') ||
                        this.props.generatedSourcePath.endsWith('.svg.ittf')) ? (
                        <IFramePage
                            content={this.props.generatedContent}
                        />) :
                    this.props.generatedSourcePath.endsWith('.md.ittf') ? (
                        <MarkdownElement
                            text={this.props.generatedContent}
                        />) : (<h1>No viewer for document {this.props.generatedSourcePath}</h1>)}
                    </div>
                )}
                <div className={classes.sidebar}>
                    <List>
                        <ListItem disableGutters={true}>
                            <Tooltip title="View generated content">
                            <IconButton onClick={this._handleGenerated} classes={{root: classes.iconButton}}>
                                <ViewListIcon />
                            </IconButton>
                            </Tooltip>
                        </ListItem>
                        <ListItem disableGutters={true}>
                            <Tooltip title="View mTree">
                            <IconButton onClick={this._handleMTree} classes={{root: classes.iconButton}}>
                                <HelpIcon />
                            </IconButton>
                            </Tooltip>
                        </ListItem>
                        <ListItem disableGutters={true}>
                            <Tooltip title="View mTree build script">
                            <IconButton onClick={this._handleDebug} classes={{root: classes.iconButton}}>
                                <InfoIcon />
                            </IconButton>
                            </Tooltip>
                        </ListItem>
                        <ListItem disableGutters={true}>
                            <Tooltip title="Show artifact">
                            <IconButton onClick={this._handleBrowser} classes={{root: classes.iconButton}}>
                                <InfoIcon />
                            </IconButton>
                            </Tooltip>
                        </ListItem>
                    </List>
                </div>
            </div>
        );
    }
}

const muiStyles =  (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderLeft: '1px solid #cccccc',
        width: '44vw',
        height: '100%',
    },
    editor: {
        padding: '5px',
        flex: 'auto',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        background: theme.palette.primary.light
    },
    iconButton: {
        padding: '10px',
    }, 
});
export default withStyles(muiStyles)(GeneratedView);
  