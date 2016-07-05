
//import { Factory } from 'meteor/factory';
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import { Graph } from './Graph.js';

console.log('test');
if (Meteor.isServer) {
  console.log('server test');
  describe('Graph', function() {
    describe('static method', function() {
      it('graph.distance (0,0) (0,1)', function() {
        console.log('server test run');
        const c1 = {
          mapx : 0,
          mapy : 0
        };
        const c2 = {
          mapx : 0,
          mapy : 1
        };
        const res = Graph.distance(c1,c2);
        assert.equal(res,1);
      });
    });
  });
}
