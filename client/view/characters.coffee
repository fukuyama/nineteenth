# characters
Template.characters.helpers
  characters : ->
    Characters.find {},{sort: {createdAt: -1}}
