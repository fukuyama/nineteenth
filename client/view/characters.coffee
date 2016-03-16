FlowRouter.route '/characters',
  name   : 'characters'
  subscriptions : (param) ->
    @register 'Characters.owner', Meteor.subscribe 'Characters.owner'
    return
  action : ->
    BlazeLayout.render 'main',
      content : 'characters'
    return

Template.characters.onCreated ->
  ins = Template.instance()
  ins.groupNames = {}
  #ins.autorun ->
  #  ins.subscribe 'Characters.owner'

Template.characters.helpers
  characters : ->
    Characters.owner.find {},{sort: {createdAt: 1}}
  groupName : ->
    return '' unless @group?
    groupId = @group
    ins = Template.instance()
    return ins.groupNames[groupId].get() if ins.groupNames[groupId]?

    ins.groupNames[groupId] = new ReactiveVar('')
    ins.subscribe 'Groups.at', groupId,
      onReady: ->
        ins.groupNames[groupId].set Groups.at.findOne(groupId).name
    return ins.groupNames[groupId].get()
