import { Mongo } from 'meteor/mongo';

import { MapCells } from '/imports/api/map-cells/map-cells.js';

Meteor.publishComposite('RangeMapCells', function ({mapId,max,min}) {
  return {
    collectionName : 'RangeMapCells',
    find() {
      return MapCells.find({
        mapId : mapId,
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
