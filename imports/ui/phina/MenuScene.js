
# SceneBase がほしいかもキーボードイベントとかまとめたい
phina.define('nz.MenuScene',{
  superClass: 'phina.display.DisplayScene',

  _static: {
    defaults: {
      cols         : 1,
      padding      : 8,
      menuOptions  : {},
      labelOptions : {},
      fontSize     : 32,
      fontWeight   : '',
      fontFamily   : "'HiraKakuProN-W3'",
      menuFill     : 'blue'
    }
  },

  init(options={}) {
    this.superInit(options)
    const params = {}.$safe(options).$safe(MenuScene.defaults);
    this.cols       = params.cols;
    this.rows       = params.rows;
    this.padding    = params.padding;
    this.menus      = params.menus;
    this.fontFamily = params.fontFamily;
    this.fontSize   = params.fontSize;
    this.fontWeight = params.fontWeight;

    this.index = 0;

    this.rows       = this._calcRows();
    this.itemWidth  = this._calcItemWidth();
    this.itemHeight = this._calcItemHeight();

    this.width  = this.itemWidth  * this.cols + (this.cols + 1) * this.padding;
    this.height = this.itemHeight * this.rows + (this.rows + 1) * this.padding;
    
    this.menu = phina.display.RectangleShape().addChildTo(this);
    this.menu.x = this.gridX.center();
    this.menu.y = this.gridY.center();
    this.menu.width  = this.width;
    this.menu.height = this.height;
    this.menu.gridX = phina.util.Grid(this.width  - this.padding, this.cols, true);
    this.menu.gridY = phina.util.Grid(this.height - this.padding, this.rows, true, - this.menu.height / 2 + this.itemHeight / 2 + this.padding);

    this.cursor = phina.display.RectangleShape({
      width           : this.itemWidth,
      height          : this.itemHeight,
      stroke          : 'white',
      strokeWidth     : 3,
      visible         : true,
      cornerRadius    : 5,
      fill            : 'rgba(255,255,255,0.2)',
      backgroundColor : 'transparent'
    });
    this.cursor.addChildTo(this.menu);
    this.btns = [];
    this.menus.forEach((m,i) => {
      const btn = phina.ui.Button({
        text   : m.text,
        width  : this.itemWidth,
        height : this.itemHeight,
        stroke : false,
        fill   : false
      })
      .addChildTo(this.menu)
      .on('push', this._selectMenu.bind(this));
      btn.index = i;
      btn.x = this.menu.gridX.span((i % this.cols));
      btn.y = this.menu.gridY.span((i / this.cols).floor());
      this.btns.push(btn);
    });

    this.cursor.x = this.btns[this.index].x;
    this.cursor.y = this.btns[this.index].y;

    //@setupKeyboradHander()
    //@setupCursorHandler (e) ->
    //  console.log e.type
    //  return
    //this.on('keydown', (e) => {
    //  if (e.keyCode == phina.input.Keyboard.KEY_CODE['up']) {
    //    if (this.index > 0) {
    //      this.index -= 1;
    //    } else {
    //      this.index = this.menus.length - 1;
    //    }
    //  } else if (e.keyCode == phina.input.Keyboard.KEY_CODE['down']) {
    //    if (this.index < this.menus.length - 1) {
    //      this.index += 1;
    //    } else {
    //      this.index = 0;
    //    }
    //  } else if (e.keyCode == phina.input.Keyboard.KEY_CODE['left']) {
    //    if (this.index > 0) {
    //      this.index -= 1;
    //    } else {
    //      this.index = this.menus.length - 1;
    //    }
    //  }
    //    when phina.input.Keyboard.KEY_CODE['right']
    //      if @index < @menus.length - 1
    //        @index += 1
    //      else
    //        @index = 0
    //    when phina.input.Keyboard.KEY_CODE['enter']
    //      @btns[@index].flare('push')
    //      return
    //  @cursor.x = @btns[@index].x
    //  @cursor.y = @btns[@index].y
    //});
  }

  _selectMenu: (e) ->
    menu = @menus[e.target.index]
    if menu?
      @app.popScene()
      menu.fn()
    return

  _measureText: (text,options) ->
    canvas = phina.graphics.Canvas.dummyCanvas
    context = canvas.getContext('2d')
    context.font = "{fontWeight} {fontSize}px {fontFamily}".format(options)
    context.measureText(text + '').width

  _calcRows: ->
    @rows ? (@menus.length / @cols).ceil()

  _calcItemWidth: ->
    width = 0
    for m,i in @menus
      w = @_measureText(m.text,@)
      width = w if width < w
    width + 4

  _calcItemHeight: ->
    @fontSize

});
