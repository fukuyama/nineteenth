import { Mongo } from 'meteor/mongo';
import { publish } from '/imports/api/functions.js';

export const Characters = new Mongo.Collection('Characters');

Characters.schema = new SimpleSchema({
  name : {
    type  : String,
    label : 'Name'
  },
  createdAt : {
    type  : Date,
    label : 'CreatedAt'
  },
  owner : {
    type  : String,
    label : 'UserID'
  },
  type : {
    type  : String,
    label : 'Type'
  },
  group : {
    type  : String,
    label : 'Group',
    defaultValue : '',
    optional: true
  }
});

Characters.attachSchema(Characters.schema);

publish('Characters.At', (id) => {
  return Characters.find({_id : id});
});

publish('Characters.Owner', (owner = this.userId) => {
  return Characters.find({owner : owner});
});

publish('Characters.Group', (group) => {
  if (!Array.isArray(group)) {
    group = [group];
  }
  return Characters.find({group : {$in : group}});
});

publish('Characters.GroupOther', (group) => {
  return Characters.find({
    owner : this.userId,
    group : {$ne : group}
  });
});
