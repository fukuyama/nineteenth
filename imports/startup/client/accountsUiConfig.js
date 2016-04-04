import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  requestPermissions   : {},
  passwordSignupFields : 'USERNAME_ONLY',
  extraSignupFields    : []
});
