import { Meteor } from 'meteor/meteor';

import '../../ui/view/body.js';

import './accountsUiConfig.js';

Meteor.startup( () => {
  Session.setDefault(
    'map',
    {
      id   : 1,
      mapx : 0,
      mapy : 0
    }
  );
});
