@publish = (publishName,cursorFn) ->
  count = 0
  Meteor.publish publishName, ->
    self = @
    cursor = cursorFn.apply self, arguments
    handle = cursor.observeChanges
      added   : (id, fields) ->
        self.added   publishName, id, fields
      changed : (id, fields) ->
        self.changed publishName, id, fields
      removed : (id)         ->
        self.removed publishName, id
    @ready()
    count += 1
    console.log publishName, 'publish', handle._id, count
    @onStop ->
      count -= 1
      console.log publishName, 'stop', handle._id, count
      handle.stop()
