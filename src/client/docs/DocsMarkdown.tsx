import React from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import DocsFrame from './DocsFrame';
import MarkdownElement from './MarkdownElement';

type Props = {
    classes: any;
    location: any;
    title: string;
    content: string;
};

function DocsMarkdown(props: Props) {
    return (
        <div className={props.classes.root}>
            <DocsFrame title={props.title} location={props.location}>
                <MarkdownElement
                    className={props.classes.markdownElement}
                    text={props.content}></MarkdownElement>
            </DocsFrame>
        </div>
    )
}

const muiStyles =  (theme: Theme) => createStyles({
    root: {
        overflow: 'auto',
    },
    markdownElement: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        padding: theme.spacing.unit / 2,
      },    
});
export default withStyles(muiStyles)(DocsMarkdown);
