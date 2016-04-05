import { Meteor } from 'meteor/meteor';

const publish = function (publishName,cursorFn) {
  let count = 0;
  Meteor.publish(publishName, function () {
    const self   = this;
    const cursor = cursorFn.apply(self, arguments);
    const handle = cursor.observeChanges({
      added   : (id, fields) => {self.added  (publishName, id, fields);},
      changed : (id, fields) => {self.changed(publishName, id, fields);},
      removed : (id)         => {self.removed(publishName, id);}
    });
    self.ready();
    count += 1;
    console.log(publishName, 'publish', handle._id, count);
    self.onStop( () => {
      count -= 1;
      console.log(publishName, 'stop', handle._id, count);
      handle.stop();
    });
  });
};

export {
  publish
};
