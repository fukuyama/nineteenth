import { Meteor } from 'meteor/meteor';

import './accounts-ui-config.js';

import '/imports/ui/layouts/app-main.js';

Meteor.startup( function () {
  Meteor.subscribe('CharacterTypes');
});
