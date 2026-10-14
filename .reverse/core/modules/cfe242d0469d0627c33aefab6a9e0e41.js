EDU(
  'cfe242d0469d0627c33aefab6a9e0e41',
  function () {
    var e = NEJ.P,
      t = NEJ.O,
      n = NEJ.F,
      i = e('nej.c'),
      o = e('nej.e'),
      a = e('nej.u'),
      r = e('nej.ut'),
      s = e('nej.ui'),
      c = e('nej.v'),
      d,
      l;
    var u =
      '<div class="zitm zbg colorbtn" title="">                        <div class="zicn zbg"></div>                        <div class="colordown j-down"></div>                    </div>';
    s._$$ColorButton = NEJ.C();
    d = s._$$ColorButton._$extend(s._$$Popup);
    l = s._$$ColorButton._$supro;
    d.__init = function () {
      this.__supInit();
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__title = e.title || '';
      this.__editor = e.editor;
      this.__body.title = this.__title;
      this._$setDisabled(!1);
      this.__editor.addListener(
        'selectionchange',
        function () {
          var e = this.__editor.queryCommandState(this.__cmd);
          if (e == -1) this._$setDisabled(!0);
          else this._$setDisabled(!1);
        }._$bind(this),
      );
      this.__editor.addListener(
        'focus',
        function () {
          this.__hideColorPicker();
        }._$bind(this),
      );
    };
    d.__destroy = function () {
      if (this.__colorPickerUI)
        this.__colorPickerUI = s._$$ColorPicker._$recycle(this.__colorPickerUI);
      this.__supDestroy();
    };
    d.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(u);
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__cmd = 'forecolor';
      this.__isDisabled = !1;
      this.__downNode = o._$getByClassName(this.__body, 'j-down')[0];
      c._$addEvent(this.__body, 'mouseup', this.__onClick._$bind(this));
    };
    d._$setDisabled = function (e) {
      this.__isDisabled = e;
      if (e) o._$addClassName(this.__body, 'js-disabled');
      else o._$delClassName(this.__body, 'js-disabled');
    };
    d._$isDisabled = function () {
      return this.__isDisabled;
    };
    d.__onClick = function (e) {
      if (!this.__isDisabled) {
        if (!this.__colorPickerUI)
          this.__colorPickerUI = s._$$ColorPicker._$allocate({
            parent: this.__downNode,
            onColorPick: this.__onColorPick._$bind(this),
            onClearColor: this.__onClearColor._$bind(this),
          });
        if ('block' == o._$getStyle(this.__downNode, 'display')) this.__hideColorPicker();
        else this.__showColorPicker();
      }
    };
    d.__showColorPicker = function () {
      this.__downNode.style.display = 'block';
    };
    d.__hideColorPicker = function () {
      this.__downNode.style.display = 'none';
    };
    d.__onColorPick = function (e) {
      this.__hideColorPicker();
      this.__editor.execCommand(this.__cmd, e);
    };
    d.__onClearColor = function () {
      this.__hideColorPicker();
      this.__editor.execCommand(this.__cmd, 'default');
    };
    d.__hidePop = d.__hideColorPicker;
    return s._$$ColorButton;
  },
  '2251224ef4bde318c45429fafdfcdd19',
  '28723c1c15c373c632e2f6d3d88dd9dc',
  'e4f0e677b4eb2a587b785dca958b7b98',
);
