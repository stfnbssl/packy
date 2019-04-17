import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import cookies from 'js-cookie';
import { PreferencesProvider, ColorsProvider } from './features/preferences';
// import ServiceWorkerManager from './components/ServiceWorkerManager';
import Router from './containers/Router';
import createStore from './store/createStore';
// import { HelmetProvider } from 'react-helmet-async';

const store = createStore({ 
  app: {},
  packy: {
    loading: false
  },
  wizzi: {
    loading: false,
    errors: undefined,
    generatedArtifact: undefined,
    jobGeneratedArtifacts: {},
    timedServices: {},
  }
});

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/*<ServiceWorkerManager />
        <React.StrictMode><HelmetProvider>*/}
          <Provider store={store}>
            <PreferencesProvider cookies={cookies} search={window.location.search}>
              <ColorsProvider>
                <BrowserRouter>
                  <Router userAgent={navigator.userAgent} />
                </BrowserRouter>
              </ColorsProvider>
            </PreferencesProvider>
          </Provider>
        {/*</HelmetProvider></React.StrictMode>*/}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
