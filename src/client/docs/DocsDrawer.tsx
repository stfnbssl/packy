import React from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { config } from '../features/config';
import { pageToTitle } from './utils/helpers';
import DocsDrawerNavItem from './DocsDrawerNavItem';
import {Layout} from '../components/Common/Constants';

function renderNavItems({ pages, ...params }) {
    return (
      <List>
        {pages.reduce(
          // eslint-disable-next-line no-use-before-define
          (items, page) => reduceChildRoutes({ items, page, ...params }),
          [],
        )}
      </List>
    );
}
  
function reduceChildRoutes({ props, activePage, items, page, depth }) {
    if (page.displayNav === false) {
        return items;
    }
    if (page.children && page.children.length > 1) {
        const title = pageToTitle(page);
        const openImmediately = activePage.pathname.indexOf(`${page.pathname}/`) === 0;
        items.push(
            <DocsDrawerNavItem depth={depth} key={title} openImmediately={openImmediately} title={title}>
                {renderNavItems({ props, pages: page.children, activePage, depth: depth + 1 })}
            </DocsDrawerNavItem>,
        );
    } else {
        const title = pageToTitle(page);
        page = page.children && page.children.length === 1 ? page.children[0] : page;
        items.push(
            <DocsDrawerNavItem
                depth={depth}
                key={title}
                title={title}
                href={page.pathname}
                onClick={props.onClose}
            />,
        );
    }
    return items;
}

type Props = {
    classes: any;
    pages: any;
    activePage: string;
};

const FilesLink = props => <Link to="/" {...props} />
const VersionsLink = props => <Link to="/versions" {...props} />

function DocsDrawer(props: Props) {
    const { classes, pages, activePage } = props;
    return (
        <Drawer
            className={props.classes.drawer}
            variant="permanent"
            classes={{
                paper: props.classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.nav}>
                <div className={classes.toolbarIe11}>
                    <div className={classes.toolbar}>
                        <Button component={FilesLink} className={classes.button}>
                            <Typography variant="h6">Packi</Typography>
                        </Button>
                        {config.VERSION ? (
                            <Button component={VersionsLink} className={classes.button}>
                                <Typography variant="subtitle2">{config.VERSION}</Typography>
                            </Button>
                        ) : null}
                    </div>
                </div>
            </div>
            <Divider />        
            {renderNavItems({ props, pages, activePage, depth: 0 })}
        </Drawer>
    )
}

const muiStyles =  (theme: Theme) => createStyles({
    button: {
        padding: '0px 16px',
    },
    drawer: {
        width: `${Layout.DocsDrawerWidth}px`,
        flexShrink: 0,
    },
    drawerPaper: {
        width: `${Layout.DocsDrawerWidth}px`,
    },    
    title: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing.unit,
        '&:hover': {
          color: theme.palette.primary.main,
        },
      },
    // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
    toolbarIe11: {
        display: 'flex',
    },
    toolbar: {
        ...theme.mixins.toolbar,
        paddingLeft: theme.spacing.unit * 3,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },    
});
export default withStyles(muiStyles)(DocsDrawer);
