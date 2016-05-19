import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  user.defaultModel = null;
  user.points = 0;
  if (options.defaultModel) user.defaultModel = options.defaultModel;
  if (options.points) user.points = options.points;
  return user;
});