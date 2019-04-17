import { appTypes } from '../app'

export type AuthProps = {
  loggedUser?: appTypes.LoggedUser | undefined;
  onLoggedOn: (user: appTypes.LoggedUser) => void;
  onLoggedOff: () => void;
};

