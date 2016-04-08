import { Meteor } from 'meteor/meteor';

import './accounts-ui-config.js';

import '/imports/ui/layouts/app-main.js';

Meteor.startup( () => {
  Session.setDefault(
    'map',
    {
      id   : 1,
      mapx : 0,
      mapy : 0
    }
  );

  Meteor.subscribe('CharacterTypes');
  Meteor.subscribe('OwnerCharacters');
  Meteor.subscribe('OwnerGroups');
});
