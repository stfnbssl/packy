export type PreferencesType = {
    loggedUid: string;
    trustLocalStorage: boolean;
    fileTreeShown: boolean;
    panelsShown: boolean;
    panelType: 'errors' | 'logs';
    theme: ThemeName;
  };
  
export type SetPreferencesType = (overrides: Partial<PreferencesType>) => void;
  
export type PreferencesContextType = {
    setPreferences: SetPreferencesType;
    preferences: PreferencesType;
  };
  
export type ThemeName = 'light' | 'dark';