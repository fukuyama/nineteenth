
//import { Factory } from 'meteor/factory';
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import './Graph.js';

if (Meteor.isServer) {
  describe('Graph', () => {
    describe('static method', () => {
      it('graph.distance (0,0) (0,1)', () => {
        const c1 = {
          mapx : 0,
          mapy : 0
        };
        const c2 = {
          mapx : 0,
          mapy : 1
        };
        const res = anz.Graph.distance(c1,c2);
        assert.equal(res,1);
      });
    });
  });
}
