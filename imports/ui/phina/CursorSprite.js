
import {
  MAP_CHIP_SIZE,
} from '/imports/ui/lib/constants.js';

phina.define('nz.CursorShape', {

  superClass: 'phina.display.Shape',

  init(options) {
    options = ({}).$safe(options, {
      x               : 0,
      y               : 0,
      width           : MAP_CHIP_SIZE,
      height          : MAP_CHIP_SIZE,
      backgroundColor : 'transparent',
      stroke          : 'red',
      strokeWidth     : 4,
      fill            : undefined,
      visible         : true
    });
    this.superInit(options);
  },

  postrender(canvas) {
    canvas.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  }

});
