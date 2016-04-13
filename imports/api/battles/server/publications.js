import { Meteor } from 'meteor/meteor';

import { Battles } from '/imports/api/battles/battles.js';
import { MapData } from '/imports/api/map-data/map-data.js';
import { Groups } from '/imports/api/groups/groups.js';
import { Characters } from '/imports/api/characters/characters.js';

const relartedChildren = [
  {
    collectionName : 'RelartedMapData',
    find(battle) {
      return MapData.find({_id : battle.mapId});
    }
  },
  {
    collectionName : 'RelartedGroups',
    find(battle) {
      return Groups.find({_id : {$in : battle.groupsId}});
    },
    children : [
      {
        collectionName : 'RelartedGroupCharacters',
        find(group,battle) {
          return Characters.find({groupId : group._id});
        }
      }
    ]
  }
];

Meteor.publishComposite('Battles', function (id) {
  return {
    collectionName : 'Battles',
    find() {
      return Battles.find({_id : id});
    },
    children : relartedChildren
  };
});

Meteor.publishComposite('JoinBattles', function (userId=this.userId) {
  return {
    collectionName : 'JoinBattles',
    find() {
      return Battles.find({
        joinUsersId : userId
      });
    },
    children : relartedChildren
  };
});

//Meteor.publishComposite.enableDebugLogging();
