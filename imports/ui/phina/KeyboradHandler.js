
export const setupKeyboradHandler = function (target) {
  target.on('enterframe', _createKeyboradHandler(target));
}

const _createKeyboradHandler = function (target) {
  const eventKeys      = ['up','down','left','right','enter','escape'];
  const repeatDelay    = 10;
  const repeatIntarval = 1;

  let repeatCount = 0;

  return (e) => {
    const kb = e.app.keyboard;
    eventKeys.forEach((key) => {
      if (kb.getKeyDown(key)) {
        repeatCount = 0;
        target.flare('input.' + key);
      }
    });

    eventKeys.forEach((key) => {
      if (kb.getKey(key)) {
        if (repeatDelay < repeatCount) {
          target.flare('repeat.' + key);
          repeatCount -= repeatIntarval;
        }
        repeatCount += 1;
      }
    });
  };
}
