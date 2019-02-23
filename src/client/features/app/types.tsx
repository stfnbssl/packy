import { prefTypes } from '../preferences';

export type Viewer = {
    username: string;
    nickname: string;
    picture?: string;
    user_metadata?: {
      appetize_code: string;
    };
  };

export type QueryParams = {
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