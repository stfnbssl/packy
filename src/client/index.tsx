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

/*declare const __INITIAL_DATA__: {
  data: any;
  splitTestSettings: any;
}*/
const __INITIAL_DATA__ = {
  data: {},
  splitTestSettings: {}
};

const store = createStore({ 
  app: {splitTestSettings: __INITIAL_DATA__.splitTestSettings},
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

class FileListEntry extends React.Component {
  render() {
    return (
      <React.StrictMode>
        {/*<ServiceWorkerManager />
        <HelmetProvider>*/}
          <Provider store={store}>
            <PreferencesProvider cookies={cookies} search={window.location.search}>
              <ColorsProvider>
                <BrowserRouter>
                  <Router data={{type:'success', pacmodel:{}}/*__INITIAL_DATA__.data*/} userAgent={navigator.userAgent} />
                </BrowserRouter>
              </ColorsProvider>
            </PreferencesProvider>
          </Provider>
        {/*</HelmetProvider>*/}
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<FileListEntry />, document.getElementById('root'));
