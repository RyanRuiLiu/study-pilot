EDU(
  '718339c82039ab37605f9b07444eab0a',
  function (e, t, i, n, a, o, s, r, c, d) {
    var _,
      l = i._$pushCSSText(o);
    s._$$Card = t._$klass();
    _ = s._$$Card._$extend(a._$$Layer);
    _.__reset = function (e) {
      this.__super(e);
      this.__doInitDomEvent([[document, 'click', this.__onDocClick._$bind(this)]]);
      this.__nostop = !!e.nostop;
      this.__position = { top: e.top, left: e.left };
    };
    _.__destroy = function () {
      delete this.__pbox;
      delete this.__fbox;
      delete this.__align;
      delete this.__fitable;
      delete this.__byPoint;
      delete this.__position;
      this.__super();
    };
    _.__initXGui = function () {
      this.__seed_css = l;
    };
    _.__initNode = function () {
      this.__super();
      this.__ncnt = this.__body;
      n._$addEvent(this.__body, 'click', this.__doCheckStop._$bind(this));
    };
    _.__onDocClick = function (e) {
      if (2 != e.button) this._$hide();
    };
    _.__doCheckStop = function (e) {
      if (!this.__nostop) {
        n._$stopBubble(e);
        var t = n._$getElement(e);
        if ('A' == t.tagName) n._$stopDefault(e);
      }
    };
    _.__setAlign = (function () {
      var e = /\s+/i;
      return function (t) {
        t = (t || '').trim().toLowerCase().split(e);
        t[0] = t[0] || 'bottom';
        t[1] = t[1] || 'left';
        this.__align = t;
      };
    })();
    _.__doCalPosition = function (e) {
      var t = {},
        n = this.__fbox,
        a = i._$getPageBox(),
        o = this.__body.offsetWidth,
        s = this.__body.offsetHeight;
      switch (e[0]) {
        case 'top':
          t.top = n.top - s;
          t.left = 'right' == e[1] ? n.left + n.width - o : n.left;
          break;
        case 'left':
          t.left = n.left - o;
          t.top = 'bottom' == e[1] ? n.top + n.height - s : n.top;
          break;
        case 'right':
          t.left = n.left + n.width;
          t.top = 'bottom' == e[1] ? n.top + n.height - s : n.top;
          break;
        default:
          t.top = n.top + n.height;
          t.left = 'right' == e[1] ? n.left + n.width - o : n.left;
      }
      return t;
    };
    _.__doPositionAlign = function () {
      if (this.__fitable)
        if (!this.__byPoint) {
          if (this.__fbox) this._$setPosition(this.__doCalPosition(this.__align));
        } else this._$setPosition(this.__pbox);
      else this._$setPosition(this.__position);
    };
    _.__doFindPosition = function (e, t, a) {
      t = t || r;
      var o = i._$getPageBox(),
        s = n._$pageX(a) + (t.left || 0),
        c = n._$pageY(a) + (t.top || 0),
        d = e.offsetWidth + (t.right || 0),
        _ = e.offsetHeight + (t.bottom || 0),
        l = o.scrollWidth,
        h = o.scrollHeight,
        f = s + d,
        u = c + _;
      switch (this.__align[0]) {
        case 'top':
          c = u > h ? c - _ : c;
          if ('right' == this.__align[1]) s = s - d < 0 ? 0 : s - d;
          else s = f > l ? l - d : s;
          break;
        case 'left':
          s = f > l ? l - d : s;
          if ('top' == this.__align[1]) c = u > h ? c - _ : c;
          else c = c - _ < 0 ? c : c - _;
          break;
        case 'right':
          s = s - d < 0 ? 0 : s - d;
          if ('top' == this.__align[1]) c = u > h ? c - _ : c;
          else c = c - _ < 0 ? c : c - _;
          break;
        default:
          c = c - _ < 0 ? c : c - _;
          if ('left' == this.__align[1]) s = f > l ? l - d : s;
          else s = s - d < 0 ? 0 : s - d;
      }
      return { top: c, left: s };
    };
    _._$showByReference = (function () {
      var e = function (e, t) {
        e = i._$get(e);
        if (e) {
          t = t || r;
          var n = i._$offset(e);
          return {
            top: n.y - (t.top || 0),
            left: n.x - (t.left || 0),
            width: e.offsetWidth + (t.right || 0),
            height: e.offsetHeight + (t.bottom || 0),
          };
        }
      };
      return function (t) {
        t = t || r;
        this.__byPoint = t.event;
        this.__setAlign(t.align);
        if (this.__byPoint) this.__pbox = this.__doFindPosition(t.target, t.delta, this.__byPoint);
        this.__fbox = e(t.target, t.delta);
        this.__fitable = !!t.fitable;
        this._$show();
      };
    })();
    if (!0) e.copy(e.P('nej.ui'), s);
    return s;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'e38778ec2a797d0516169c81783fee70',
  'f8fa8c010d08d59fe9627203a2cf657f',
);
