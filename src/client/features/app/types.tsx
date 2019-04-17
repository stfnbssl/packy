import { prefTypes } from '../preferences';

export type LoggedUser = {
  id: string;  
  uid: string;  
  username: string;
  displayName: string;
  picture?: string;
};

export type QueryParams_VIA = {
    session_id?: string;
    // TODO local packy provider ?
    // local_packyger?: 'true' | 'false';
    // preview?: 'true' | 'false';
    code?: string;
    name?: string;
    description?: string;
    dependencies?: string;
    // sdkVersion?: SDKVersion;
    // appetizePayerCode?: string;
    // iframeId?: string;
    waitForData?: 'boolean';
    theme?: prefTypes.ThemeName;
  };  