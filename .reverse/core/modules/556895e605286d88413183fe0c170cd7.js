EDU(
  '556895e605286d88413183fe0c170cd7',
  function (e, t, n, i, o, a, r) {
    var s = {},
      c;
    i._$$EditorCommand = t._$klass();
    c = i._$$EditorCommand._$extend(n._$$EventTarget);
    i._$$EditorCommand._$regist = function () {
      s[this.command] = this;
    };
    i._$$EditorCommand._$getImpl = function (e) {
      return s[e] || null;
    };
    c.__init = function () {
      this.__name = this.constructor.command;
      this.__super();
    };
    c.__reset = function (e) {
      this.__super(e);
      this.__editor = e.area;
      this.__toolbar = e.toolbar;
    };
    c.__destroy = function () {
      this.__super();
      delete this.__editor;
      delete this.__toolbar;
    };
    c._$execute = a;
    c._$queryValue = a;
    c._$queryState = function () {
      return null;
    };
    c._$queryEnabled = function () {
      return null;
    };
    if (!0) e.copy(e.P('nej.ut'), i);
    return i;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
