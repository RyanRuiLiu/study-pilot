EDU(
  'c4bf52eb0c59916cecfa7899e5d4791a',
  function (e, t, n, i, o, a, r, s, c, d) {
    a._$$Draggable = t._$klass();
    d = a._$$Draggable._$extend(o._$$EventTarget);
    d.__reset = function (e) {
      this.__super(e);
      this.__overflow = !!e.overflow;
      this.__body = n._$get(e.body);
      this.__mbar = n._$get(e.mbar) || this.__body;
      this.__view = n._$get(e.view) || n._$getPageBox();
      this.__direction = parseInt(e.direction) || 0;
      this.__doInitDomEvent([
        [document, 'mouseup', this.__onDragEnd._$bind(this)],
        [document, 'mousemove', this.__onDragging._$bind(this)],
        [this.__mbar, 'mousedown', this.__onDragStart._$bind(this)],
      ]);
    };
    d.__destroy = function () {
      this.__super();
      this.__onDragEnd();
      delete this.__body;
      delete this.__mbar;
      delete this.__view;
    };
    d.__getMaxRange = function () {
      return {
        x: this.__view.clientWidth - this.__body.offsetWidth,
        y: this.__view.clientHeight - this.__body.offsetHeight,
      };
    };
    d.__onDragStart = function (e) {
      i._$stop(e);
      if (!this.__offset) {
        this.__offset = { x: i._$pageX(e), y: i._$pageY(e) };
        this.__maxbox = this.__getMaxRange();
      }
    };
    d.__onDragging = function (e) {
      if (this.__offset) {
        i._$stop(e);
        var t = { x: i._$pageX(e), y: i._$pageY(e) };
        var o = t.x - this.__offset.x,
          a = t.y - this.__offset.y,
          r = parseInt(n._$getStyle(this.__body, 'top')) || 0,
          s = parseInt(n._$getStyle(this.__body, 'left')) || 0,
          c = { top: r + a, left: s + o };
        this.__offset = t;
        this._$setPosition(c);
      }
    };
    d.__onDragEnd = function (e) {
      if (this.__offset) {
        delete this.__maxbox;
        delete this.__offset;
        this._$dispatchEvent('ondragend', this._$getPosition());
      }
    };
    d.__doFixPosition = function (e) {
      if (!this.__overflow) {
        var t = this.__maxbox || this.__getMaxRange();
        e.top = Math.min(t.y, Math.max(0, e.top));
        e.left = Math.min(t.x, Math.max(0, e.left));
      }
    };
    d._$setPosition = function (e) {
      e.top = Math.round(e.top);
      e.left = Math.round(e.left);
      this.__doFixPosition(e);
      this._$dispatchEvent('onbeforechange', e);
      this.__doFixPosition(e);
      var t = this.__body.style;
      if (0 == this.__direction || 2 == this.__direction) t.top = e.top + 'px';
      if (0 == this.__direction || 1 == this.__direction) t.left = e.left + 'px';
      this._$dispatchEvent('onchange', e);
    };
    d._$getPosition = function () {
      return {
        left: parseInt(n._$getStyle(this.__body, 'left'), 10) || 0,
        top: parseInt(n._$getStyle(this.__body, 'top'), 10) || 0,
      };
    };
    a._$$Dragger = a._$$Draggable;
    if (!0) e.copy(e.P('nej.ut'), a);
    return a;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
