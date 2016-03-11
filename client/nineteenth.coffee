Meteor.startup ->
  Session.setDefault 'map', {
    id   : 1
    mapx : 0
    mapy : 0
  }
  Meteor.subscribe 'CharacterTypes'
