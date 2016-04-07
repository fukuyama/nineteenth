import { Mongo } from 'meteor/mongo';

import { MapCells } from '/imports/api/map-cells/map-cells.js';

Meteor.publishComposite('MapCells', function ({mapId,max,min}) {
  return {
    collectionName : 'MapCells',
    find() {
      return MapCells.find({
        mapid : mapid,
        mapx  : {
          $lt : max.x,
          $gt : min.x
        },
        mapy  : {
          $lt : max.y,
          $gt : min.y
        }
      });
    }
  };
});
