export type PreferencesType = {
    // deviceConnectionMethod: ConnectionMethod;
    // devicePreviewPlatform: 'android' | 'ios';
    // devicePreviewShown: boolean;
    // editorMode: 'normal' | 'vim';
    fileTreeShown: boolean;
    panelsShown: boolean;
    panelType: 'errors' | 'logs';
    theme: ThemeName;
    timedJobRunning: boolean;
  };
  
export type SetPreferencesType = (overrides: Partial<PreferencesType>) => void;
  
export type PreferencesContextType = {
    setPreferences: SetPreferencesType;
    preferences: PreferencesType;
  };
  
export type ThemeName = 'light' | 'dark';