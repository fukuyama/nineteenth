Session.setDefault 'map', {
  id   : 1
  mapx : 0
  mapy : 0
}

Tracker.autorun ->
  console.log 'mapcell'
  Meteor.subscribe 'MapCell', Session.get('map')
