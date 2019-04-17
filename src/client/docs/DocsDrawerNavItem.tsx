import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'classnames';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import { Link } from 'react-router-dom'

function createLink(href: string) {
    return (<Link to={href} {...props} />);
}

type Props = {
    classes: any;
    children?: React.ReactNode,
    depth: number,
    href?: string,
    onClick?: () => void,
    openImmediately?: boolean,
    title: string,
};

type State = {
    open: boolean;
}

class DocsDrawerNavItem extends React.Component<Props, State> {
  state = {
    open: this.props.openImmediately || false,
  };

  componentDidMount() {
    // So we only run this logic once.
    if (!this.props.openImmediately) {
      return;
    }
    // Center the selected item in the list container.
    const activeElement = document.querySelector(`.${this.props.classes.active}`);
    if (activeElement && activeElement.scrollIntoView) {
      activeElement.scrollIntoView({});
    }
  }
  handleClick = () => {
    console.log('DocsDrawerNavItem.handleClick', this.state);
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {
      children,
      classes,
      depth,
      href,
      onClick,
      openImmediately,
      title,
      ...other
    } = this.props;

    const style = {
      paddingLeft: 8 * (3 + 2 * depth),
    };

    console.log('DocsDrawerNavItem.href.title', href, title);

    if (href) {
      const DocLink = props => <Link to={href} {...props} />
      return (
        <ListItem className={classes.itemLeaf} disableGutters {...other}>
          <Button
            component={DocLink}
            className={clsx(classes.buttonLeaf, `depth-${depth}`)}
            disableRipple
            onClick={onClick}
            style={style}
          >
            {title}
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem className={classes.item} disableGutters {...other}>
        <Button
          classes={{
            root: classes.button,
            label: openImmediately ? 'algolia-lvl0' : '',
          }}
          onClick={this.handleClick}
          style={style}
        >
          {title}
        </Button>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </ListItem>
    );
  }
}

const muiStyles =  (theme: Theme) => createStyles({
    item: {
      display: 'block',
      paddingTop: 0,
      paddingBottom: 0,
    },
    itemLeaf: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0,
    },
    button: {
      letterSpacing: 0,
      justifyContent: 'flex-start',
      textTransform: 'none',
      width: '100%',
    },
    buttonLeaf: {
      letterSpacing: 0,
      justifyContent: 'flex-start',
      textTransform: 'none',
      width: '100%',
      fontWeight: theme.typography.fontWeightRegular,
      '&.depth-0': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    active: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
  });
  
export default withStyles(muiStyles)(DocsDrawerNavItem);
