
import {
  MAP_CHIP_SIZE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
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
    this.mapSprite = options.mapSprite;
    this.mapx = this.mapSprite.mapx;
    this.mapy = this.mapSprite.mapy;
    this.superInit(options);

    const up    = (e) => {
      this.inputKeyborad = true;
      this.setPosition(this.mapx,this.mapy - 1);
      this.checkDisplayRange();
    };
    const down  = (e) => {
      this.inputKeyborad = true;
      this.setPosition(this.mapx,this.mapy + 1);
      this.checkDisplayRange();
    };
    const left  = (e) => {
      this.inputKeyborad = true;
      this.setPosition(this.mapx - 1,this.mapy);
      this.checkDisplayRange();
    };
    const right = (e) => {
      this.inputKeyborad = true;
      this.setPosition(this.mapx + 1,this.mapy);
      this.checkDisplayRange();
    };
    this.on('input.up',     up    );
    this.on('input.down',   down  );
    this.on('input.left',   left  );
    this.on('input.right',  right );
    this.on('repeat.up',    up    );
    this.on('repeat.down',  down  );
    this.on('repeat.left',  left  );
    this.on('repeat.right', right );
  },

  postrender(canvas) {
    canvas.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  },

  setPosition(mapx,mapy) {
    const map = this.mapSprite;
    const pos = nz.Graph.mapXY2pos(
      mapx - map.mapx,
      mapy - map.mapy
    );
    this.moveTo(pos.x,pos.y);
    this.mapx = mapx;
    this.mapy = mapy;
  },

  checkDisplayRange() {
    const m = this.mapSprite;
    const x = m.x + this.x;
    const y = m.y + this.y;
    if (x <= MAP_CHIP_SIZE) {
      m.moveTo(m.x + MAP_CHIP_SIZE,m.y);
    }
    if (SCREEN_WIDTH - MAP_CHIP_SIZE <= x) {
      m.moveTo(m.x - MAP_CHIP_SIZE,m.y);
    }
    if (y <= MAP_CHIP_SIZE) {
      m.moveTo(m.x,m.y + MAP_CHIP_SIZE);
    }
    if (SCREEN_HEIGHT - MAP_CHIP_SIZE <= y) {
      m.moveTo(m.x,m.y - MAP_CHIP_SIZE);
    }
  }

});
