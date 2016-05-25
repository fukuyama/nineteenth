
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
    this.mapx = 0
    this.mapy = 0
    this.mapSprite = options.mapSprite;
    this.superInit(options);

    const up    = (e) => {this.setPosition(this.mapx,this.mapy - 1)};
    const down  = (e) => {this.setPosition(this.mapx,this.mapy + 1)};
    const left  = (e) => {this.setPosition(this.mapx - 1,this.mapy)};
    const right = (e) => {this.setPosition(this.mapx + 1,this.mapy)};
    this.on('input_up',     up    );
    this.on('input_down',   down  );
    this.on('input_left',   left  );
    this.on('input_right',  right );
    this.on('repeat_up',    up    );
    this.on('repeat_down',  down  );
    this.on('repeat_left',  left  );
    this.on('repeat_right', right );
  },

  postrender(canvas) {
    canvas.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  },

  setPosition(mapx,mapy) {
    const pos = this.mapSprite.getMapPosition(mapx,mapy);
    this.moveTo(pos.x,pos.y);
    this.mapx = mapx;
    this.mapy = mapy;
  }

});
