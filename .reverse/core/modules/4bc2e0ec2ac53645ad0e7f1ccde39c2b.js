EDU(
  '4bc2e0ec2ac53645ad0e7f1ccde39c2b',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l;
    r._$$LayerWrapper = t._$klass();
    l = r._$$LayerWrapper._$extend(o._$$Abstract);
    l.__reset = function (e) {
      this.__doInitLayerOptions();
      this.__super(this.__doFilterOptions(e));
      this.__lopt.onbeforerecycle = this._$recycle._$bind(this);
      this.__layer = this.__getLayerInstance();
    };
    l.__destroy = function () {
      this._$dispatchEvent('onbeforerecycle');
      this.__super();
      delete this.__lopt;
      n._$removeByEC(this.__body);
      var e = this.__layer;
      if (e) {
        delete this.__layer;
        e._$recycle();
      }
    };
    l.__getLayerInstance = c;
    l.__doFilterOptions = function (e) {
      var t = {};
      i._$loop(
        e,
        function (e, n) {
          this.__lopt.hasOwnProperty(n) ? (this.__lopt[n] = e) : (t[n] = e);
        },
        this,
      );
      return t;
    };
    l.__doInitLayerOptions = function () {
      this.__lopt = {
        clazz: '',
        parent: null,
        content: this.__body,
        destroyable: !1,
        oncontentready: null,
        nohack: !1,
      };
    };
    l._$show = function () {
      if (this.__layer) this.__layer._$show();
      this._$dispatchEvent('onaftershow');
    };
    l._$hide = function () {
      if (this.__layer) this.__layer._$hide();
    };
    if (!0) e.copy(e.P('nej.ui'), r);
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '2251224ef4bde318c45429fafdfcdd19',
  'e38778ec2a797d0516169c81783fee70',
);
