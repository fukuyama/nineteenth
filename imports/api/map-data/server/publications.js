import { Meteor } from 'meteor/meteor';

import { MapData } from '/imports/api/map-data/map-data.js';

Meteor.publishComposite('AllMapData', function () {
  return {
    collectionName : 'AllMapData',
    find() {
      return MapData.find({});
    }
  };
});
