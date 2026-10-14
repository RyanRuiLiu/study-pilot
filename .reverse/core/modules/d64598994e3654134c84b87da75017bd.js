EDU(
  'd64598994e3654134c84b87da75017bd',
  function (e) {
    var t = 'en' === window.currentLanguage;
    var n = NEJ.P,
      i = NEJ.O,
      o = NEJ.F,
      a = n('nej.c'),
      r = n('nej.e'),
      s = n('nej.u'),
      c = n('nej.ut'),
      d = n('nej.ui'),
      l = n('nej.v'),
      u,
      _;
    d._$$InsertCodeSelect = NEJ.C();
    u = d._$$InsertCodeSelect._$extend(d._$$DropListSelect);
    _ = d._$$InsertCodeSelect._$supro;
    u.__initNode = function () {
      this.__supInitNode();
      this.__cmd = 'insertcode';
    };
    u.__reset = function (t) {
      this.__defalutName = e.KEY_FRONT_UI_EDITOR_CODE;
      this.__supReset(t);
      this.__listP.style.width = '135px';
    };
    u._$getSelected = function () {
      var e = this.__editor.queryCommandValue(this.__cmd);
      if (e) this._$setValue(this.__dataList[e]);
      else this._$setValue(this.__defalutName);
    };
    u.__itemClick = function (e, t) {
      _.__itemClick.apply(this, arguments);
      this.__editor.execCommand(this.__cmd, this.__selectedData);
    };
    u.__destroy = function () {
      this.__supDestroy();
    };
    return d._$$InsertCodeSelect;
  },
  '1ca3c38dd9d463e9c6f6b82303c4a43b',
  '2beb7d513cf887d267f80ce2ea6ed86e',
);
