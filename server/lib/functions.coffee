@publish = (publishName,cursorFn) ->
  Meteor.publish publishName, ->
    self = @
    cursor = cursorFn.apply self, arguments
    handle = cursor.observeChanges
      added   : (id, fields) -> self.added   publishName, id, fields
      changed : (id, fields) -> self.changed publishName, id, fields
      removed : (id)         -> self.removed publishName, id
    @ready()
    @onStop -> handle.stop()
