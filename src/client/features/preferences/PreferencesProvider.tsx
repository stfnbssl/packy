import * as React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { parse } from 'query-string';
import { config } from '../config';
import { PreferencesContextType, PreferencesType } from './types';

type Props = {
  search: string;
  cookies: {
    get: (key: string) => string | undefined;
    set?: (key: string, value: string) => void;
  };
  children: React.ReactNode;
};

type State = {
  preferences: PreferencesType;
};

const PREFERENCES_KEY = config.PREFERENCES_KEY;

const defaults: PreferencesType = {
  loggedUid: undefined,
  trustLocalStorage: false,
  fileTreeShown: true,
  panelsShown: false,
  panelType: 'errors',
  theme: 'light',
};

export const PreferencesContext = React.createContext<PreferencesContextType | null>(null);

class PreferencesProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { cookies, search } = this.props;

    let overrides: Partial<PreferencesType> = {};

    try {
      // Restore editor preferences from saved data
      overrides = JSON.parse(cookies.get(PREFERENCES_KEY) || '') || {};
    } catch (e) {
      // Ignore error
    }

    try {
      // Set theme if passed in query params
      const { theme, platform } = parse(search);
      if (theme === 'light' || theme === 'dark') {
        overrides.theme = theme;
      }
    } catch (e) {
      // Ignore error
    }

    this.state = {
      preferences: {
        ...defaults,
        ...overrides,
      },
    };
  }

  _persistPreferences = debounce(() => {
    const { cookies } = this.props;
    try {
      cookies.set && cookies.set(PREFERENCES_KEY, JSON.stringify(this.state.preferences));
    } catch (e) {
      // Ignore
    }
  }, 1000);

  _setPreferences = (overrides: Partial<PreferencesType>) => {
    this.setState(
      state => ({
        preferences: {
          ...state.preferences,
          ...overrides,
        },
      }),
      this._persistPreferences
    );
  };

  render() {
    return (
      <PreferencesContext.Provider
        value={{
          setPreferences: this._setPreferences,
          preferences: this.state.preferences,
        }}>
        {this.props.children}
      </PreferencesContext.Provider>
    );
  }
}

export default connect((state: any) => ({}))(PreferencesProvider);
