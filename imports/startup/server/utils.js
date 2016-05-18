import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  user.defaultModel = null;
  user.points = 0;
  return user;
});