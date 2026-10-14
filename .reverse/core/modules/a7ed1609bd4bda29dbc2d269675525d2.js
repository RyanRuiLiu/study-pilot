EDU(
  'a7ed1609bd4bda29dbc2d269675525d2',
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
    s._$$Rowspacing = NEJ.C();
    d = s._$$Rowspacing._$extend(s._$$DropListButton);
    l = s._$$Rowspacing._$supro;
    d.__initNode = function () {
      this.__supInitNode();
    };
    d.__reset = function (e) {
      e.title = e.data.title || '';
      e.data = e.data.list;
      this.__supReset(e);
      this.__listP.style.width = '85px';
      if ('段前距' == e.title) this.__cmd = 'top';
      else this.__cmd = 'bottom';
    };
    d.__genItmTpl = function (e, t) {
      return '<div class="f-thide list">' + a._$escape(t.toString()) + 'px</div>';
    };
    d.__itemClick = function (e, t) {
      l.__itemClick.apply(this, arguments);
      this.__editor.execCommand('rowspacing', this.__dataList[this.__selectedData], this.__cmd);
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
    return s._$$Rowspacing;
  },
  '79142d6a5da61a91b37426026dd846bb',
);
