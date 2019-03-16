import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { parse } from 'query-string';
import App from './App';
// import EmbeddedApp from './EmbeddedApp';
import NonExistent from './NonExistent';

type Props = {
  data:
    | {
        type: 'success';
        pacmodel: object | null;
      }
    | {
        type: 'error';
        error: {
          message: string;
        };
      }
    | null;
  userAgent: string;
};

export default class Router extends React.Component<Props> {
  _renderRoute = (props: any) => {
    const { data, ...rest } = this.props;

    if (data && data.type === 'success') {
      /*
      const isEmbedded = props.location.pathname.split('/')[1] === 'embedded';
      if (isEmbedded) {
        return (
          <EmbeddedApp
            {...props}
            {...rest}
            query={parse(props.location.search)}
            pacmodel={data.pacmodel}
          />
        );
      }
      */
      return <App {...props} {...rest} query={parse(props.location.search)} pacmodel={data.pacmodel} />;
    } else {
      return <NonExistent />;
    }
  };

  render() {
    return (
      <Switch>
        <Route exact path="/embedded/@:username/:projectName+" render={this._renderRoute} />
        <Route exact path="/embedded/:id" render={this._renderRoute} />
        <Route exact path="/embedded" render={this._renderRoute} />
        <Route exact path="/@:username/:projectName+" render={this._renderRoute} />
        <Route exact path="/:id" render={this._renderRoute} />
        <Route exact path="/" render={this._renderRoute} />
        <Route exact path="/packy/app" render={this._renderRoute} />
        <Route component={NonExistent} />
      </Switch>
    );
  }
}
