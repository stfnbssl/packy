import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { parse } from 'query-string';
import App from './App';
import NonExistent from './NonExistent';

type Props = {
  userAgent: string;
};

export default class Router extends React.Component<Props> {
  _renderRoute = (props: any) => {
    return <App {...props} {...this.props} query={parse(props.location.search)} />;
  };
  render() {
    return (
      <Switch>
        <Route exact path="/packy" render={this._renderRoute} />
        <Route component={NonExistent} />
      </Switch>
    );
  }
}