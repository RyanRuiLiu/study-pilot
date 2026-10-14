EDU(
  'e4f0e677b4eb2a587b785dca958b7b98',
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
      '<div class="u-ecolorpicker">                    <a class="clear j-clearcolor">无颜色</a>                    <div class="colors j-colors"></div>                    </div>';
    s._$$ColorPicker = NEJ.C();
    d = s._$$ColorPicker._$extend(s._$$Abstract);
    l = s._$$ColorPicker._$supro;
    d.__init = function () {
      this.__supInit();
    };
    d.__reset = function (e) {
      this.__supReset(e);
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
    d.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(u);
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__colorOpts = [
        '#E53333',
        '#E56600',
        '#FF9900',
        '#64451D',
        '#DFC5A4',
        '#FFE500',
        '#009900',
        '#006600',
        '#99BB00',
        '#B8D100',
        '#60D978',
        '#00D5FF',
        '#337FE5',
        '#003399',
        '#4C33E5',
        '#9933E5',
        '#CC33E5',
        '#EE33EE',
        '#ffffff',
        '#cccccc',
        '#999999',
        '#666666',
        '#333333',
        '#000000',
      ];
      this.__selectedColor = null;
      this.__clearBtnNode = o._$getByClassName(this.__body, 'j-clearcolor')[0];
      this.__colorsNode = o._$getByClassName(this.__body, 'j-colors')[0];
      c._$addEvent(this.__clearBtnNode, 'mouseup', this.__onClickClearColor._$bind(this));
      this.__buildColors();
    };
    d.__buildColors = function () {
      var e = '';
      for (var t = this.__colorOpts.length - 1; t >= 0; t--)
        e += '<a class="colorbtn j-colorbtn" title="' + this.__colorOpts[t] + '"><span></span></a>';
      this.__colorsNode.innerHTML = e;
      this.__colorBtnNodes = o._$getByClassName(this.__body, 'j-colorbtn');
      c._$addEvent(this.__body, 'mousedown', function (e) {
        c._$stop(e);
      });
      a._$forEach(
        this.__colorBtnNodes,
        function (e, t) {
          o._$setStyle(e.childNodes[0], 'background-color', e.title);
          c._$addEvent(e, 'mouseup', this.__onClickPickColor._$bind(this, t));
        }._$bind(this),
      );
    };
    d.__onClickClearColor = function (e) {
      if (e) c._$stop(e);
      if (null != this.__selectedColor)
        o._$delClassName(this.__colorBtnNodes[this.__selectedColor], 'selected');
      this.__selectedColor = null;
      this._$dispatchEvent('onClearColor');
    };
    d.__onClickPickColor = function (e, t) {
      if (t) c._$stop(t);
      if (null != this.__selectedColor)
        o._$delClassName(this.__colorBtnNodes[this.__selectedColor], 'selected');
      this.__selectedColor = e;
      var n = this.__colorBtnNodes[e];
      var i = n.title;
      o._$addClassName(n, 'selected');
      this._$dispatchEvent('onColorPick', i);
    };
    return s._$$ColorPicker;
  },
  '2251224ef4bde318c45429fafdfcdd19',
);
