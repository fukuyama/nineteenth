import { Meteor } from 'meteor/meteor';

import './accounts-ui-config.js';

import '../../ui/layouts/app-main.js';

Meteor.startup( () => {
  Session.setDefault(
    'map',
    {
      id   : 1,
      mapx : 0,
      mapy : 0
    }
  );

  Tracker.autorun( () => {
    Meteor.subscribe('CharacterTypes');
  });
});
