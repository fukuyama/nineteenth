# add_character
Template.add_character.helpers
  characterTypes : ->
    CharacterTypes.find {},{sort: {createdAt: -1}}

Template.add_character.events
  'submit .add_character': (event) ->
    event.preventDefault()
    Meteor.call 'addCharacter',
      name : event.target.name.value
      type : event.target.type.value
    FlowRouter.go('/characters')
