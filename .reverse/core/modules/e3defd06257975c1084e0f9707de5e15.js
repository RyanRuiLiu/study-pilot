EDU(
  'e3defd06257975c1084e0f9707de5e15',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l;
    r._$$Tab = t._$klass();
    l = r._$$Tab._$extend(a._$$EventTarget);
    l.__reset = function (e) {
      this.__super(e);
      this.__name = e.event || 'click';
      this.__selected = e.selected || 'js-selected';
      this.__disabled = e.disabled || 'js-disabled';
      this.__inversed = !!e.inverse;
      this.__doTabListCheck(e.list);
      this._$go(e.index || 0);
    };
    l.__destroy = (function () {
      var e = function (e) {
        this.__doTabItemSelect(e, !1);
      };
      return function () {
        this.__super();
        i._$forEach(this.__list, e, this);
        delete this.__list;
        delete this.__name;
        delete this.__index;
        delete this.__disabled;
        delete this.__selected;
        delete this.__inversed;
      };
    })();
    l.__doTabListCheck = (function () {
      var e = function (e) {
        if (e) {
          this.__list.push(e);
          var t = this.__list.length - 1,
            n = this.__cblist[t];
          if (!n) {
            n = this._$go._$bind(this, t);
            this.__cblist[t] = n;
          }
          this.__doInitDomEvent([[e, this.__name, n]]);
        }
      };
      return function (t) {
        this.__list = [];
        if (!this.__cblist) this.__cblist = [];
        i._$forEach(t, e, this);
      };
    })();
    l.__doTabItemSelect = function (e, t) {
      t && !this.__inversed
        ? o._$addClassName(e, this.__selected)
        : o._$delClassName(e, this.__selected);
    };
    l._$go = function (e, t) {
      var i = this.__list[e];
      if (1 != t && (e == this.__index || !i || o._$hasClassName(i, this.__disabled)))
        n._$stopDefault(arguments[1]);
      var a = {
        stopped: !0,
        index: e,
        last: this.__index,
        list: this._$getList(),
        data: o._$dataset(i, 'value'),
      };
      this.__index = e;
      i = this.__list[a.last];
      if (i) this.__doTabItemSelect(i, !1);
      i = this.__list[this.__index];
      this.__doTabItemSelect(i, !0);
      this._$dispatchEvent('onchange', a);
      if (a.stopped) n._$stopDefault(arguments[1]);
    };
    l._$getIndex = function () {
      return this.__index;
    };
    l._$getList = function () {
      return this.__list;
    };
    if (!0) e.copy(e.P('nej.ut'), r);
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
