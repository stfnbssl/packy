import React, {Component} from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FontAwesome from 'react-fontawesome';
import {config} from '../../features/config';
import {appTypes} from '../../features/app';
import {authTypes} from '../../features/auth';

type Props = authTypes.AuthProps & {
    classes: any;
    provider: string;
    socket: any;
};

type State = {
    user: appTypes.LoggedUser | undefined; 
    disabled: string;
};
  
class OAuthLogin extends React.Component<Props, State> {
    state: State = {
        user: undefined, 
        disabled: ''
    };
    popup: any;
    componentDidMount() {
        const {
            socket,
            provider,
            loggedUser
        } = this.props;
        if (loggedUser) {
            this.setState({
                user: loggedUser, 
            })
        }
        console.log('components.auth.OAuthLogin.did-mount, socket.id, provider', socket.id, provider);
        socket.on(provider, (user: appTypes.LoggedUser) => {
            console.log('components.auth.OAuthLogin.socket.on, user', user);
            if (this.popup) {
                this.popup.close();
            }
            this.setState({
                user
            });
            this.props.onLoggedOn(user);
        });
    }
    checkPopup() {
        const check = setInterval(() => {
            const {
                popup
            } = this;
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check);
                this.setState({
                    disabled: ''
                });
                this.popup = null;
            }
        }, 1000);
    }
    openPopup() {
        const {
            provider, 
            socket
        } = this.props;
        const width = 600,
            height = 600;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerHeight / 2) - (height / 2);
        const url = `${config.AUTH_PROVIDERS_URL}/${provider}?socketId=${socket.id}`;
        console.log('components.auth.OAuthLogin.socket.id, url', socket.id, url);
        return window.open(url, '', `toolbar=no, location=no, directories=no, status=no, menubar=no, 
            scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
            height=${height}, top=${top}, left=${left}`);
    }
    startAuth = () => {
        if (!this.state.disabled) {
            this.popup = this.openPopup();
            this.checkPopup();
            this.setState({
                disabled: 'disabled'
            });
        }
    }
    closeCard = () => {
        this.setState({
            user: undefined
        });
        this.props.onLoggedOff();
    }
    render() {
        const {
            provider,
            classes
        } = this.props;
        const displayName = this.state.user && this.state.user.displayName; 
        const picture = this.state.user && this.state.user.picture; 
        const {
            disabled
        } = this.state;
        const atSymbol = provider === 'twitter' ? '@' : '';
        return  (
                <div>
                {
                    displayName ?  (
                        <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image={picture}
                            title={displayName}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {displayName}
                            </Typography>
                            <Typography variant="body1">
                                {JSON.stringify(this.state.user, null, 2)}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Fab variant="extended" onClick={this.closeCard}>Logoff</Fab>
                        </CardActions>
                      </Card>
                    ) : (
                        <div>
                        {/*<div className={classes.card}>
                            <img src={picture} alt={displayName}></img>
                            <div className={classes.displayFlex}>
                                <div>
                                <h4>
                                {
                                    `${atSymbol}${displayName}`
                                }
                                </h4>
                                </div>
                                <div>
                                <Button variant="extendedFab" onClick={this.closeCard}>Logoff</Button>
                                </div>
                            </div>
                        </div>*/}
                        <div className={`${classes.btnWrapper} fadein-fast`}>
                            <button onClick={this.startAuth} className={`${classes.btn} ${provider} ${disabled}`}>
                                <FontAwesome name={provider}></FontAwesome>
                            </button>
                        </div>
                        </div>
                    )
                }
                </div>
            )
        ;
    }
}

const muiStyles =  (theme: Theme) => createStyles({
    'btn': {
        background: 'none', 
        color: 'inherit', 
        border: 'none', 
        padding: '0', 
        font: 'inherit', 
        cursor: 'pointer', 
        outline: 'inherit', 
        marginBottom: '20px', 
        borderRadius: '50%', 
        width: '215px', 
        height: '215px', 
        boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.25)', 
        transitionTimingFunction: 'ease-in', 
        transition: '0.3s', 
        transform: 'scale(0.7)', 
        '&:hover': {
            boxShadow: '2px 5px 5px rgba(0, 0, 0, 0.5)'
        }, 
        '&.disabled': {
            backgroundColor: '#999 !important', 
            cursor: 'no-drop'
        }, 
        '&.disabled:hover': {
            boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.25)'
        }, 
        '&.disabled:hover span': {
            textShadow: '1px 2px 2px rgba(0, 0, 0, 0.25)'
        }, 
        '& span': {
            fontSize: '10em !important', 
            textShadow: '1px 2px 2px rgba(0, 0, 0, 0.25)', 
            transition: '0.3s', 
            color: '#fff'
        }, 
        '&:hover span': {
            textShadow: '2px 5px 5px rgba(0, 0, 0, 0.5)', 
            transform: 'rotate(-1.1deg)'
        }, 
        '&.github': {
            border: '3px solid #ffffff', 
            background: '#767676'
        }, 
        '&.github:hover': {
            background: '#6e5494'
        }, 
        '&.twitter': {
            border: '3px solid #ffffff', 
            background: '#433e90'
        }, 
        '&.twitter:hover': {
            background: '#326ada'
        }, 
        '&.google': {
            border: '3px solid #ffffff', 
            background: '#0057e7'
        }, 
        '&.google:hover': {
            background: '#008744'
        }, 
        '&.facebook': {
            border: '3px solid #ffffff', 
            background: '#8b9dc3'
        }, 
        '&.facebook:hover': {
            background: '#3b5998'
        }
    }, 
    'btnWrapper': {
        height: '300px'
    }, 
    '__old_card': {
        backgroundColor: '#FFF', 
        borderRadius: '3%', 
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
        wordWrap: 'break-word', 
        width: '215px', 
        height: '100%', 
        marginBottom: '20px', 
        transition: '.5s'
    }, 
    'close': {
        borderRadius: '50%', 
        textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)', 
        float: 'right', 
        top: '-228px', 
        right: '-6px', 
        fontSize: '2em', 
        position: 'relative', 
        color: '#fff', 
        transition: '.5s'
    }, 
    '&:hover': {
        cursor: 'pointer', 
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)'
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 340,
        width: 340,
    },    
    displayFlex: {
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
});

export default withStyles(muiStyles)(OAuthLogin);