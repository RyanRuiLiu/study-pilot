EDU(
  '7b471aedaf06f7c7297075231a1b1e91',
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
    s._$$FontsizeSelect = NEJ.C();
    d = s._$$FontsizeSelect._$extend(s._$$DropListSelect);
    l = s._$$FontsizeSelect._$supro;
    d.__initNode = function () {
      this.__supInitNode();
      this.__cmd = 'FontSize';
    };
    d.__reset = function (e) {
      this.__defalutName = '字号';
      this.__supReset(e);
      this.__listP.style.width = '108px';
    };
    d.__genItmTpl = function (e, t) {
      return (
        '<div class="f-thide list" style="font-size:' +
        a._$escape(t.toString()) +
        ';">' +
        a._$escape(t.toString()) +
        '</div>'
      );
    };
    d.__itemClick = function (e, t) {
      l.__itemClick.apply(this, arguments);
      this.__editor.execCommand(this.__cmd, this.__dataList[this.__selectedData]);
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
    return s._$$FontsizeSelect;
  },
  '2beb7d513cf887d267f80ce2ea6ed86e',
);
