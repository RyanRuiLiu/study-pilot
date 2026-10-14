EDU(
  'bdd09c3449ddcecf9043ccd822a2b16f',
  function (e, t, n, i, o, a, r, s) {
    var c;
    o._$$Animation = t._$klass();
    c = o._$$Animation._$extend(n._$$EventTarget);
    c.__reset = function (e) {
      this.__super(e);
      this.__end = e.to || a;
      this.__begin = e.from || {};
      this.__delay = Math.max(0, parseInt(e.delay) || 0);
    };
    c.__destroy = function () {
      this.__super();
      this._$stop();
      if (this.__dtime) {
        window.clearTimeout(this.__dtime);
        delete this.__dtime;
      }
      delete this.__end;
      delete this.__begin;
    };
    c.__onAnimationFrame = function (e) {
      if (this.__begin) {
        if (('' + e).indexOf('.') >= 0) e = +new Date();
        if (!this.__doAnimationFrame(e))
          this.__timer = i.requestAnimationFrame(this.__onAnimationFrame._$bind(this));
        else this._$stop();
      }
    };
    c.__doAnimationFrame = r;
    c._$play = (function () {
      var e = function () {
        this.__dtime = window.clearTimeout(this.__dtime);
        this.__begin.time = +new Date();
        this.__timer = i.requestAnimationFrame(this.__onAnimationFrame._$bind(this));
      };
      return function () {
        this.__dtime = window.setTimeout(e._$bind(this), this.__delay);
      };
    })();
    c._$stop = function () {
      this.__timer = i.cancelAnimationFrame(this.__timer);
      this._$dispatchEvent('onstop');
    };
    if (!0) e.copy(e.P('nej.ut'), o);
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '77d2226943bd145280d6a32ebbedeb9d',
);
