EDU(
  '8dba0aad6fcea9190488f969bb87e078',
  function (e, t, n, i, o, a, r, s, c, d, l) {
    var u;
    s._$$AbstractPager = t._$klass();
    u = s._$$AbstractPager._$extend(o._$$Abstract);
    u.__reset = function (e) {
      this.__bopt = i._$merge({}, e);
      this.__popt = i._$merge({}, e);
      delete this.__bopt.onchange;
      this.__popt.onchange = this.__onChange._$bind(this);
      this.__super(e);
      this.__doResetNumber(e);
    };
    u.__destroy = function () {
      if (this.__page) {
        this.__page._$recycle();
        delete this.__page;
      }
      this.__super();
      delete this.__bopt;
      delete this.__popt;
      this._$unbind();
      this.__body.innerHTML = '&nbsp;';
    };
    u.__initXGui = (function () {
      var e = n._$pushCSSText(r);
      return function () {
        this.__seed_css = e;
      };
    })();
    u.__doResetNumber = function (e) {
      var t = e.label || c;
      if (!e.noprv) {
        this.__popt.pbtn = n._$create('a', 'zbtn zprv', this.__body);
        this.__popt.pbtn.innerHTML = t.prev || '上一页';
      }
      var i = [];
      for (var o = 1, a = e.number; o <= a; o++)
        i.push(n._$create('a', 'zpgi zpg' + o, this.__body));
      this.__popt.list = i;
      if (!e.nonxt) {
        this.__popt.nbtn = n._$create('a', 'zbtn znxt', this.__body);
        this.__popt.nbtn.innerHTML = t.next || '下一页';
      }
    };
    u.__onChange = function (e) {
      if (!this.__flag) {
        var t = e.index,
          n = e.total;
        this.__flag = !0;
        this._$updatePage(t, n);
        i._$forEach(this.__binders, function (e) {
          e._$updatePage(t, n);
        });
        this.__flag = !1;
        this._$dispatchEvent('onchange', e);
      }
    };
    u._$bind = function (e) {
      e = n._$get(e);
      if (e) {
        var t = i._$merge({}, this.__bopt);
        t.parent = e;
        t.index = this._$getIndex();
        t.total = this._$getTotal();
        var o = this.constructor._$allocate(t);
        o._$setEvent('onchange', this.__popt.onchange);
        if (!this.__binders) this.__binders = [];
        this.__binders.push(o);
      }
    };
    u._$unbind = (function () {
      var e = function (e, t, n) {
        e._$recycle();
        n.splice(t, 1);
      };
      return function () {
        i._$reverseEach(this.__binders, e);
      };
    })();
    u._$setIndex = function (e) {
      if (this.__page) this.__page._$setIndex(e);
    };
    u._$getIndex = function () {
      if (!this.__page) return 1;
      else return this.__page._$getIndex();
    };
    u._$getTotal = function () {
      if (!this.__page) return 1;
      else return this.__page._$getTotal();
    };
    u._$updatePage = function (e, t) {
      if (this.__page) this.__page._$updatePage(e, t);
    };
    u._$updateTotal = function (e) {
      if (this.__page) this.__page._$updateTotal(e);
    };
    if (!0) e.copy(e.P('nej.ui'), s);
    return s;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '2251224ef4bde318c45429fafdfcdd19',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '18ba29784c27821e52fe9bc753725df7',
);
