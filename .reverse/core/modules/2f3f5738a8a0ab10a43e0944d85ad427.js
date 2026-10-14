EDU(
  '2f3f5738a8a0ab10a43e0944d85ad427',
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
    s._$$Lineheight = NEJ.C();
    d = s._$$Lineheight._$extend(s._$$DropListButton);
    l = s._$$Lineheight._$supro;
    d.__initNode = function () {
      this.__supInitNode();
    };
    d.__reset = function (e) {
      e.title = e.data.title || '';
      e.data = e.data.list;
      this.__supReset(e);
      this.__listP.style.width = '85px';
      this.__cmd = 'lineheight';
    };
    d.__itemClick = function (e, t) {
      l.__itemClick.apply(this, arguments);
      this.__editor.execCommand(this.__cmd, this.__dataList[this.__selectedData]);
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
    return s._$$Lineheight;
  },
  '79142d6a5da61a91b37426026dd846bb',
);
