import { Meteor } from 'meteor/meteor';

import { Battles } from '/imports/api/battles/battles.js';
import { BattleJoinUsers } from '/imports/api/battles/battle-join-users.js';
import { BattleJoinGroups } from '/imports/api/battles/battle-join-groups.js';
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
    collectionName : 'RelartedJoinGroups',
    find(battle) {
      return BattleJoinGroups.find({battleId : battle._id})
    },
    children : [
      {
        collectionName : 'RelartedGroups',
        find(join) {
          return Groups.find({_id : join.groupId});
        },
        children : [
          {
            collectionName : 'RelartedGroupCharacters',
            find(group) {
              return Characters.find({groupId : group._id});
            }
          }
        ]
      }
    ]
  },
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
      const ids = BattleJoinUsers.find({userId : userId}).map((join) => {return join.battleId});
      console.log('BattleJoinUsers',ids);
      return Battles.find({_id : {$in : ids}});
    },
    children : relartedChildren
  };
});

Meteor.publishComposite('JoinBattlesId', function (userId=this.userId) {
  return {
    collectionName : 'JoinBattlesId',
    find() {
      return BattleJoinUsers.find({userId : userId});
    }
  };
});

//Meteor.publishComposite.enableDebugLogging();
