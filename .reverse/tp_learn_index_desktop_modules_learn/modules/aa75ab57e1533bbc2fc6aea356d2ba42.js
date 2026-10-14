EDU(
  'aa75ab57e1533bbc2fc6aea356d2ba42',
  function (e, t, i, n, a, o, s, r, c, d) {
    o._$$SelectHelper = t._$klass();
    d = o._$$SelectHelper._$extend(a._$$EventTarget);
    d.__reset = function (e) {
      this.__super(e);
      this.__loop = !!e.loopable;
      this.__parent = i._$get(e.parent);
      this.__selected = e.selected || 'js-selected';
      this.__hovered = e.hover || this.__selected;
      this.__nopt = {};
      if (e.clazz) {
        this.__nopt.filter = i._$hasClassName._$bind2(i, e.clazz);
        this.__clazz = e.clazz;
      }
      this.__kbody = this.__getKeyBoardParent(this.__parent);
      this.__doInitDomEvent([
        [this.__kbody, 'keydown', this.__doCheckKBAction._$bind(this), !0],
        [this.__kbody, 'enter', this.__doCheckKBEnter._$bind(this)],
        [this.__parent, 'click', this.__onCheckClick._$bind(this)],
        [this.__parent, 'mouseover', this.__onCheckHover._$bind(this)],
        [this.__parent, 'mouseleave', this.__onCheckLeave._$bind(this)],
      ]);
    };
    d.__destroy = function () {
      this.__super();
      delete this.__selected;
      delete this.__hovered;
      delete this.__parent;
      delete this.__kbody;
      delete this.__clazz;
      delete this.__nopt;
      delete this.__loop;
    };
    d.__isItemElement = function (e) {
      if (this.__clazz) return i._$hasClassName(e, this.__clazz);
      else return e.parentNode == this.__parent;
    };
    d.__getKeyBoardParent = (function () {
      var e = 1e3;
      return function (t) {
        for (; t && (parseInt(t.tabIndex) || 0) <= e;) t = t.parentNode;
        return t || document;
      };
    })();
    d.__getItemElement = function (e) {
      var t = i._$getByClassName(this.__parent, e);
      return !t ? null : t[0];
    };
    d.__doSyncSelection = function (e, t) {
      i._$delClassName(e.last, t);
      i._$addClassName(e.target, t);
      if (t == this.__selected && e.last != e.target) {
        this.__doScrollToView(e.target);
        this._$dispatchEvent('onchange', e);
      }
    };
    d.__doScrollToView = function (e) {
      var t = i._$getScrollViewPort(e),
        n = i._$offset(e, t);
      if (!(n.y - t.scrollTop < 0)) {
        var a = n.y + e.offsetHeight - t.clientHeight;
        if (a > t.scrollTop) t.scrollTop = a;
      } else t.scrollTop = n.y;
    };
    d.__doParseSelection = function (e, t) {
      var i = n._$getElement(e, this.__isItemElement._$bind(this));
      return !i
        ? null
        : {
            last: this.__getItemElement(t),
            target: i,
          };
    };
    d.__doCheckKBAction = function (e) {
      var t = e.keyCode;
      if (38 == t || 40 == t) {
        n._$stop(e);
        var a = { last: this._$getSelectedNode() };
        this.__nopt.backward = 38 == t;
        var o = !this.__clazz
            ? i._$getChildren(this.__parent)
            : i._$getByClassName(this.__parent, this.__clazz),
          s = this.__nopt.backward ? o[o.length - 1] : o[0];
        if (!a.last) a.target = this.__getItemElement(this.__hovered) || s;
        else a.target = i._$getSibling(a.last, this.__nopt);
        if (!a.target) {
          if (!this.__loop || o.length <= 1) return;
          a.target = s;
        }
        this.__doSyncSelection(a, this.__selected);
      }
    };
    d.__doCheckKBEnter = function (e) {
      n._$stop(e);
      this._$dispatchEvent('onselect', { enter: !0, target: this._$getSelectedNode() });
    };
    d.__onCheckClick = function (e) {
      n._$stop(e);
      var t = this.__doParseSelection(e, this.__selected);
      if (t) {
        this.__doSyncSelection(t, this.__selected);
        this._$dispatchEvent('onselect', { target: t.target });
      }
    };
    d.__onCheckHover = function (e) {
      var t = this.__doParseSelection(e, this.__hovered);
      if (t) {
        this.__doSyncSelection(t, this.__hovered);
        if (this.__kbody.focus) this.__kbody.focus();
      }
    };
    d.__onCheckLeave = function (e) {
      if (this.__hovered != this.__selected)
        i._$delClassName(this.__getItemElement(this.__hovered), this.__hovered);
    };
    d._$getSelectedNode = function () {
      return this.__getItemElement(this.__selected);
    };
    if (!0) e.copy(e.P('nej.ut'), o);
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
