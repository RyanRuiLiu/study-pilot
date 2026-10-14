EDU(
  'a5039301f6508ebad1476107f4d9a8c9',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h) {
    var p = n._$pushCSSText(d),
      m = c._$addNodeTemplate(l),
      g;
    u._$$Window = t._$klass();
    g = u._$$Window._$extend(a._$$Layer);
    g.__init = function () {
      this.__mopt = {};
      this.__dopt = { onchange: this.__onDragging._$bind(this) };
      this.__super();
    };
    g.__reset = function (e) {
      this.__super(e);
      this.__setMask(e.mask);
      this._$setAlign(e.align);
      this._$setTitle(e.title);
      if (e.draggable) this.__dragger = s._$$Dragger._$allocate(this.__dopt);
    };
    g.__destroy = function () {
      this.__super();
      delete this.__align;
      delete this.__mclz;
      if (this.__imask) {
        this.__imask._$recycle();
        delete this.__imask;
      }
      if (this.__dragger) {
        this.__dragger._$recycle();
        delete this.__dragger;
      }
    };
    g.__initXGui = function () {
      this.__seed_css = p;
      this.__seed_html = m;
    };
    g.__initNode = function () {
      this.__super();
      var e = n._$getChildren(this.__body);
      this.__ncnt = e[1];
      this.__dopt.mbar = e[0];
      this.__dopt.body = this.__body;
      i._$addEvent(e[2], 'mousedown', this.__onClose._$bind(this));
      i._$addEvent(this.__dopt.mbar, 'mousedown', this.__onDragStart._$bind(this));
      this.__nttl = n._$getChildren(this.__dopt.mbar)[0];
    };
    g.__onClose = function (e) {
      i._$stop(e);
      this._$dispatchEvent('onclose');
      this._$hide();
    };
    g.__onDragStart = function (e) {
      i._$dispatchEvent(document, 'click');
    };
    g.__onDragging = function (e) {
      if (this.__mask) n._$style(this.__mask, { top: e.top + 'px', left: e.left + 'px' });
    };
    g.__doPositionAlign = (function () {
      var e = [
          function () {
            return 0;
          },
          function (e, t, n) {
            return Math.max(0, e[n] + t[n] / 2);
          },
          function (e, t, n) {
            return e[n] + t[n];
          },
        ],
        t = ['left', 'top'];
      return function () {
        var i = {},
          a = this.__body.style,
          r = n._$getPageBox(),
          s = { left: r.scrollLeft, top: r.scrollTop },
          c = {
            left: r.clientWidth - this.__body.offsetWidth,
            top: r.clientHeight - this.__body.offsetHeight,
          };
        o._$forEach(
          t,
          function (t, n) {
            var o = e[this.__align[n]];
            if (o) i[t] = o(s, c, t);
          },
          this,
        );
        this._$setPosition(i);
      };
    })();
    g.__doShowMask = function () {
      if (!this.__imask) {
        if (!this.__mclz) return;
        this.__mopt.parent = this.__parent;
        this.__imask = this.__mclz._$allocate(this.__mopt);
      }
      this.__imask._$show();
    };
    g.__doHide = function () {
      if (this.__imask) this.__imask._$hide();
      this.__super();
    };
    g.__setMask = function (e) {
      if (!e) this.__mclz = null;
      else {
        if (e instanceof r._$$Mask) {
          this.__imask = e;
          return;
        }
        if (o._$isFunction(e)) {
          this.__mclz = e;
          return;
        }
        this.__mclz = r._$$Mask;
        if (o._$isString(e)) this.__mopt.clazz = e;
      }
    };
    g._$setTitle = function (e, t) {
      if (this.__nttl) {
        var n = !t ? 'innerText' : 'innerHTML';
        this.__nttl[n] = e || '标题';
      }
      return this;
    };
    g._$setAlign = (function () {
      var e = /\s+/,
        t = { left: 0, center: 1, right: 2, auto: 3 },
        n = { top: 0, middle: 1, bottom: 2, auto: 3 };
      return function (i) {
        this.__align = (i || '').split(e);
        var o = t[this.__align[0]];
        if (null == o) o = 1;
        this.__align[0] = o;
        var o = n[this.__align[1]];
        if (null == o) o = 1;
        this.__align[1] = o;
        return this;
      };
    })();
    g._$show = function () {
      this.__super();
      this.__doShowMask();
      return this;
    };
    if (!0) e.copy(e.P('nej.ui'), u);
    return u;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'e38778ec2a797d0516169c81783fee70',
  '80419355935cef882bd9c8c7a92dd741',
  'c4bf52eb0c59916cecfa7899e5d4791a',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'effc437a91d4e409780893e603d37ebc',
  '617cb90c65c5a2af4544a0d2c3a7820b',
);
