import appES from './app.json';
import commonES from './common.json';
import dashboardES from './dashboard.json';
import resetPasswordES from './reset-password.json';
import setNewPasswordES from './set-new-password.json';
import settingsES from './settings.json';
import signInES from './sign-in.json';
import signUpES from './sign-up.json';
import usersES from './users.json';

export const es = Object.freeze({
  ...appES,
  ...commonES,
  ...dashboardES,
  ...resetPasswordES,
  ...setNewPasswordES,
  ...settingsES,
  ...signInES,
  ...signUpES,
  ...usersES,
});
