Package.describe({
  name    : 'nineteenth:initial-data',
  version : '0.0.1',
  summary : 'initial data',
  git     : ''
});

Package.onUse( function (api) {
  api.versionsFrom('1.0');

  api.use([
    'coffeescript'
  ]);

  api.addFiles('startup.coffee', 'server');

  api.addAssets('data/character_test_ss.coffee','server');

  Npm.depends({
    'coffee-script' : '1.10.0'
  });
});

Package.onTest( function (api) {
});
