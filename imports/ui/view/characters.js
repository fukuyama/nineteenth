FlowRouter.route '/characters',
  name   : 'characters'
  subscriptions : (param) ->
    @register 'Characters.Owner', Meteor.subscribe 'Characters.Owner'
    return
  action : ->
    BlazeLayout.render 'main',
      content : 'characters'
    return

Template.characters.onCreated ->
  ins = Template.instance()
  ins.groupNames = {}

Template.characters.helpers
  characters : ->
    Characters.Owner.find {},{sort: {createdAt: 1}}
  groupName : ->
    return '' unless @group?
    groupId = @group
    ins = Template.instance()
    return ins.groupNames[groupId].get() if ins.groupNames[groupId]?

    ins.groupNames[groupId] = new ReactiveVar('')
    ins.subscribe 'Groups.At', groupId,
      onReady: ->
        ins.groupNames[groupId].set Groups.At.findOne(groupId).name
    return ins.groupNames[groupId].get()
