import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { parse } from 'query-string';
import App from './App';
import NonExistent from './NonExistent';
import Usage from '../docs/pages/getting-started/usage';
import FirstPacki from '../docs/pages/getting-started/firstpacki';
import WizziIttf from '../docs/pages/wizzi/ittf';
import WizziJobs from '../docs/pages/wizzi/jobs';
import TestEditorForm from '../features/form/TestEditorForm';

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
        <Route exact path="/" render={this._renderRoute} />
        <Route exact path="/getting-started/usage" component={Usage} />
        <Route exact path="/getting-started/firstpacki" component={FirstPacki} />
        <Route exact path="/wizzi/ittf" component={WizziIttf} />
        <Route exact path="/wizzi/jobs" component={WizziJobs} />
        <Route exact path="/test/editorform" component={TestEditorForm} />
        <Route component={NonExistent} />
      </Switch>
    );
  }
}