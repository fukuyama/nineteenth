$(document).on('shown.bs.collapse', '.navbar-collapse', () => {
  if (app) {
    app.fitScreen();
  }
});

$(document).on('hidden.bs.collapse', '.navbar-collapse', () => {
  if (app) {
    app.fitScreen();
  }
});
