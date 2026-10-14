EDU(
  '24fc459b087ee4ceba5d8a9ad4a32482',
  function (e, t, n, i, o) {
    var a = null;
    var s = e._$klass();
    o = s._$extend(t._$$EventTarget);
    o.__init = function (e) {
      this.__super(e);
      try {
        this._nim = window.SDK.NIM.getInstance(e);
      } catch (t) {
        console.log(t);
      }
    };
    o.__reset = function (e) {
      this.__super(e);
    };
    o.__destroy = function () {
      this._nim = null;
      this._doClearRet();
      this.__super();
    };
    o.getNim = function () {
      return this._nim;
    };
    i.getInstance = function (e) {
      if (!a) a = i.PackagedNim._$allocate(e);
      return a;
    };
    i.PackagedNim = s;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '06a1fe998ca2ede601d4740c114f6c3c',
);
