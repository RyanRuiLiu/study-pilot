EDU('ae4ab8cf92c001207f476c97db0b65c2', function () {
  var e = function () {
    this.init.call(this, arguments);
  };
  var t = e.prototype;
  t.init = function () {
    this._cache = {};
  };
  t.set = function (e, t) {
    if (!e.__weakmapid) e.__weakmapid = 'WeakMap-' + new Date().getTime();
    this._cache[e.__weakmapid] = t;
  };
  t.get = function (e) {
    if (!e.__weakmapid) return null;
    if (!this._cache[e.__weakmapid]) return null;
    else return this._cache[e.__weakmapid];
  };
  t['delete'] = function (e) {
    if (e.__weakmapid)
      if (this._cache[e.__weakmapid]) {
        this._cache[e.__weakmapid] = void 0;
        delete this._cache[e.__weakmapid];
      }
  };
  return e;
});
