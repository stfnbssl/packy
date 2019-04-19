import * as React from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

type Props = {
    classes: any;
    errorName: string;
    errorLines: string[];
    errorMessage: string;
    errorStack: string;
}

class GenerationErrors extends React.Component<Props> {

    render() {
        const {classes, errorName, errorMessage, errorLines, errorStack} = this.props;
        return (
            <div className={classes.container}>
                <p className={classes.errorName}>{errorName}</p>
                <p className={classes.message}>
                    {errorMessage && errorMessage.split(',').map((line, i)=>
                        <div>{line}</div>
                    )}
                </p>
                <pre className={classes.lines}>
                    {errorLines && errorLines.join('\n')}
                </pre>
                <ul>
                    {errorStack && errorStack.split('\n').map((line, i)=>
                        <li key={i}>{line}</li>
                    )}
                </ul>
            </div>
        );
    }
}

const muiStyles =  (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #cccccc',
        width: '44vw',
        height: '100%',
        overflow: 'scroll'
    },
    errorName: {
        padding: '15px 30px',
        fontSize: '28px',
    },
    message: {
        padding: '15px 30px',
        fontSize: '20px',
    },
    lines: {
        padding: '15px 30px',
        fontSize: '18px',
        fontFamily: 'Courier, mono',
    },
});
export default withStyles(muiStyles)(GenerationErrors);
  