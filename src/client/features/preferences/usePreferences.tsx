import { useContext } from 'react';
import { PreferencesContext } from './PreferencesProvider';
import { PreferencesContextType, PreferencesType, SetPreferencesType } from './types';

export default function usePreferences(): [PreferencesType, SetPreferencesType] {
  const { preferences, setPreferences } = useContext(PreferencesContext) as PreferencesContextType;
  return [preferences, setPreferences];
}
