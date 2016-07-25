import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { BattleLogs } from '../battle-logs.js';

Meteor.publish('BattleLogs', function () {
  return BattleLogs.find({});
});
