import { appTypes } from '../app'

export type AuthProps = {
  login: (details: { username: string; password: string }) => Promise<{ success: boolean }>;
  logout: () => Promise<void>;
  getSessionSecret: () => string;
  getToken: () => string;
  setMetadata: (metadata: { appetizeCode: string }) => Promise<void>;
  viewer?: appTypes.Viewer | undefined;
  dispatch: (action: { type: 'UPDATE_VIEWER'; viewer: appTypes.Viewer | null | undefined }) => void;
};

export type Auth0UserData = {
  name: string;
  username: string;
  id: string;
  given_name: string;
  family_name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: string;
  nonce: string;
  iss: string;
  sub: string;
  aud: string;
  exp: string;
  iat: string;
  ['https://expo.io/isOnboarded']: boolean;
};

export type Auth0TokenData = {
  access_token: string;
  expires_in: number;
  expires_at: number;
  scope: string;
  state: string;
  id_token: string;
  token_type: 'Bearer';
  sessionSecret: string;
};

